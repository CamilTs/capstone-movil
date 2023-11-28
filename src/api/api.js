import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://capstone-api-mhrj.onrender.com";

export const api = axios.create({
  baseURL: url,
});
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
  const get = async (path = "") => {
    const token = await AsyncStorage.getItem("token");
    const res = await api.get(path, { headers: { Authorization: `Bearer ${token}` } });
    const { data } = res;

    return data;
  };
  const post = async (path = "", data = {}, options = {}) => {
    const headers = { ...options };
    const token = await AsyncStorage.getItem("token");
    headers["Authorization"] = `Bearer ${token}`;
    const res = await api.post(path, data, { headers: { ...headers } });
    const { data: resData } = res;
    return resData;
  };
  const put = async (path = "", data = {}, options = {}) => {
    const headers = { ...options };
    const token = await AsyncStorage.getItem("token");
    headers["Authorization"] = `Bearer ${token}`;
    const { data: resData } = await api.put(path, data, { headers: { ...headers } });
    return resData;
  };
  const remove = async (path = "", options = {}) => {
    const headers = { ...options };
    const token = await AsyncStorage.getItem("token");
    headers["Authorization"] = `Bearer ${token}`;
    return await api.delete(path, headers);
  };

  return {
    get,
    post,
    put,
    remove,
  };
};

// Llama a setAuthToken al inicio de tu aplicación para configurar el token si está disponible.
// setAuthToken();
