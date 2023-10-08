// import { createMaterialBottomTabNavigator } from "react-native-paper/lib/typescript/react-navigation";
import { BottomNavigation } from "react-native-paper";
import { HomeScreen, IngresarScreen, PerfilScreen, PruebaScreen, VenderScreen } from "../screens";
import { useState } from "react";
import { Camara } from "./Camara";

export const Tab = () => {
  // const Tab = createMaterialBottomTabNavigator();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: "perfil", title: "Perfil", icon: "account" },
    { key: "ingresar", title: "Ingresar", icon: "plus" },
    { key: "vender", title: "Vender", icon: "currency-usd" },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    perfil: PerfilScreen,
    principal: HomeScreen,
    ingresar: IngresarScreen,
    vender: VenderScreen,
    prueba: PruebaScreen,
  });
  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Home" component={HomeScreen} />
    //   <Tab.Screen name="Profile" component={PruebaScreen} />
    // </Tab.Navigator>
    <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />
  );
};
