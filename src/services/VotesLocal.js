import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';

class VotesLocal {
  /*
    Keychain structure
      // v0
      democracyVotes:
      {
        procedureId1: 0/1/2/3, (selection)
        procedureId2: 0/1/2/3,
      }

      // v1
      democracyVotesIndex
      {
        v: 1,
        i: [0,1,2,...] (buckets: democracyVotes0, democracyVotes1, democracyVotes2, ...)
      }
      democracyVotesX:
      {
        [
          {i: procedureId, s: null/1/2/3, t: DateISOString, c: constituency}
          {i: procedureId, s: null/1/2/3, t: DateISOString, c: constituency}
          ...
        ]
      }

    Structure given from/to read/writeKeychain:
      // can also be an array of those structures
      {
        v: 1,
        d: [
          {i: procedureId, s: null/1/2/3, t: DateISOString, c: constituency}
          {i: procedureId, s: null/1/2/3, t: DateISOString, c: constituency}
        ]
      }

    Structure returned from this interface via getVote/getVotes(array):
    {
      procedureId: String,
      selection: null/YES/NO/ABSTINATION,
      time: Date,
      constituency: String,
    }
  */

  static KEYCHAIN_INDEX_SERVICE = `${DeviceInfo.getBundleId()}.localVotesIndex`;
  static KEYCHAIN_VOTES_SERVICE = `${DeviceInfo.getBundleId()}.localVotes`; // IndexId is appended
  static KEYCHAIN_VOTES_SERVICE_VERSION_0 = undefined; // this is the correct value ¯\_(ツ)_/¯
  static KEYCHAIN_VERSION = 1;
  static KEYCHAIN_MAXSIZE = 100;
  static KEYCHAIN_INDEX_KEY = 'democracyIndex';
  static KEYCHAIN_VOTES_KEY = 'democracyVotes';

  // Read a v1 Chain
  // TYPESCRIPT make private
  static readKeychain = async () => {
    // Get Chain Index
    const keyindex = await Keychain.getGenericPassword(VotesLocal.KEYCHAIN_INDEX_SERVICE);
    // Is Chain Present and valid?
    if (!keyindex || !(await VotesLocal.validateKeychain(JSON.parse(keyindex.password)))) {
      // Do we have an old Chain available? (not saved to Chain)
      const oldChain = await VotesLocal.convertKeychainVersion0ToVersion1();
      if (oldChain) {
        return oldChain;
      }
      // Return a new Chain (not saved to Chain)
      return { v: VotesLocal.KEYCHAIN_VERSION, d: [] };
    }
    // Normal read
    let indexchain = JSON.parse(keyindex.password);
    indexchain.d = [];

    // Find all Buckets and retrive data
    await Promise.all(
      indexchain.i.map(async serviceId => {
        const service = VotesLocal.KEYCHAIN_VOTES_SERVICE + serviceId;
        const setData = await Keychain.getGenericPassword(service);
        if (setData) {
          indexchain.d.push(...JSON.parse(setData.password));
        }
      }),
    );

    // Cleanup index & return
    delete indexchain.i;
    return indexchain;
  };

  // Write a v1 Chain
  // TYPESCRIPT make private
  static writeKeychain = async data => {
    // Split Data into packages to avoid error on 65k
    // https://github.com/oblador/react-native-keychain/issues/184
    let index = [];
    while (data.d && data.d.length > 0) {
      const set = data.d.splice(0, VotesLocal.KEYCHAIN_MAXSIZE);
      const setServiceId = index.length;
      const setService = VotesLocal.KEYCHAIN_VOTES_SERVICE + setServiceId;
      // Write Bucket
      await Keychain.setGenericPassword(
        VotesLocal.KEYCHAIN_VOTES_KEY,
        JSON.stringify(set),
        setService,
      );
      index.push(setServiceId);
    }

    // Delete Data, Add Index
    delete data.d;
    data.i = index;

    // Write Index
    return await Keychain.setGenericPassword(
      VotesLocal.KEYCHAIN_INDEX_KEY,
      JSON.stringify(data),
      VotesLocal.KEYCHAIN_INDEX_SERVICE,
    );
  };

  // Get Version of given chain
  // TYPESCRIPT make private
  static getKeychainVersion = chain => {
    if (!chain) {
      return null;
    }
    if (!chain.v) {
      return 0;
    }
    return chain.v;
  };

  // Check if given chain has the correct properties
  // TYPESCRIPT make private
  static validateKeychain = chain => {
    if (!chain || !chain.v || !chain.v === VotesLocal.KEYCHAIN_VERSION || !chain.i) {
      return false;
    }
    return true;
  };

  // Convert the Keychain from v0 to v1
  // TYPESCRIPT make private
  static convertKeychainVersion0ToVersion1 = async () => {
    // Get v0 Chain
    const oldChainRaw = await Keychain.getGenericPassword(
      VotesLocal.KEYCHAIN_VOTES_SERVICE_VERSION_0,
    );
    // Old Chain present?
    if (!oldChainRaw) {
      return false;
    }
    const oldChain = JSON.parse(oldChainRaw.password);

    // Determin Version
    const version = await VotesLocal.getKeychainVersion(oldChain);
    if (version !== 0) {
      return false;
    }

    // Convert Chain
    const newChain = { v: VotesLocal.KEYCHAIN_VERSION, d: [] };
    // TODO Check to use map or reduce
    for (let [key, value] of Object.entries(oldChain)) {
      if (value === 0) {
        value = null;
      }
      // Time is 1970-01-01T00:00:00.000Z
      newChain.d.push({ i: key, s: value, t: new Date(0).toISOString(), c: null });
    }

    // Retrun converted Chain
    return newChain;
  };

  // Convert a Data Object from the Chain to return Object
  // TYPESCRIPT make private
  static convertFromKeychain = ({ i, s, t, c }) => {
    let selection;
    switch (s) {
      case 1:
        selection = 'YES';
        break;
      case 2:
        selection = 'ABSTINATION';
        break;
      case 3:
        selection = 'NO';
        break;
      default:
        selection = null;
        break;
    }
    return {
      procedureId: i,
      selection,
      time: new Date(t),
      constituency: c,
    };
  };

  // Convert a Data Object to a Chain Object
  // TYPESCRIPT make private
  static convertToKeychain = ({ procedureId, selection, time, constituency }) => {
    let s;
    switch (selection) {
      case 'YES':
        s = 1;
        break;
      case 'ABSTINATION':
        s = 2;
        break;
      case 'NO':
        s = 3;
        break;
      default:
        s = null;
        break;
    }
    return { i: procedureId, s, t: time.toISOString(), c: constituency };
  };

  // Get the VoteData for given procedureId
  static getVote = async procedureId => {
    const chain = await VotesLocal.readKeychain();

    // Find the requested Data
    const data = chain.d.find(({ i }) => {
      return i === procedureId;
    });
    // No data in Chain
    if (!data) {
      return null;
    }

    // Return converted result
    return VotesLocal.convertFromKeychain(data);
  };

  // Get all available VoteData
  static getVotes = async () => {
    const chain = await VotesLocal.readKeychain();

    return chain.d.map(val => VotesLocal.convertFromKeychain(val));
  };

  // Write VoteData
  static setVote = async ({ procedureId, selection, constituency }) => {
    let chain = await VotesLocal.readKeychain();

    // Find the requested Data
    const data = chain.d.find(({ i }) => {
      return i === procedureId;
    });
    // Data alread in the Chain
    if (data) {
      return false;
    }

    // Add Data to Data Object
    chain.d.push(
      VotesLocal.convertToKeychain({
        procedureId,
        selection,
        time: new Date(),
        constituency,
      }),
    );

    // Write Chain
    return VotesLocal.writeKeychain(chain);
  };

  // Reset Chain
  // For Debug purposes only
  // TYPESCRIPT make private
  /*
  static reset = async () => {
    console.log('reset');
    // Delete Chain
    // await Keychain.resetGenericPassword(VotesLocal.KEYCHAIN_VOTES_SERVICE_VERSION_0);
    return await Keychain.resetGenericPassword(VotesLocal.KEYCHAIN_INDEX_SERVICE);
  };
  */
}

export default VotesLocal;
