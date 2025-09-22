# Dependency Resolutions: ANSI Width Tooling (wrap-ansi / string-width / strip-ansi)

We explicitly pin the following transitive dependencies via the `resolutions` field in `package.json`:

```json
{
  "resolutions": {
    "wrap-ansi": "7.0.0",
    "string-width": "4.2.3",
    "strip-ansi": "6.0.1"
  }
}
```

## Why this is necessary

The Expo CLI (and other tooling in our dependency graph) still pulls in a CommonJS (CJS) version of `wrap-ansi@7`. That version expects **`string-width` to be a CommonJS exportable function**. Starting with `string-width@5`, the package migrated to pure ESM. When Yarn's resolution algorithm (or a future dependency) accidentally hoists / selects the newer ESM major for `string-width`, the following runtime failure occurs when the CLI tries to render tables in the terminal:

```
TypeError: stringWidth is not a function
```

Root cause: `require('string-width')` under CJS returns the ESM module namespace object instead of the function, so `wrap-ansi` breaks.

Pinning the trio (`wrap-ansi`, `string-width`, `strip-ansi`) to mutually compatible CJS-era versions guarantees a stable interface across local dev, CI, and deployment scripts.

## Why pin `strip-ansi` too?

`strip-ansi` participates in the same formatting toolchain and has comparable CJS/ESM divergence across major versions. Locking it ensures we don't end up with a partially upgraded chain causing subtle width / slice inconsistencies.

## Alternative approaches considered

| Approach | Reason Rejected |
|----------|-----------------|
| Using community `*-cjs` fork/alias packages | Increases supply-chain surface & maintenance overhead. |
| Conditional dynamic `import()` shims | Adds complexity and still brittle if more packages upgrade. |
| Ignoring until upstream updates | Causes intermittent, hard-to-debug local failures. |

Pinning is the **least invasive** and fully deterministic solution.

## When to revisit

We can drop these pins when all upstream tooling that depends on `wrap-ansi@7` migrates to versions that:
1. Either consume ESM properly, or
2. Depend on `wrap-ansi@8+` (which is ESM-aware) together with compatible `string-width@5+` / `strip-ansi@7+`.

### Revalidation Checklist (future upgrade)
- Remove the three entries from `resolutions`.
- `rm -rf node_modules yarn.lock && yarn install`.
- Run: `yarn start` (ensure Expo CLI launches without the TypeError).
- Manually exercise any scripts that render tabular / colorized CLI output.
- If no regression, keep the upgrade and update this doc.

## Security / Supply Chain Considerations
Pinning does not freeze us indefinitely; dependabot or manual audits should still flag CVEs. If a security advisory affects one of the pinned versions, prefer upgrading the entire trio coherently rather than bumping a single package in isolation.

## Summary
- Problem: CJS consumer (`wrap-ansi@7`) + accidentally hoisted ESM provider (`string-width@5+`) => runtime TypeError.
- Solution: Pin coherent CJS versions to enforce a stable contract.
- Impact: Eliminates nondeterministic local/CI failures in Expo tooling.
- Future: Reassess once upstream fully embraces ESM across the chain.
