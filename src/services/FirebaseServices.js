import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// Business logic for creating items

const FirebaseServices = {
  ////////////////////////////////////
  // WAREHOUSE SECTION
  // createWarehouse: (inputs) => {
  //   setDoc(doc(db, "warehouses", inputs.name), {
  //     information: [
  //       {
  //         name: inputs.name,
  //         email: inputs.email,
  //         address: inputs.address,
  //         phone: inputs.phone,
  //       },
  //     ],
  //     Items: [],
  //   });
  // },

  // Better way to create warehouse with custom ID - Ref: Firestore docs: https://firebase.google.com/docs/firestore/manage-data/add-data
  createWarehouse: async (inputs) => {
    try {
      setDoc(doc(collection(db, "warehouses")), {
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
    } catch (error) {
      console.error(error);
    }
  },

  // Delete Warehouse

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

  updateQuantities: async (warehouse, updatedQtyArr) => {
    try {
      const whseRef = doc(db, "warehouses", warehouse);
      await updateDoc(whseRef, {
        Items: updatedQtyArr,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default FirebaseServices;
