import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { DataTable, AnimatedFAB, Button } from "react-native-paper";
import { useAppContext } from "../../context/AppContext";

export const IngresarScreen = () => {
  const { lstAgregados } = useAppContext();
  const navigator = useNavigation();
  const ingresarProducto = () => {
    navigator.navigate("Camara", { tipo: "ingresar" });
  };
  return (
    <View style={styles.contenedor}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Codigo de barra</DataTable.Title>
          <DataTable.Title>Producto</DataTable.Title>
          <DataTable.Title>Cantidad</DataTable.Title>
          <DataTable.Title>Acciones</DataTable.Title>
        </DataTable.Header>

        {lstAgregados.map((agregado, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{agregado.codigoBarra}</DataTable.Cell>
            <DataTable.Cell>{agregado.nombre}</DataTable.Cell>
            <DataTable.Cell>{agregado.cantidad}</DataTable.Cell>
            <DataTable.Cell>
              <Text>E</Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Button>Ingresar</Button>
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
});
