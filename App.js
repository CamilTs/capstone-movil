import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { Button, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PrincipalScreen } from "./src/screens/principal/PrincipalScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Camara } from "./src/components";
import { AppProvider } from "./src/context/AppContext";
import { FormularioIngresar } from "./src/screens/ingresar/components/FormularioIngresar";
import { LoginScreen } from "./src/screens";
const Stack = createStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <SafeAreaProvider>
          <AppProvider>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Principal" component={PrincipalScreen} options={{ headerShown: true }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
              <Stack.Screen name="Camara" component={Camara} options={{ headerShown: true }} />
              <Stack.Screen name="FormularioIngresar" component={FormularioIngresar} options={{ headerShown: true }} />
            </Stack.Navigator>
          </AppProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
