import topTabs from "./VoteList/topTabs";

export default ({ event, navigator }) => {
  console.log("onNavigationEvent", event);
  switch (event.type) {
    case "DeepLink":
      if (event.link === "democracy.VoteList") {
        navigator.resetTo({
          screen: event.link,
          title: event.payload.title,
          topTabs,
          animated: false
        });
      } else {
        navigator.resetTo({
          screen: event.link,
          title: event.payload.title,
          animated: false
        });
      }
      break;

    case "NavBarButtonPress":
      switch (event.id) {
        case "menu":
          navigator.toggleDrawer({ side: "left" });
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }
};
