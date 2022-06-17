import React, { useEffect } from "react";
import {StyleSheet, View} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import LoginScreen from "./Screens/LoginScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import SettingsScreen from "./Screens/SettingsScreen";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { restoreUser } from "./redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { signOutUser } from "./redux/actions/userActions";
import {themeNavigation} from "./Utils/globals";
import {RecipeStackNavigator} from "./Navigators/RecipeNavigator";

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
        <View style={styles.container}>
            <GestureHandlerRootView style={styles.container}>
                <NavigationContainer
                    theme={themeNavigation}>
                    <Drawer.Navigator
                        screenOptions={{gestureEnabled: false, swipeEnabled: false}}
                        drawerContent={props => {
                            if (userToken != null) {
                                return renderDrawerContent(props);
                            } else {
                                return renderDrawerContentLogin(props);
                            }
                    }}>
                        {
                            !userToken ? (
                                <>
                                    <Drawer.Screen name={"Login"} component={LoginScreen}/>
                                    {/*Delete the 3 Drawer.Screens below*/}
                                    {
                                        /*
                                        <Drawer.Screen name={"Dashboard"} component={DashboardScreen}/>
                                        <Drawer.Screen name={"Rezepte"} component={RecipeStackNavigator}/>
                                        <Drawer.Screen name={"Einstellungen"} component={SettingsScreen}/>
                                         */
                                    }
                                </>
                            ) : (
                                <>
                                    <Drawer.Screen name={"Dashboard"} component={DashboardScreen}/>
                                    <Drawer.Screen name={"Rezepte"} component={RecipeStackNavigator}/>
                                    <Drawer.Screen name={"Einstellungen"} component={SettingsScreen}/>
                                </>
                            )
                        }
                    </Drawer.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView>
        </View>

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
      flex: 1,
  },
});
