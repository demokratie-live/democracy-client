export default ({ event, navigator }) => {
  console.log("onNavigationEvent", event, navigator);
  switch (event.type) {
    case "DeepLink":
      navigator.resetTo({
        screen: event.link
      });
      break;

    default:
      break;
  }
};
