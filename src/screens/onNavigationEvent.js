import topTabs from "./VoteList/topTabs";

export default ({ event, navigator }) => {
  switch (event.type) {
    case "DeepLink":
      if (event.link === "democracy.VoteList") {
        navigator.resetTo({
          screen: event.link,
          topTabs
        });
      } else {
        navigator.resetTo({
          screen: event.link
        });
      }
      break;

    default:
      break;
  }
};
