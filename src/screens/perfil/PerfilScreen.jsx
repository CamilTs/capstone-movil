import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const PerfilScreen = () => {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({
    nombre: "Juan",
    apellido: "Perez",
    email: "juan@gmail.com",
    telefono: "123456789",
    direccion: "Av. Pedro de valdivia 400 42, Providencia",
    fotoPerfil: "https://www.mundodeportivo.com/alfabeta/hero/2023/06/avatar-1.webp",
  });

  const cerrarSesion = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.contenedor.contenedor}>
      <View style={styles.contenedor.informacion}>
        <View style={styles.contenedor.fotoPeril}>
          <Avatar.Image size={200} source={{ uri: usuario.fotoPerfil }} />
        </View>
        <View style={styles.contenedor.datos}>
          <View style={styles.contenedor.campo}>
            <Text style={styles.texto.label}>Nombre:</Text>
            <Text style={styles.texto.campo}>{usuario.nombre}</Text>
          </View>
          <View style={styles.contenedor.campo}>
            <Text style={styles.texto.label}>Apellido:</Text>
            <Text style={styles.texto.campo}>{usuario.apellido}</Text>
          </View>
          <View style={styles.contenedor.campo}>
            <Text style={styles.texto.label}>Email:</Text>
            <Text style={styles.texto.campo}>{usuario.email}</Text>
          </View>
          <View style={styles.contenedor.campo}>
            <Text style={styles.texto.label}>Telefono:</Text>
            <Text style={styles.texto.campo}>{usuario.telefono}</Text>
          </View>
          <View style={styles.contenedor.campo}>
            <Text style={styles.texto.label}>Direccion:</Text>
            <Text style={styles.texto.campo}>{usuario.direccion}</Text>
          </View>
        </View>
      </View>

      <View style={styles.contenedor.boton}>
        <Button
          buttonColor="red"
          mode="contained"
          textColor="#fff"
          style={styles.button.danger.estilos}
          labelStyle={styles.button.danger.text}
          onPress={cerrarSesion}
        >
          Cerrar Sesión
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    contenedor: {
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      // backgroundColor: "#ff2e2e55",
      height: "100%",
    },
    fotoPeril: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: -100,
    },
    informacion: {
      paddingTop: 100,
      width: "90%",
      padding: 20,
      justifyContent: "end",
      alignItems: "center",
      // elevation: 10,
      // shadowColor: "#000",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#b8b8b89e",
    },
    datos: {
      width: "100%",
      // backgroundColor: "#ce2eff52",
      gap: 10,
    },
    boton: {
      width: "80%",
      // backgroundColor: "#f82eff52",

      alignItems: "center",
      justifyContent: "center",
    },
    campo: {
      borderBottomColor: "#00000037",
      borderBottomWidth: 1,
    },
  },
  button: {
    danger: {
      estilos: {
        width: "80%",
      },
      text: {
        fontWeight: "700",
      },
    },
    // danger: {
    //   backgroundColor: "red",
    //   textColor: "#fff",
    //   textWeight: {
    //     bold: "bold",
    //     normal: "normal",
    //   },
    // },
  },
  texto: {
    campo: {
      fontSize: 16,
    },
    label: {
      color: "#919191",
    },
  },
  textInformacion: {},
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  androidShadow: {},
});
