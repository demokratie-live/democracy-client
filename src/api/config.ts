import Config from 'react-native-config';

const GRAPHQL_URL = Config.GRAPHQL_URL ?? 'https://api.democracy-app.de';
const GRAPHQL_SERVER_LOCAL = false;
const ANDROID_SERVER = '192.168.0.166';
const ASSOCIATED_DOMAINS = Config.ASSOCIATED_DOMAINS?.split(',') ?? ['internal.democracy-app.de'];

export { GRAPHQL_URL, GRAPHQL_SERVER_LOCAL, ANDROID_SERVER, ASSOCIATED_DOMAINS };
