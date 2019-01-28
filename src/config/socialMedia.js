import Config from 'react-native-config';

export default {
  WEBSITE_URL:
    process.env.WEBSITE_URL || Config.WEBSITE_URL || 'https://www.democracy-deutschland.de/',
  GITHUB_URL:
    process.env.GITHUB_URL ||
    Config.GITHUB_URL ||
    'https://github.com/demokratie-live/democracy-client/',
  FACEBOOK_URL:
    process.env.FACEBOOK_URL || Config.FACEBOOK_URL || 'https://www.facebook.com/democracygermany/',
  TWITTER_URL: process.env.TWITTER_URL || Config.TWITTER_URL || 'https://twitter.com/democracy_de',
  INSTAGRAM_URL:
    process.env.INSTAGRAM_URL ||
    Config.INSTAGRAM_URL ||
    'https://www.instagram.com/democracy_deutschland/',
  YOUTUBE_URL:
    process.env.YOUTUBE_URL ||
    Config.YOUTUBE_URL ||
    'https://www.youtube.com/channel/UC2R4cGTq1LjFZ2DvDaVhDyg',
  DISCORD_URL: process.env.DISCORD_URL || Config.DISCORD_URL || 'https://discord.gg/Pdu3ZEV',
};
