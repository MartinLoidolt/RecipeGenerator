import {useEffect, useState} from "react";
import {View, StyleSheet, ScrollView, TextInput, Pressable} from "react-native";
import {colorBackground} from "../Utils/colors";
import RecipeComponent from "../Components/Recipe"
import {Recipe} from "../Utils/interfaces";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {onGetRecipes} from "../redux/actions/recipeActions";
import {RootState} from "../redux/store";

export default function RecipesScreen({ navigation }: any) {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(onGetRecipes());
    }, []);

    const [search, setSearch] = useState<string>("");

    const updateSearch = (search: string) => {
        setSearch(search);
    };

    let recipes: Recipe[] = useAppSelector(
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
                        recipes?.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase())).map((recipe) => {
                            return (
                                <Pressable key={recipe.recipeId} onPress={() => navigation.navigate('RecipeDetails', recipe)}>
                                    <RecipeComponent style={styles.recipeComponent} recipe={recipe}/>
                                </Pressable>
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
    searchContainer: {
        padding: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: colorBackground,
    },
    search: {
        width: '100%',
        height: 50,
        borderColor: '#a9a9a9',
        borderWidth: 1,
        borderRadius: 3,
        paddingStart: 8,
    },
    recipesContainer: {
      marginTop: '3%'
    },
    recipeComponent: {
        marginBottom: '3%',
    }
});