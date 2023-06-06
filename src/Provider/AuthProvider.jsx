import React, { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
   getAuth,
   onAuthStateChanged,
  
} from "firebase/auth";
import app from '../Firebase/config.firbase';

export const AuthContext = createContext(null)

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });
  return () => {
    return unsubscribe();
  };

  
}, []);
  const authInfo = {
    user
  }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;