import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { productos } from "../../../productos";

export const FormularioIngresar = ({ route }) => {
  const { codigoBarra } = route.params;
  const navigator = useNavigation();
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      codigoBarra: codigoBarra,
      nombre: "",
      precio: "",
    },
    mode: "onChange",
  });

  const ingresarProducto = (producto) => {
    productos.push(producto);
    navigator.goBack();
  };
  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text>{codigoBarra}</Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            { type: "text", name: "codigoBarra", rules: { disabled: false, required: true }, textInputProps: { label: "Codigo de barras" } },
            { type: "text", name: "nombre", rules: { required: "Nombre requerido" }, textInputProps: { label: "Nombre" } },
            { type: "text", name: "precio", rules: { required: "Precio requerido" }, textInputProps: { label: "Precio", inputMode: "numeric" } },
          ]}
        />
        <Button mode="contained" onPress={handleSubmit(ingresarProducto)}>
          Ingresar
        </Button>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
  },
  headingStyle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
  },
});
