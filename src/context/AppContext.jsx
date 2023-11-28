import { createContext, useContext, useState } from "react";
import { useApi } from "../api/api";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const { get } = useApi();

  const agregarProducto = async (codigoBarra) => {
    try {
      console.log({ codigoBarra });
      const res = await get(`producto/buscar/codigoBarra/${codigoBarra}`);
      console.log({ res });
      if (!res.success) {
        return;
      }
      const producto = res.data;
      const encontrado = productos.findIndex((p) => p._id === producto._id);
      if (encontrado !== -1) {
        const copiaProductos = [...productos];
        copiaProductos[encontrado].cantidad += 1;
        setProductos(copiaProductos);
        return;
      } else {
        producto.cantidad += 1;
        setProductos([...productos, { ...producto, minimo: 0 }]);
      }
    } catch (error) {}
  };

  const disminuirCantidad = (_id) => {
    const encontrado = productos.findIndex((p) => p._id === _id);
    if (encontrado !== -1) {
      const copiaProductos = [...productos];
      if (copiaProductos[encontrado].cantidad === 1) {
        copiaProductos.splice(encontrado, 1);
        setProductos(copiaProductos);
        return;
      } else {
        copiaProductos[encontrado].cantidad -= 1;
        setProductos(copiaProductos);
        return;
      }
    }
  };

  const aumentarCantidad = (_id) => {
    const encontrado = productos.findIndex((p) => p._id === _id);
    if (encontrado !== -1) {
      const copiaProductos = [...productos];
      copiaProductos[encontrado].cantidad += 1;
      setProductos(copiaProductos);
      return;
    }
  };

  const limpiarProductos = () => {
    setProductos([]);
  };

  const value = {
    productos,
    agregarProducto,
    disminuirCantidad,
    aumentarCantidad,
    limpiarProductos,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
