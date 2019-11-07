module.exports = {
  client: {
    includes: ["./packages/mobile-app/src/**/*.ts"],
    service: {
      name: "DEMOCRACY API Local",
      url: "http://localhost:3000/",
      skipSSLValidation: true
    }
  }
};
