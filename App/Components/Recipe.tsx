import React from "react";
import {View, Image, StyleSheet, Text} from "react-native";

import {RecipeProps} from "../Utils/interfaces";
import {colorNeutral} from "../Utils/colors";

const  RecipeComponent = (props: RecipeProps) => {
    return (
        <View key={"view" + props.recipe.recipeId} style={[styles.recipeContainer, {...props.style}]}>
            <Image
                key={"image" + props.recipe.recipeId}
                style={styles.recipeImage}
                source={{
                    uri: props.recipe.imageUrl
                }}
            />
            <View key={"textView" + props.recipe.recipeId} style={styles.recipeInfoContainer}>
                <Text key={"name" + props.recipe.recipeId} style={styles.name}>{props.recipe.name}</Text>
                <Text key={"description" + props.recipe.recipeId}>{props.recipe.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    recipeContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: colorNeutral
    },
    recipeImage: {
        flex: 1,
        flexGrow: 2,
        marginRight: 10,
        aspectRatio: 1,
        borderRadius: 3,
    },
    recipeInfoContainer: {
        flex: 1,
        flexGrow: 3,
    },
    name: {
      fontWeight: 'bold'
    },
});

export default RecipeComponent;