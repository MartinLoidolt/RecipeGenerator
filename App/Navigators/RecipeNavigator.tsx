import React from "react";
import { createStackNavigator} from "@react-navigation/stack";
import RecipesScreen from "../Screens/RecipesScreen";
import RecipeDetailsScreen from "../Screens/RecipeDetailsScreen";

const Stack = createStackNavigator();

const RecipeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Recipes"} component={RecipesScreen} options={{headerShown: false}}/>
            <Stack.Screen
                name={"RecipeDetails"}
                component={RecipeDetailsScreen}
                options={({route}: any) => ({title: route.params.name})} />
        </Stack.Navigator>
    );
}

export { RecipeStackNavigator };