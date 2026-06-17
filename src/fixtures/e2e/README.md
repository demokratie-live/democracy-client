# E2E Test Fixtures

This directory contains fixture JSON files used by the `FixtureLink` Apollo Link for deterministic E2E testing.

## Files

| File | GraphQL Operation | Description |
|------|-------------------|-------------|
| `Procedure.json` | `Procedure` | Single procedure detail (procedureId: 327971) |
| `ProceduresList.json` | `ProceduresList` | List of 3 procedures for Sitzungswoche/Top100 |
| `CurrentConferenceWeek.json` | `CurrentConferenceWeek` | Conference week data for home screen |

## How It Works

When `E2E_FIXTURES=true` is set at build time:
1. `app.config.ts` sets `extra.e2eFixtures: true`
2. `src/api/config.ts` exports `E2E_FIXTURES` flag
3. `src/api/apollo/index.tsx` conditionally loads `FixtureLink` via `require()`
4. `FixtureLink` matches GraphQL `operationName` to fixture files and returns fixture data

## Updating Fixtures

Fixtures can be refreshed from the real API:

```bash
npx tsx scripts/e2e/capture-fixtures.ts
```

This fetches fresh data from `https://internal.api.democracy-app.de` and writes it with proper `__typename` fields for Apollo cache normalization.

To use a different API endpoint:

```bash
npx tsx scripts/e2e/capture-fixtures.ts --api-url=https://other.api.example.com
```

## Requirements

- Every fixture object **must** include `__typename` fields for Apollo cache to work
- The `Procedure` fixture `procedureId` must match the ID used in Maestro flows (currently `327971`)
- Fixtures should contain realistic data for meaningful visual regression screenshots

## Adding New Fixtures

1. Add the fixture JSON file to this directory
2. Register it in `src/api/apollo/FixtureLink.ts` in the `fixtures` map
3. Update `scripts/e2e/capture-fixtures.ts` to fetch the new operation
4. Run visual regression tests and update baselines if screenshots change
