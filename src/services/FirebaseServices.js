import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// Business logic for creating items

const FirebaseServices = {
  ////////////////////////////////////
  // WAREHOUSE SECTION
  createWarehouse: (inputs) => {
    setDoc(doc(db, "warehouses", inputs.name), {
      information: [
        {
          name: inputs.name,
          email: inputs.email,
          address: inputs.address,
          phone: inputs.phone,
        },
      ],
      Items: [],
    });
  },

  // Delete Warehouse

  ///////////////////////////////////
  // USERS SECTION

  ///////////////////////////////////
  // ITEMS SECTION

  addItemArrToWhse: async (currWhse, formRows) => {
    const whseRef = doc(db, "warehouses", currWhse);
    await updateDoc(whseRef, {
      Items: arrayUnion(...formRows),
    });
  },

  removeItemFromWhse: async (itemLotNumber, whseInformation, items) => {
    try {
      // lotNumber - pulled from the id in the row
      // whseInformation - pulled from the state in the parent state
      // items - copied array of the full items list for the warehouse we are actively working in

      // console.log("Clicked to delete item");
      const [warehouseInfo] = whseInformation;
      const whseRef = doc(db, "warehouses", warehouseInfo.name);
      const result = items.filter(
        (remainingItems) => remainingItems.lotNumber !== itemLotNumber
      );
      await updateDoc(whseRef, {
        Items: result,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

export default FirebaseServices;
