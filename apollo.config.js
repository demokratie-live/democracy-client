module.exports = {
  client: {
    includes: ["./packages/mobile-app/src/**/*.ts"],
    service: {
      name: "DEMOCRACY API Live",
      url: "https://api.democracy-app.de/"
      //   skipSSLValidation: true
    }
  }
};
