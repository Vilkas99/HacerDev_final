import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    datos1 : 0, 
    datos2 : {},
    datos3 : {},
    datos4 : {},
    mensaje: "Nos encontramos cargando los datos...",

    
  },
  reducers: {
    fnAsignarDatos1: (state, action) => {
      state.datos1 = state.valor;
    },

    fnAsignarDatos2: (state, action) => {
        state.datos2 = state.valor;
    },

    fnAsignarDatos3: (state, action) => {
        state.datos3 = state.valor;
    },

    fnAsignarDatos4: (state, action) => {
        state.datos4 = state.valor;
    },

    fnAsignarMensaje: (state, action) => {
        state.mensaje = state.valor;
    },

  },
});

export const {
  fnAsignarDatos1, fnAsignarDatos2, fnAsignarDatos3, fnAsignarDatos4, fnAsignarMensaje
} = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDatos1 = (state) => state.app.cargando;
export const selectDatos2 = (state) => state.app.cargando;
export const selectDatos3 = (state) => state.app.cargando;
export const selectDatos4 = (state) => state.app.cargando;
export const selectMensaje = (state) => state.app.mensaje;

  

export default appSlice.reducer;
