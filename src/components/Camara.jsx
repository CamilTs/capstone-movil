import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Dialog } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";
import { useSocketContext } from "../context/SocketContext";
import { useApi } from "../api/api";
import { useSelector } from "react-redux";

export const Camara = ({ route }) => {
  const { get } = useApi();
  const { agregarProducto } = useAppContext();
  const { comercio, id } = useSelector((state) => state.auth);
  const { tipo } = route.params;
  const { socket } = useSocketContext();
  const [codigoBarra, setCodigoBarra] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleAgregar, setVisibleAgregar] = useState(false);
  const [isVisibleIngresar, setIsVisibleIngresar] = useState(false);
  const [scanned, setScanned] = useState(false);
  // const { agregarVendidos, agregarAgregados, validarProducto } = useAppContext();
  const navigation = useNavigation();

  const verificarProducto = async (codigoBarra) => {
    const res = await get(`producto/${codigoBarra}/${comercio}`);
    console.log({ res });
    console.log(res.success);
    return res.success;
  };

  const manejarCodigoBarra = async ({ type, data }) => {
    setCodigoBarra(data);
    setScanned(() => true);
    const isVerificado = await verificarProducto(data);
    if (tipo === "vender") {
      setVisible(true);

      // AQUI SE USA EL SOCKET PARA ENVIAR EL CODIGO DE BARRA
      socket.emit("venderProducto", { codigoBarra: data, comercio_id: comercio, usuario_id: id });
      setCodigoBarra("");

      // agregarVendidos(codigoBarra);
    } else {
      console.log({ isVerificado });
      if (!isVerificado) {
        setIsVisibleIngresar(true);
        return;
      } else {
        setVisibleAgregar(true);
        agregarProducto(data);
        console.log("EN LA DB");
      }
      // agregarAgregados(data);
    }
  };

  const hideDialog = () => {
    setScanned(false);
    setVisible(false);
  };

  const volver = () => {
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission == null) {
    return (
      <View>
        <Text>Solicitando permiso de cámara</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : manejarCodigoBarra} style={StyleSheet.absoluteFillObject} />
      {scanned && (
        <Button
          title={"Presiona para escanear de nuevo"}
          onPress={() => {
            setScanned(false);
            setCodigoBarra("");
          }}
        />
      )}

      <Dialog visible={visible}>
        <Dialog.Title>Alerta</Dialog.Title>
        <Dialog.Content>
          <Text>¿Desea escanear de nuevo?</Text>

          <Dialog.Actions>
            <Button onPress={volver}>No</Button>
            <Button onPress={hideDialog}>Si</Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
      <Dialog visible={isVisibleIngresar}>
        <Dialog.Title>Alerta</Dialog.Title>
        <Dialog.Content>
          <Text>Producto no registrado.</Text>
          <Text>¿Desea ingresar el producto?</Text>

          <Dialog.Actions>
            <Button onPress={volver}>No</Button>
            <Button
              onPress={() => {
                navigation.navigate("FormularioIngresar", { codigoBarra: codigoBarra });
                setIsVisibleIngresar(false);
                // setTimeout(() => {
                setScanned(false);
                // }, 1000);
              }}
            >
              Si
            </Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
      <Dialog visible={visibleAgregar}>
        <Dialog.Title>Alerta</Dialog.Title>
        <Dialog.Content>
          <Text>¿Desea seguir agregando productos?</Text>

          <Dialog.Actions>
            <Button onPress={volver}>No</Button>
            <Button
              onPress={() => {
                setVisibleAgregar(false);
                setScanned(false);
              }}
            >
              Si
            </Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
