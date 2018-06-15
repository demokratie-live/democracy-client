import { AsyncStorage } from "react-native";
import DeviceInfo from "react-native-device-info";
import _ from "lodash";

class ViewedProcedures {
  static ITEM_KEY = `${DeviceInfo.getBundleId()}.ViewedProcedures`;

  static getViewedProcedures = async () => {
    console.log("getViewedProcedures");
    await AsyncStorage.removeItem(this.ITEM_KEY);
    const viewdProcedures = await AsyncStorage.getItem(this.ITEM_KEY)
      .then(err => console.log(err))
      .catch(error => console.log(error));
    if (viewdProcedures) {
      //   return JSON.parse(viewdProcedures);
    }
    return {};
  };

  static resetViewedProcedures = async () =>
    Keychain.resetGenericPassword(this.ITEM_KEY);

  static getViewedProceduresList = async () => {
    console.log("getViewedProceduresList");
    const viewedProcedures = await ViewedProcedures.getViewedProcedures();
    const list = [];
    _.forEach(viewedProcedures, (value, key) => {
      list.push({ procedureId: key, selection: value });
    });
    return list;
  };

  static getViewProcedure = async procedureId => {
    console.log("getViewProcedure");
    const viewedProcedures = await ViewedProcedures.getViewedProcedures();
    switch (viewedProcedures[procedureId]) {
      case 0:
        return false;
      case 1:
        return { selection: "YES" };
      case 2:
        return { selection: "ABSTINATION" };
      case 3:
        return { selection: "NO" };

      default:
        return null;
    }
  };

  static prepareSetViewProcedure = ({ procedureId, selection }) => {
    console.log("prepareSetViewProcedure");
    let selectionInt;
    switch (selection) {
      case "VIEWED":
        selectionInt = 1;
        break;
      case "NEW":
        selectionInt = 2;
        break;
      case "UPDATE":
        selectionInt = 3;
        break;
      case "PUSH":
        selectionInt = 3;
        break;

      default:
        selectionInt = 0;
        break;
    }
    return { procedureId, selectionInt };
  };

  static setViewedProcedure = async ({ procedureId, selection }) => {
    console.log("setViewedProcedure");
    const viewedProcedures = await ViewedProcedures.getViewedProcedures();

    // const { selectionInt } = ViewedProcedures.prepareSetViewProcedure({
    //   procedureId,
    //   selection
    // });

    // viewedProcedures[procedureId] = selectionInt;

    // await AsyncStorage.setItem(this.ITEM_KEY, JSON.stringify(viewedProcedures));
    // console.log(
    //   "setViewProcedure",
    //   await ViewedProcedures.getViewedProceduresList()
    // );
  };

  static setViewProcedureList = async voteLocalList => {
    console.log("setViewProcedureList");
    const viewedProcedures = await ViewedProcedures.getViewedProcedures();
    voteLocalList.forEach(vote => {
      const {
        procedureId,
        selectionInt
      } = ViewedProcedures.prepareSetViewProcedure(vote);
      viewedProcedures[procedureId] = selectionInt;
      console.log("setList");
    });
    console.log("saveList");
    await Keychain.setGenericPassword(
      "democracyVotes",
      JSON.stringify(viewedProcedures),
      this.ITEM_KEY
    );
  };
}

export default ViewedProcedures;
