module.exports = {
  client: {
    includes: ["./packages/mobile-app/src/**/*.ts"],
    excludes: [
      "./packages/mobile-app/src/screens/Sidebar/Donate/graphql/query/donationStatus.ts",
    ],
    service: {
      name: "DEMOCRACY API Local",
      url: "https://internal.api.democracy-app.de",
      skipSSLValidation: true,
    },
  },
};
