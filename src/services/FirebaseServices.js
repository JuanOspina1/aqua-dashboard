import {
  arrayUnion,
  collection,
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

  // Issue with this is that the items wont update upon creation - need to use onSnapshot but having issues with loading the snapshot data on the component
  snapWarehouse: async (selectedWhse) => {
    const docRef = doc(db, "warehouses", selectedWhse);
    const docSnap = await getDoc(docRef);

    console.log([
      docSnap.data()?.Items,
      docSnap.data()?.information,
      docSnap.id,
    ]);

    return [docSnap.data()?.Items, docSnap.data()?.information, docSnap.id];

    // onSnapshot(doc(db, "warehouses", selectedWhse), (doc) => {
    //   console.log([doc.data()?.Items, doc.data()?.information, doc.id]);
    //   let stuff = [doc.data()?.Items, doc.data()?.information, doc.id];
    //   return stuff;
    // });
  },

  // Better way to create warehouse with custom ID - Ref: Firestore docs: https://firebase.google.com/docs/firestore/manage-data/add-data
  createWarehouse: async (inputs) => {
    try {
      setDoc(doc(collection(db, "warehouses")), {
        information: [
          {
            id: doc.id,
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

  removeItemFromWhse: async (itemLotNumber, items, whseID) => {
    try {
      // lotNumber - pulled from the id in the row
      // whseInformation - pulled from the state in the parent state
      // items - copied array of the full items list for the warehouse we are actively working in

      // console.log("Clicked to delete item");

      const whseRef = doc(db, "warehouses", whseID);
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
