import {useEffect, useState} from "react";
import {View, StyleSheet, ScrollView, TextInput} from "react-native";
import {colorBackground} from "../Utils/colors";
import RecipeComponent from "../Components/Recipe"
import {Recipe} from "../Utils/interfaces";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {onGetRecipes} from "../redux/actions/recipeActions";
import {RootState} from "../redux/store";

export default function() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(onGetRecipes());
    }, []);

    const [search, setSearch] = useState<string>("");

    const updateSearch = (search: string) => {
        setSearch(search);
    };

    const recipes: Recipe[] = useAppSelector(
        (state: RootState) => state.recipe.recipes
    );

    return (
            <View style={styles.container}>
                <TextInput
                    style={styles.search}
                    placeholder="Search Here..."
                    value={search}
                    onChangeText={(text) => updateSearch(text)}
                    autoCorrect={false}
                />
                <ScrollView style={styles.recipesContainer} showsVerticalScrollIndicator={false}>
                    {
                        recipes.map((recipe) => {
                            return <RecipeComponent key={recipe.recipeId} style={styles.recipeComponent} recipe={recipe}/>
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
    searchContainer: {
        padding: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: colorBackground,
    },
    search: {
    },
    recipesContainer: {
      marginTop: '3%'
    },
    recipeComponent: {
        marginBottom: '3%',
    }
});