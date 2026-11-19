// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  // /ios und /android sind von `expo prebuild` erzeugt (gitignored) und enthalten nach lokalen
  // Builds gebündeltes JS – nicht linten.
  ignorePatterns: ["/dist/*", "**/__generated__/*", "node_modules/*", "/ios/*", "/android/*"],
};
