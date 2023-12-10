import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useApi } from "../api/api";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useSocketContext } from "./SocketContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const { socket } = useSocketContext();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [productos, setProductos] = useState([]);
  const { get } = useApi();

  const agregarProducto = async (codigoBarra) => {
    try {
      const res = await get(`producto/buscar/codigoBarra/${codigoBarra}`);
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

  const notificacion = async (alerta) => {
    await schedulePushNotification(alerta);
  };
  const escucharNotificacion = () => {
    socket.on("stockBajo", (alerta) => {
      notificacion(alerta);
    });
  };
  const value = {
    productos,
    agregarProducto,
    disminuirCantidad,
    aumentarCantidad,
    limpiarProductos,
    notificacion,
  };
  useEffect(() => {
    escucharNotificacion();

    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
async function schedulePushNotification({ data }) {
  const { nombre, cantidad, success } = data;

  let mensaje = {};

  if (success) {
    mensaje = {
      content: {
        title: "Producto repuesto",
        body: `Se ingreso ${cantidad} de ${nombre}`,
      },
      trigger: { seconds: 1 },
    };
  } else if (cantidad <= 0) {
    mensaje = {
      content: {
        title: "¡ALERTA de stock!",
        body: `El producto ${nombre} se ha agotado`,
      },
      trigger: { seconds: 1 },
    };
  } else {
    mensaje = {
      content: {
        title: "Alerta de stock",
        body: `El producto ${nombre} esta por agotarse`,
      },
      trigger: { seconds: 1 },
    };
  }
  await Notifications.scheduleNotificationAsync(mensaje);
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = await Notifications.getExpoPushTokenAsync({ projectId: "a41ae107-c930-4da5-a0ee-d3cfda66cd19" }).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
