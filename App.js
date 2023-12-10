import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { Button, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PrincipalScreen } from "./src/screens/principal/PrincipalScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Camara, Tab } from "./src/components";
import { AppProvider } from "./src/context/AppContext";
import { FormularioIngresar } from "./src/screens/ingresar/components/FormularioIngresar";
import { LoginScreen } from "./src/screens";
import { SocketProvider } from "./src/context/SocketContext";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/store";
import { useEffect } from "react";
const Stack = createStackNavigator();
export default function App() {
  // const { status } = useSelector((state) => state.auth);

  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <SafeAreaProvider>
            <SocketProvider>
              <AppProvider>
                <Tab />
                {/* <Stack.Navigator initialRouteName="Login">
                  <Stack.Screen name="Principal" component={PrincipalScreen} options={{ headerShown: true }} />
                  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
                  <Stack.Screen name="Camara" component={Camara} options={{ headerShown: true }} />
                  <Stack.Screen name="FormularioIngresar" component={FormularioIngresar} options={{ headerShown: true }} />
                </Stack.Navigator> */}
              </AppProvider>
            </SocketProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
