import React, { useEffect } from "react";
import {Platform, StatusBar, StyleSheet, Text} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import LoginScreen from "./Screens/LoginScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import RecipesScreen from "./Screens/RecipesScreen";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { restoreUser } from "./redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { signInUser, signOutUser } from "./redux/actions/userActions";

const Drawer = createDrawerNavigator();

export function App() {

    const dispatch = useAppDispatch();
    //AsyncStorage.clear(); //If you need to delete the User Data everytime you start the app you can enable it.

    useEffect(() => {
        async function getUser() {
            await AsyncStorage.getItem("user")
                .then((userJson) => {
                    dispatch(restoreUser(JSON.parse(userJson + "")));
                })
                .catch((error) => console.log(`App useEffect restoreUser: ${error}`));
        }

        getUser();
    }, []);

    const isLoading = useAppSelector((state) => state.user.isLoading);
    const userToken = useAppSelector((state) => state.user.userToken);

    function renderDrawerContent(props: any) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Ausloggen"
                    onPress={() => dispatch(signOutUser())}
                />
            </DrawerContentScrollView>
        );
    }

    function renderDrawerContentLogin(props: any) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        );
    }

    return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => {
            if (userToken != null && !isLoading) {
                return renderDrawerContent(props);
            } else {
                return renderDrawerContentLogin(props);
            }
        }}>
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

export default function AppContainer() {
  return (
      <Provider store={store}>
        <App />
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
