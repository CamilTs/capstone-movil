import { useSelector } from "react-redux";
import { useApi } from "../../api/api";
import { revisando, login, logout } from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useJwt, decodeToken } from "react-jwt";
import jwt_decode from "jwt-decode";

export const revisandoAutentication = (rut, contrasena) => {
  return async (dispatch) => {
    dispatch(revisando());
  };
};

export const autenticando = ({ rut, contrasena }) => {
  return async (dispatch) => {
    const { api } = useApi();
    dispatch(revisando());
    try {
      console.log("ESTE ES EL THUNK DE LOGIN r");
      const response = await api.post("autenticacion/login", { rut, contrasena });
      console.log("======== Autenticando =========");
      console.log(response);
      const { data } = response;
      if (!data.success) return dispatch(logout({ errorMessage: data.data }));
      await AsyncStorage.setItem("token", data.data.token);
      dispatch(login({ ...data.data }));
    } catch (error) {
      console.log("ESTE ES UN ERROR");
      console.log(error.message);
    }
  };
};

export const cerrarSesion = () => {
  return async (dispatch) => {
    dispatch(revisando());
    try {
      await AsyncStorage.removeItem("token");
      dispatch(logout({ errorMessage: null }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const checkAuthToken = (token) => {
  console.log(token);
  return async (dispatch) => {
    try {
      dispatch(revisando());
      const decoded = jwt_decode(token);
      const { exp } = decoded;
      console.log(decoded);
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp <= currentTime) {
        console.log("Vencio");
        await AsyncStorage.removeItem("token");

        return dispatch(logout({ errorMessage: null }));
      }

      if (!token) return dispatch(logout({ errorMessage: null }));
      console.log("no vencio");
      dispatch(login({ ...decoded }));
    } catch (error) {
      dispatch(logout({ errorMessage: error.message }));
    }
  };
};
// export const checkAuthToken = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(revisando());

//       const token = await AsyncStorage.getItem("token");
//       const { decodedToken, isExpired } = useJwt(token);

//       console.log(decodedToken, isExpired);
//       // if (!token) return dispatch(logout({ errorMessage: null }));

//       //   const res = await api.post(`verificarToken`, { token });
//       //   console.log(res);
//       //   dispatch(login({ ...res.data.data }));
//     } catch (error) {
//       console.log(error);
//       //   dispatch(logout({ errorMessage: error.message }));
//     }
//   };
// };
