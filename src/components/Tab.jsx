// import { createMaterialBottomTabNavigator } from "react-native-paper/lib/typescript/react-navigation";
import { BottomNavigation } from "react-native-paper";
import { HomeScreen, IngresarScreen, LoginScreen, PerfilScreen, PruebaScreen, VenderScreen } from "../screens";
import { useEffect, useState } from "react";
import { Camara } from "./Camara";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { checkAuthToken } from "../store/auth";
import { useJwt } from "react-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FormularioIngresar } from "../screens/ingresar/components/FormularioIngresar";
const TabMenu = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <TabMenu.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
          if (route.name == "Perfil") {
            iconName = focused ? "ios-person-circle" : "ios-person-circle-outline";
          } else if (route.name == "Ingresar") {
            iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
          } else if (route.name == "Vender") {
            iconName = focused ? "ios-cash" : "ios-cash-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <TabMenu.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
      <TabMenu.Screen name="Ingresar" component={IngresarScreen} options={{ headerShown: false }} />
      <TabMenu.Screen name="Vender" component={VenderScreen} options={{ headerShown: false }} />
    </TabMenu.Navigator>
  );
};
export const Tab = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const cargarToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch(checkAuthToken(token));
    }
  };
  useEffect(() => {
    cargarToken();
  }, []);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={status == "autenticado" ? "Perfil" : "Login"}>
        {status == "no-autenticado" ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: true, title: "Gestor de inventarios" }} />
            <Stack.Screen name="Camara" component={Camara} options={{ headerShown: false }} />
            <Stack.Screen name="FormularioIngresar" component={FormularioIngresar} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
