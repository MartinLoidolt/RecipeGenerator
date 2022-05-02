import {useState} from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {SearchBar} from "react-native-elements";
import {colorBackground} from "../Utils/colors";
import RecipeComponent from "../Components/Recipe"
import {Recipe} from "../Utils/interfaces";

export default function() {

    const [search, setSearch] = useState<string>("");

    const updateSearch = (search: string) => {
        setSearch(search);
    };

    const recipes: Recipe[] = [
        {
            id: 1,
            image: "https://www.springlane.de/magazin/wp-content/uploads/2017/11/Klassischer-Bratapfel-mit-Marzipan-Nuss-Füllung_74803_featured.jpg",
            name: "Apfel",
            description: "Bratapfeil"
        },
        {
            id: 2,
            image: "https://www.springlane.de/magazin/wp-content/uploads/2017/11/Klassischer-Bratapfel-mit-Marzipan-Nuss-Füllung_74803_featured.jpg",
            name: "Lasagne",
            description: "Bratapfeil"
        },
        {
            id: 3,
            image: "https://www.springlane.de/magazin/wp-content/uploads/2017/11/Klassischer-Bratapfel-mit-Marzipan-Nuss-Füllung_74803_featured.jpg",
            name: "Fisch",
            description: "Bratapfeil"
        },
    ]

    return (
            <View style={styles.container}>
                <SearchBar
                    style={styles.search}
                    containerStyle={styles.searchContainer}
                    lightTheme
                    placeholder="Search Here..."
                    value={search}
                    //@ts-ignore
                    onChangeText={(text) => updateSearch(text)}
                    autoCorrect={false}
                />
                <ScrollView style={styles.recipesContainer} showsVerticalScrollIndicator={false}>
                    {
                        recipes.map((recipe) => {
                            return <RecipeComponent key={recipe.id} style={styles.recipeComponent} recipe={recipe}/>
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