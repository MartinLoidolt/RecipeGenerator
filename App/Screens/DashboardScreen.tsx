import React from 'react';
import {ScrollView, StyleSheet, View, Text} from "react-native";
import Button from "../Components/Button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {colorPrimary} from "../Utils/colors";
import RecipeComponent from "../Components/Recipe";
import {Recipe} from "../Utils/interfaces";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {RootState} from "../redux/store";
import {onGetGeneratedRecipes} from "../redux/actions/recipeActions";

export default function() {

    let generatedRecipes: Recipe[] = useAppSelector(
        (state: RootState) => state.recipe.generatedRecipes
    );

    const dispatch = useAppDispatch();

    return (
        <View style={styles.container}>
            <Button
                width={'100%'}
                height={50}
                title={""}
                onPress={() => {dispatch(onGetGeneratedRecipes())}}
                type="filled"
                color={colorPrimary}
                icon={() => <FontAwesome name={"refresh"} size={18} color={'#fff'} />}
            />
            <ScrollView style={styles.recipesContainer} showsVerticalScrollIndicator={false}>
                {
                    generatedRecipes?.map((recipe, index) => {
                        return (
                            <View key={index}>
                                <Text style={styles.text}>Tag {index + 1}</Text>
                                <RecipeComponent style={styles.recipeComponent} recipe={recipe}/>
                            </View>
                        );

                    })
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '7%',
    },
    recipesContainer: {
        marginTop: '3%'
    },
    recipeComponent: {
        marginBottom: '3%',
    },
    text: {
        fontWeight: 'bold',
        marginBottom: '1%'
    }
});