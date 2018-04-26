import topTabs from "./VoteList/topTabs";

export default ({ event, navigator }) => {
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
        navigator.push({
          screen: event.link,
          title: event.payload.title,
          animated: false,
          backButtonHidden: true
        });
      }
      break;

    case "NavBarButtonPress":
      switch (event.id) {
        case "menu":
          navigator.toggleDrawer({ side: "left" });
          break;
        case "closeModal":
          navigator.dismissModal();
          break;
        case "search":
          navigator.push({
            screen: "democracy.Search",
            backButtonHidden: true
          });
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }
};
