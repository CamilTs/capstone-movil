import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from "react-hook-form";
import { Button, Avatar } from "react-native-paper";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { control, setFocus, handleSubmit } = useForm({
    defaultValues: {
      rut: "",
      password: "",
    },
    mode: "onChange",
  });

  const login = () => {
    navigation.navigate("Principal");
  };
  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.ContainerImg}>
          <Avatar.Image size={300} source={require("../../../assets/img/login.png")} />
        </View>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            { type: "text", name: "rut", rules: { required: "Campo obligatorio" }, textInputProps: { label: "Rut" } },
            { type: "password", name: "password", rules: { required: "Campo obligatorio" }, textInputProps: { label: "Contraseña" } },
          ]}
        />
        <Button mode="contained" onPress={login}>
          Iniciar Sesión
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  ContainerImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewStyle: {
    padding: 15,
    justifyContent: "start",
  },
  headingStyle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
  },
});
