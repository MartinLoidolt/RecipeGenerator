import {useState} from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {SearchBar} from "react-native-elements";
import {colorBackground} from "../Utils/colors";
import RecipeComponent from "../Components/Recipe"

export default function() {

    const [search, setSearch] = useState<string>("");

    const updateSearch = (search: string) => {
        setSearch(search);
        console.log(search);
    };

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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.recipeComponent}>
                        <RecipeComponent
                            id={1}
                            name={"test"}
                            description={"123"}
                            image={"https://www.springlane.de/magazin/wp-content/uploads/2017/11/Klassischer-Bratapfel-mit-Marzipan-Nuss-Füllung_74803_featured.jpg"}
                        />
                    </View>
                    <View style={styles.recipeComponent}>
                        <RecipeComponent
                            id={1}
                            name={"test"}
                            description={"123"}
                            image={"https://www.springlane.de/magazin/wp-content/uploads/2017/11/Klassischer-Bratapfel-mit-Marzipan-Nuss-Füllung_74803_featured.jpg"}
                        />
                    </View>
                    <View style={styles.recipeComponent}>
                        <RecipeComponent
                            id={1}
                            name={"test"}
                            description={"123"}
                            image={"https://www.springlane.de/magazin/wp-content/uploads/2017/11/Klassischer-Bratapfel-mit-Marzipan-Nuss-Füllung_74803_featured.jpg"}
                        />
                    </View>
                    <View style={styles.recipeComponent}>
                        <RecipeComponent
                            id={1}
                            name={"test"}
                            description={"123"}
                            image={"https://www.springlane.de/magazin/wp-content/uploads/2017/11/Klassischer-Bratapfel-mit-Marzipan-Nuss-Füllung_74803_featured.jpg"}
                        />
                    </View>
                    <View style={styles.recipeComponent}>
                        <RecipeComponent
                            id={1}
                            name={"test"}
                            description={"123"}
                            image={"https://www.springlane.de/magazin/wp-content/uploads/2017/11/Klassischer-Bratapfel-mit-Marzipan-Nuss-Füllung_74803_featured.jpg"}
                        />
                    </View>
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
    recipeComponent: {
        marginTop: '3%',
    }
});