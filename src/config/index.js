import Config from "react-native-config";

export default {
  GRAPHQL_URL:
    process.env.GRAPHQL_URL ||
    Config.GRAPHQL_URL ||
    "http://192.168.99.100:3000/graphql",

  PHONE_NUMBER: process.env.PHONE_NUMBER || Config.PHONE_NUMBER || ""
};
