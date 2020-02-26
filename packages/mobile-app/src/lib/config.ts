import Config from 'react-native-config';

const GRAPHQL_URL: string = Config.GRAPHQL_URL;
const GRAPHQL_SERVER_LOCAL: boolean = Config.GRAPHQL_SERVER_LOCAL === 'true';

export { GRAPHQL_URL, GRAPHQL_SERVER_LOCAL };
