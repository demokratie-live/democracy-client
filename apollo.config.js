module.exports = {
  client: {
    includes: ["./packages/mobile-app/src/**/*.ts"],
    service: {
      name: "DEMOCRACY API Local",
      url: "https://internal.api.democracy-app.de",
      skipSSLValidation: true
    }
  }
};
