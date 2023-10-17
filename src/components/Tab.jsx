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

const TabMenu = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <TabMenu.Navigator>
      <TabMenu.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
      <TabMenu.Screen name="Ingresar" component={IngresarScreen} options={{ headerShown: false }} />
    </TabMenu.Navigator>
  );
};
export const Tab = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const Tab = createBottomTabNavigator();
  // const [index, setIndex] = useState(0);
  // const [routes, setRoutes] = useState([
  //   { key: "perfil", title: "Perfil", icon: "account" },
  //   { key: "ingresar", title: "Ingresar", icon: "plus" },
  //   { key: "vender", title: "Vender", icon: "currency-usd" },
  // ]);
  // const renderScene = BottomNavigation.SceneMap({
  //   perfil: PerfilScreen,
  //   principal: HomeScreen,
  //   ingresar: IngresarScreen,
  //   vender: VenderScreen,
  //   prueba: PruebaScreen,
  // });
  // return (
  //   // <Tab.Navigator>
  //   //   <Tab.Screen name="Home" component={HomeScreen} />
  //   //   <Tab.Screen name="Profile" component={PruebaScreen} />
  //   // </Tab.Navigator>
  //   <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />
  // );
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
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
