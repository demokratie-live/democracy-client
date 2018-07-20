import * as Keychain from "react-native-keychain";
import DeviceInfo from "react-native-device-info";
import _ from "lodash";

class VotesLocal {
  static KEYCHAIN_SERVICE = `${DeviceInfo.getBundleId()}.localVotes`;

  static getVotesLocal = async () => {
    const keychain = await Keychain.getGenericPassword(this.KEYCHAIN_SERVICE);
    if (keychain) {
      return JSON.parse(keychain.password);
    }
    return {};
  };

  static resetVotesLocal = async () =>
    Keychain.resetGenericPassword(this.KEYCHAIN_SERVICE);

  static getVotesLocalList = async () => {
    const votesLocal = await VotesLocal.getVotesLocal();
    const list = [];
    _.forEach(votesLocal, (value, key) => {
      list.push({ procedureId: key, selection: value });
    });
    return list;
  };

  static getVoteLocal = async procedureId => {
    const votesLocal = await VotesLocal.getVotesLocal();
    switch (votesLocal[procedureId]) {
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

  static prepareSetVoteLocal = ({ procedureId, selection }) => {
    let selectionInt;
    switch (selection) {
      case "YES":
        selectionInt = 1;
        break;
      case "ABSTINATION":
        selectionInt = 2;
        break;
      case "NO":
        selectionInt = 3;
        break;

      default:
        selectionInt = 0;
        break;
    }
    return { procedureId, selectionInt };
  };

  static setVoteLocal = async ({ procedureId, selection }) => {
    const votesLocal = await VotesLocal.getVotesLocal();

    const { selectionInt } = VotesLocal.prepareSetVoteLocal({
      procedureId,
      selection
    });

    votesLocal[procedureId] = selectionInt;

    await Keychain.setGenericPassword(
      "democracyVotes",
      JSON.stringify(votesLocal),
      this.KEYCHAIN_SERVICE
    );
  };

  static setVoteLocalList = async voteLocalList => {
    const votesLocal = await VotesLocal.getVotesLocal();
    voteLocalList.forEach(vote => {
      const { procedureId, selectionInt } = VotesLocal.prepareSetVoteLocal(
        vote
      );
      votesLocal[procedureId] = selectionInt;
    });
    await Keychain.setGenericPassword(
      "democracyVotes",
      JSON.stringify(votesLocal),
      this.KEYCHAIN_SERVICE
    );
  };
}

export default VotesLocal;
