import { Linking } from 'react-native';
import { Navigation } from 'react-native-navigation';

// Handle browser Links
Linking.addEventListener('url', ({ url }) => {
  const params = url.substr(url.indexOf('//') + 2).split('/');
  let link;
  let payload;
  switch (params[0]) {
    case 'procedure':
      link = `democracy.Detail`;
      payload = { procedureId: params[1] };
      break;
    default:
      break;
  }
  if (link) {
    Navigation.handleDeepLink({
      link: `democracy.Detail`,
      payload: { ...payload, from: 'externalLink' },
    });
  }
});
