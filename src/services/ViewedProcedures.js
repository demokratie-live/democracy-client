import { AsyncStorage } from "react-native";
import DeviceInfo from "react-native-device-info";
import _ from "lodash";

const ITEM_KEY = `${DeviceInfo.getBundleId()}.ViewedProcedures`;
let DATA = {};

(async () => {
  const viewdProcedures = await AsyncStorage.getItem(ITEM_KEY);
  if (viewdProcedures) {
    DATA = JSON.parse(viewdProcedures);
  }
})();

class ViewedProcedures {
  static getViewedProcedures = async () =>
    // await AsyncStorage.removeItem(ITEM_KEY);
    DATA;
  // const viewdProcedures = await AsyncStorage.getItem(ITEM_KEY);
  // if (viewdProcedures) {
  //   return JSON.parse(viewdProcedures);
  // }
  // return {};

  static getViewedProceduresList = async () => {
    const viewedProcedures = await ViewedProcedures.getViewedProcedures();
    const list = [];
    _.forEach(viewedProcedures, (value, key) => {
      list.push({ procedureId: key, status: value });
    });
    return list;
  };

  static getViewProcedure = async procedureId => {
    const viewedProcedures = await ViewedProcedures.getViewedProcedures();
    switch (viewedProcedures[procedureId]) {
      case 1:
        return { status: "VIEWED" };
      case 3:
        return { status: "UPDATE" };
      case 4:
        return { status: "PUSH" };

      default:
        return { status: "NEW" };
    }
  };

  static prepareSetViewProcedure = ({ procedureId, status }) => {
    let statusInt;
    switch (status) {
      case "VIEWED":
        statusInt = 1;
        break;
      case "NEW":
        statusInt = 2;
        break;
      case "UPDATE":
        statusInt = 3;
        break;
      case "PUSH":
        statusInt = 4;
        break;

      default:
        statusInt = 0;
        break;
    }
    return { procedureId, statusInt };
  };

  static setViewedProcedure = async ({ procedureId, status }) => {
    const viewedProcedures = await ViewedProcedures.getViewedProcedures();

    console.log("PUSHLOG: setViewedProcedure 1", viewedProcedures);

    const { statusInt } = ViewedProcedures.prepareSetViewProcedure({
      procedureId,
      status
    });

    DATA[procedureId] = statusInt;
    viewedProcedures[procedureId] = statusInt;

    console.log("PUSHLOG: setViewedProcedure 2", viewedProcedures);

    await AsyncStorage.setItem(ITEM_KEY, JSON.stringify(viewedProcedures));
  };

  static setViewedProcedures = async ({ procedureIds, status }) => {
    const viewedProcedures = await ViewedProcedures.getViewedProcedures();

    console.log("PUSHLOG: setViewedProcedure 1", viewedProcedures);

    const { statusInt } = ViewedProcedures.prepareSetViewProcedure({
      status
    });

    procedureIds.forEach(procedureId => {
      DATA[procedureId] = statusInt;
      viewedProcedures[procedureId] = statusInt;
    });

    console.log("PUSHLOG: setViewedProcedure 2", viewedProcedures);

    await AsyncStorage.setItem(ITEM_KEY, JSON.stringify(viewedProcedures));
  };

  // static setViewProcedureList = async voteLocalList => {
  //   console.log("setViewProcedureList");
  //   const viewedProcedures = await ViewedProcedures.getViewedProcedures();
  //   voteLocalList.forEach(vote => {
  //     const {
  //       procedureId,
  //       statusInt
  //     } = ViewedProcedures.prepareSetViewProcedure(vote);
  //     viewedProcedures[procedureId] = statusInt;
  //     console.log("setList");
  //   });
  //   console.log("saveList");
  //   await Keychain.setGenericPassword(
  //     "democracyVotes",
  //     JSON.stringify(viewedProcedures),
  //     ITEM_KEY
  //   );
  // };
}

export default ViewedProcedures;
