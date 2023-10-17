import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "no-autenticado", // revisando-autenticacion, autenticado, no-autenticado
    rut: null,
    id: null,
    nombre: null,
    apellido: null,
    correo: null,
    rol: null,
    direccion: null,
    telefono: null,
    token: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "autenticado";
      state.rut = payload.rut;
      state.id = payload.id;
      state.nombre = payload.nombre;
      state.apellido = payload.apellido;
      state.correo = payload.correo;
      state.rol = payload.rol;
      state.direccion = payload.direccion;
      state.telefono = payload.telefono;
      state.token = payload.token;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "no-autenticado";
      state.rut = null;
      state.id = null;
      state.nombre = null;
      state.apellido = null;
      state.correo = null;
      state.rol = null;
      state.direccion = null;
      state.telefono = null;
      state.token = null;
      state.errorMessage = payload.errorMessage;
    },
    revisando: (state, { payload }) => {
      state.status = "revisando-autenticacion";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, revisando } = authSlice.actions;
