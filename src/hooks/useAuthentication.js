import { db, app } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup
  // prevents memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth(app);

  function checkIfCancelled() {
    if (cancelled) {
      return;
    }
  }

  // register
  const createUser = async (data) => {
    checkIfCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "Senha fraca!";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "Email já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro!";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  // logout
  const logout = () => {
    checkIfCancelled();
    signOut(auth);
  };

  // login
  const login = async (data) => {
    checkIfCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha inválida.";
      } else {
        systemErrorMessage = "Credenciais inválidas!";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  };
};
