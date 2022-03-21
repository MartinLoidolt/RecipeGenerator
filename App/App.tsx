import {Platform, StatusBar, StyleSheet, Text} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

import LoginScreen from "./Screens/LoginScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import RecipesScreen from "./Screens/RecipesScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  const userToken = null;
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator>
          {
            !userToken ? (
                <>
                  <Drawer.Screen name={"Login"} component={LoginScreen}/>
                </>
            ) : (
                <>
                  <Drawer.Screen name={"Dashboard"} component={DashboardScreen}/>
                  <Drawer.Screen name={"Rezepte"} component={RecipesScreen}/>
                  <Drawer.Screen name={"Einstellungen"} component={SettingsScreen}/>
                </>
            )
          }
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
