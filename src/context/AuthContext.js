import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import FirebaseServices from "../services/FirebaseServices";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [userInformation, setUserInformation] = useState({});

  function signUp(
    email,
    password,
    firstName,
    lastName,
    officeAddress,
    officePhone
  ) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      userInfo: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        officeAddress: officeAddress,
        officePhone: officePhone,
      },
    });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  // This would delete the current logged in user. The functionality I want would come from the Firebase Admin SDK - need to learn how to use and implement it.
  // function removeUser() {
  //   return deleteUser(user);
  // }

  useEffect(() => {
    console.log("Auth Ran");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // console.log("state = signed in");
        setUser(currentUser);
        //////////////////////////////////

        const getUserInfo = async (userEmail) => {
          try {
            const data = await FirebaseServices.getUserInformation(userEmail);
            // console.log(data);
            setUserInformation(data);
          } catch (error) {
            console.error(error);
          }
        };
        // console.log("this ran");
        // console.log(user);
        getUserInfo(currentUser.email);
      } else {
        console.log("state = signed out");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, logIn, logOut, user, userInformation }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
