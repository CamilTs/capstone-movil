import axios from "axios";
import { useState } from "react";

const url = "http://192.168.2.105:3000";

export const api = axios.create({
  baseURL: url,
});

export const Api = () => {
  const [loading, setLoading] = useState(false);

  const get = async (endpoint) => {
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const post = async (endpoint, data) => {
    setLoading(true);
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    get,
    post,
  };
};
