import { AnimatedFAB, Button, IconButton, Text, Tooltip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
export const VenderScreen = () => {
  const navigation = useNavigation(); // Inicializa la navegación

  // Función para navegar a la pantalla de la cámara
  const abrirCamara = () => {
    navigation.navigate("Camara", { tipo: "vender" }); // 'Camara' debe ser el nombre de la pantalla de la cámara en tu configuración de navegación
  };

  return (
    <View style={{ height: "100%" }}>
      <Button onPress={abrirCamara}>Presionar para abrir la cámara</Button>
      <AnimatedFAB icon={"plus"} style={[styles.fab.container, styles.fab.fabStyles]} />
    </View>
  );
};

const styles = StyleSheet.create({
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
