import React from "react";
import {View, Image, StyleSheet, Text} from "react-native";

import {Recipe} from "../Utils/interfaces";
import {colorNeutral} from "../Utils/colors";

const RecipeComponent = (props: Recipe) => {
    return (
        <View style={styles.recipeContainer}>
            <Image
                style={styles.recipeImage}
                source={{
                    uri: props.image
                }}
            />
            <View style={styles.recipeInfoContainer}>
                <Text>{props.name}</Text>
                <Text>{props.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    recipeContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: colorNeutral
    },
    recipeImage: {
        flex: 1,
        flexGrow: 2,
        marginRight: 10,
        aspectRatio: 1
    },
    recipeInfoContainer: {
        flex: 1,
        flexGrow: 3,
    },
});

export default RecipeComponent;