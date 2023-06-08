import React, { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
   createUserWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
   updateProfile,
  
} from "firebase/auth";
import app from '../Firebase/config.firbase';

export const AuthContext = createContext()

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const createAccount = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

   const signIn = (email, password) => {
     setLoading(true);
     return signInWithEmailAndPassword(auth, email, password);
  };
   const updateUserProfile = (name, photo) => {
     return updateProfile(auth.currentUser, {
       displayName: name,
       photoURL: photo,
     });
  };
  
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (Currentuser) => {
    setUser(Currentuser);
    setLoading(false);
    if (Currentuser && Currentuser.email) {
      const loggedInUser = {
        email: Currentuser.email,
      };
      fetch("http://localhost:5000/jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loggedInUser),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);

          setLoading(false);
        });
    } else {
      localStorage.removeItem("token");
    }
  });
  return () => {
    return unsubscribe();
  };
}, []);
  const authInfo = {
    user,
    loading,
    createAccount,
    logOut,
    signIn,
    updateUserProfile,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;