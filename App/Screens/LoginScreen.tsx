import {Platform, Pressable, StatusBar, StyleSheet, Text, TextInput, TextInputComponent, View} from 'react-native';

export default function() {
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.headerRecipe}>Recipe</Text>
                <Text style={styles.headerGenerator}>Generator</Text>
            </View>
            <View style={styles.inputs}>
                <TextInput style={styles.textInput}/>
                <TextInput style={styles.textInput}/>
                <Pressable style={styles.button}>
                    <Text>Anmelden</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
    },
    headerView: {
      flex: 1,
    },
    headerRecipe: {
        fontSize: 100,
        fontWeight: "bold",
        color: "#222004",
    },
    headerGenerator: {
        fontSize: 50,
        fontWeight: "bold",
        alignSelf: "flex-end",
        color: "#232304"
    },
    inputs: {
        flex: 1,
    },
    textInput: {
        height: 40,
        marginVertical: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 3,
    },
    button: {
        height: 40,
        marginVertical: 9,
        borderRadius: 4,
        backgroundColor: "#297777",
        alignItems: 'center',
        justifyContent: 'center',
    }
});