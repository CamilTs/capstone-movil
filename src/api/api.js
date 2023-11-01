import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

const url = "http://192.168.2.104:3000";

// const api = axios.create({
//   baseURL: url,
//   headers: {
//     "Content-Type": "application/jsoasdasn",
//   },
// });
// export const setAuthToken = async () => {
//   try {
//     const token = await AsyncStorage.getItem("token"); // Reemplaza 'token' con el nombre real de la clave de tu token en AsyncStorage
//     if (token) {
//       api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     }
//   } catch (error) {
//     console.error("Error al configurar el token en las cabeceras Axios", error);
//   }
// };

export const useApi = () => {
  let api = null;
  let token = "";
  const cargarToken = async () => {
    token = await AsyncStorage.getItem("token");
    console.log({ token });
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    api = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // api.request({ headers: { "Authorization-2": `Bearer ${token}` } });
    console.log("================== Se esta ejecutando api ==================");
    console.log(api);
    console.log("================== Se esta ejecutando api ==================");
  };

  cargarToken();
  useEffect(() => {
    cargarToken();
  }, [api]);
  return {
    api,
  };
};

// Llama a setAuthToken al inicio de tu aplicación para configurar el token si está disponible.
// setAuthToken();
