import Config from "react-native-config";

export default {
  GRAPHQL_URL: process.env.GRAPHQL_URL || Config.GRAPHQL_URL,
  PHONE_NUMBER: process.env.PHONE_NUMBER || Config.PHONE_NUMBER || ""
};
