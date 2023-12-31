import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthToken, cerrarSesion as logout } from "../../store/auth";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useApi } from "../../api/api";

export const PerfilScreen = () => {
  const { get } = useApi();
  const [loading, setLoading] = useState(false);
  const { rut, nombre, apellido, correo, rol, direccion, telefono, imagen, id } = useSelector((state) => state.auth);
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  // const { get, loading } = Api();
  const navigation = useNavigation();

  const cerrarSesion = () => {
    dispatch(logout());
  };
  const prueba = () => {
    console.log(img);
  };

  const buscarImg = async () => {
    setLoading(true);
    if (!id) return;
    console.log(rut);
    const res = await get(`usuario/img/${rut}`);
    const { data, success } = res;
    console.log("Este es el success", success);
    if (!success) {
      setLoading(false);

      return;
    } else {
      if (!data.imagen) {
        setImg("../../../assets/img/desconocido.jpeg");
        return;
      }
      setImg(data.imagen);
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    buscarImg();
  }, [id]);

  return (
    <View style={styles.contenedor.contenedor}>
      <View style={styles.contenedor.informacion}>
        <View style={styles.contenedor.fotoPeril}>
          {loading && <ActivityIndicator animating={true} color={MD2Colors.red500} />}
          {img != "" ? (
            <Avatar.Image size={200} source={{ uri: img }} />
          ) : (
            // <View style={{ width: "200px", height: "200px", backgroundColor: "yellow" }}></View>
            <Avatar.Image size={200} source={{ uri: "../../../assets/img/desconocido.jpeg" }} />
          )}
        </View>
        <View style={styles.contenedor.datos}>
          <View style={styles.contenedor.campo}>
            <Text style={styles.texto.label}>Nombre:</Text>
            <Text style={styles.texto.campo}>{nombre}</Text>
          </View>
          <View style={styles.contenedor.campo}>
            <Text style={styles.texto.label}>Apellido:</Text>
            <Text style={styles.texto.campo}>{apellido}</Text>
          </View>
          <View style={styles.contenedor.campo}>
            <Text style={styles.texto.label}>Email:</Text>
            <Text style={styles.texto.campo}>{correo}</Text>
          </View>
          <View style={styles.contenedor.campo}>
            <Text style={styles.texto.label}>Telefono:</Text>
            <Text style={styles.texto.campo}>{telefono}</Text>
          </View>
          <View style={styles.contenedor.campo}>
            <Text style={styles.texto.label}>Direccion:</Text>
            <Text style={styles.texto.campo}>{direccion}</Text>
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
        {/* <Button
          buttonColor="red"
          mode="contained"
          textColor="#fff"
          style={styles.button.danger.estilos}
          labelStyle={styles.button.danger.text}
          onPress={prueba}
        >
          Prueba
        </Button> */}
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
