import { createContext, useContext, useState } from "react";
import { productos } from "../productos";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [lstAgregados, setLstAgregados] = useState([]);
  const [lstVendidos, setLstVendidos] = useState([]);

  const validarProducto = (codigoBarra) => {
    const encontrado = productos.find((producto) => producto.codigoBarra === codigoBarra);
    console.log(encontrado);
    return encontrado ? true : false;
  };

  const agregarAgregados = (codigoBarra) => {
    // console.log(codigoBarra);
    // const productoIndex = lstAgregados.findIndex((producto) => producto.codigoBarra === codigoBarra.codigoBarra);
    // console.log({ mensaje: "PRoducto encontrado", productoIndex });
    // setLstAgregados([...lstAgregados, codigoBarra]);
    const producto = productos.find((producto) => producto.codigoBarra === codigoBarra);

    // const productoEncontrado = productos.findInd((producto) => producto.codigoBarra === codigoBarra);
    const productoIndex = lstAgregados.findIndex((producto) => producto.codigoBarra === codigoBarra.codigoBarra);

    console.log(productoIndex);
    if (productoIndex !== -1) {
      setLstAgregados((prev) =>
        prev.map((producto, index) => (index === productoIndex ? { ...producto, cantidad: producto.cantidad + 1 } : producto))
      );
    } else {
      // Si el producto no se encuentra en lstAgregados, agrégalo con cantidad 1
      setLstAgregados([...lstAgregados, { ...producto, cantidad: 1 }]);
    }
    console.log(lstAgregados);
  };

  const agregarVendidos = (codigoBarra) => {
    const productoEncontrado = productos.find((producto) => producto.codigoBarra === codigoBarra);
    console.log(productoEncontrado);
    setLstVendidos([...lstVendidos, codigoBarra]);
  };

  const value = {
    // USUARIO
    usuario,

    // AGREGADOS
    lstAgregados,
    agregarAgregados,
    // VENDIDOS
    lstVendidos,
    agregarVendidos,

    // FUNCIONES
    validarProducto,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
