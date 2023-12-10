import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { DataTable, AnimatedFAB, Button, IconButton, MD3Colors } from "react-native-paper";
import { useAppContext } from "../../context/AppContext";
import { useApi } from "../../api/api";

export const IngresarScreen = () => {
  const { productos, disminuirCantidad, aumentarCantidad, limpiarProductos, notificacion } = useAppContext();
  const { put } = useApi();
  const navigator = useNavigation();
  const ingresarProducto = () => {
    navigator.navigate("Camara", { tipo: "ingresar" });
  };

  const subirProductos = async () => {
    try {
      const response = await put("producto/actualizar/stock", { productos });
      if (response.success) {
        limpiarProductos();
        ToastAndroid.show("Productos ingresados", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.contenedor}>
      <DataTable>
        <DataTable.Header>
          {/* <DataTable.Title>Codigo de barra</DataTable.Title> */}
          <DataTable.Title>Producto</DataTable.Title>
          <DataTable.Title>Cantidad</DataTable.Title>
          <DataTable.Title>Acciones</DataTable.Title>
        </DataTable.Header>

        {productos.map((agregado, index) => (
          <DataTable.Row key={index}>
            {/* <DataTable.Cell>{agregado.codigo_barra}</DataTable.Cell> */}
            <DataTable.Cell>{agregado.nombre}</DataTable.Cell>
            <DataTable.Cell>{agregado.cantidad}</DataTable.Cell>
            <DataTable.Cell>
              {/* <Button icon="camera" mode="contained" compact="false" onPress={() => console.log("Pressed")}></Button> */}
              <IconButton
                icon="minus"
                mode="contained"
                containerColor={MD3Colors.error50}
                iconColor={MD3Colors.neutral100}
                size={20}
                onPress={() => disminuirCantidad(agregado._id)}
              />
              <IconButton
                icon="plus"
                mode="contained"
                containerColor={"#00c700"}
                iconColor={MD3Colors.neutral100}
                size={20}
                onPress={() => aumentarCantidad(agregado._id)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <View style={[styles.contenedorMensaje, { display: productos.length == 0 ? "flex" : "none" }]}>
        <Text style={styles.mensaje}>No se han ingresado productos</Text>
      </View>
      <Button mode="contained" onPress={subirProductos} disabled={productos.length == 0 ? true : false}>
        Ingresar
      </Button>
      <Button mode="contained" onPress={async () => await notificacion({ data: { nombre: "Camilo", cantidad: 4, succes: true } })}>
        notificacion
      </Button>
      <AnimatedFAB icon={"plus"} style={[styles.fab.container, styles.fab.fabStyles]} onPress={ingresarProducto} />
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    height: "100%",
  },
  fab: {
    container: {
      flexGrow: 1,
    },
    fabStyles: {
      bottom: 16,
      right: 16,
      position: "absolute",
    },
  },
  contenedorMensaje: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MD3Colors.neutral70,
    marginBottom: 10,
  },
  mensaje: {
    fontSize: 20,
    fontWeight: "bold",
    color: MD3Colors.neutral100,
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  contenedorBoton: {
    backgroundColor: MD3Colors.error50,
    borderRadius: 50,
    width: 5,
    height: 5,
  },
});
