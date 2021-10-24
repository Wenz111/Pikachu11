import { PikaBotCommands } from "../../../constants/firebase.js";
import { databaseReference } from "../config.js";
import { child, get } from "firebase/database";

// Retrieve an array of PikaBotCommands
export const GetPikaBotCommands = async () => {
  return await get(child(databaseReference, `${PikaBotCommands}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return "No data available";
      }
    })
    .catch((error) => {
      return error;
    });
};

// Retrieve an array of PikaBotCommands keys
export const GetPikaBotCommandsKeys = async () => {
  return await get(child(databaseReference, `${PikaBotCommands}`))
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

// Retrieve the value based on the PikaBotCommands keys
export const GetValueFromKey = async (key) => {
  return await get(child(databaseReference, `${PikaBotCommands}`))
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
