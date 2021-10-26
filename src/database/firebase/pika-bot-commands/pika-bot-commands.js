import { RemoveItemFromArray } from "../../../utils/helpers/array-helper.js";
import { databaseReference } from "../config.js";
import { child, get } from "firebase/database";

// Retrieve an array of PikaBotCommands
const GetPikaBotAllCommandsKeys = async () => {
  return await get(child(databaseReference, `/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const pikaBotAllCommands = [];
        snapshot.forEach((childSnapshot) => {
          pikaBotAllCommands.push(childSnapshot.key);
        });
        return pikaBotAllCommands;
      } else {
        return "No data available";
      }
    })
    .catch((error) => {
      return error;
    });
};

// Handle blacklist PikaBotCommandsKeys and return an array of whitelist PikaBotCommandsKeys
export const GetWhitelistPikaBotCommandsKeys = async () => {
  const blacklistPikaBotCommandsKeys = [];
  const whitelistPikaBotCommandsKeys = await GetPikaBotAllCommandsKeys();

  blacklistPikaBotCommandsKeys.forEach((blacklistPikaBotCommandsKey) => {
    RemoveItemFromArray(pikaBotAllCommandsKeys, blacklistPikaBotCommandsKey);
  });

  return whitelistPikaBotCommandsKeys;
};

// // Retrieve a JSON object of all Pika Bot Commands
// const GetPikaBotCommands = async (whitelistPikaBotCommands) => {
//   return await get(child(databaseReference, `${whitelistPikaBotCommands}`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const pikaBotAllCommands = [];
//         snapshot.forEach((childSnapshot) => {
//           pikaBotAllCommands.push(childSnapshot.key);
//         });
//         return pikaBotAllCommands;
//       } else {
//         return "No data available";
//       }
//     })
//     .catch((error) => {
//       return error;
//     });
// };

// // Retrieve a JSON object of all Whitelist Pika Bot Commands
// export const GetWhitelistPikaBotCommands = async () => {
//   let whitelistPikaBotCommandsJson = {};
//   const whitelistPikaBotCommandsKeys = await GetWhitelistPikaBotCommandsKeys();

//   for (const whitelistPikaBotCommandsKey of whitelistPikaBotCommandsKeys) {
//     const temporaryWhitelistPikaBotCommands = whitelistPikaBotCommandsJson;
//     const whitelistPikaBotCommands = await GetPikaBotCommands(
//       whitelistPikaBotCommandsKey
//     );

//     whitelistPikaBotCommandsJson = {
//       ...temporaryWhitelistPikaBotCommands,
//       ...whitelistPikaBotCommands,
//     };
//   }

//   return whitelistPikaBotCommandsJson;
// };

// Retrieve an array of Pika Bot Slash Commands Keys
const GetPikaBotSlashCommandsKeys = async (whitelistPikaBotCommands) => {
  return await get(child(databaseReference, `${whitelistPikaBotCommands}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const keys = [];
        snapshot.forEach((childSnapshot) => {
          keys.push(...childSnapshot.val().key);
        });
        return keys;
      } else {
        return "No data available";
      }
    })
    .catch((error) => {
      return error;
    });
};

// Retrieve an array of whitelist Pika Bot Slash Commands Keys
export const GetAllPikaBotWhitelistSlashCommandsKeys = async () => {
  const slashCommandsKeys = [];
  const whitelistPikaBotCommandsKeys = await GetWhitelistPikaBotCommandsKeys();

  for (const whitelistPikaBotCommandsKey of whitelistPikaBotCommandsKeys) {
    slashCommandsKeys.push(
      ...(await GetPikaBotSlashCommandsKeys(whitelistPikaBotCommandsKey))
    );
  }

  return slashCommandsKeys;
};

// Retrieve the value based on the Pika Bot Commands Key
const GetValueFromPikaBotSlashCommandsKey = async (
  key,
  whitelistPikaBotCommands
) => {
  return await get(child(databaseReference, `${whitelistPikaBotCommands}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let value = "No data available";
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().key.includes(key)) {
            value = childSnapshot.val().value;
          }
        });
        return value;
      } else {
        return "No data available";
      }
    })
    .catch((error) => {
      return error;
    });
};

// Retrieve the value based on the Whitelist Pika Bot Commands Key
export const GetValueFromWhitelistPikaBotSlashCommandsKey = async (key) => {
  const whitelistPikaBotCommandsKeys = await GetWhitelistPikaBotCommandsKeys();

  for (const whitelistPikaBotCommandsKey of whitelistPikaBotCommandsKeys) {
    return await GetValueFromPikaBotSlashCommandsKey(
      key,
      whitelistPikaBotCommandsKey
    );
  }
};
