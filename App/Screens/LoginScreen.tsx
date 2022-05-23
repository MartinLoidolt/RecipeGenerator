import { useState } from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { useAppDispatch } from "../redux/hooks";
import { signInUser } from "../redux/actions/userActions";
import {colorTextDark} from "../Utils/colors";

export default function LoginScreen() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useAppDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.headerRecipe}>Recipe</Text>
                <Text style={styles.headerGenerator}>Generator</Text>
            </View>
            <View style={styles.inputs}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Passwort"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <Button
                    title="Anmelden"
                    onPress={() => {dispatch(signInUser(username, password))}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '7%',
    },
    headerView: {
      flex: 1,
    },
    headerRecipe: {
        fontSize: 100,
        fontWeight: "bold",
        color: colorTextDark,
    },
    headerGenerator: {
        fontSize: 50,
        fontWeight: "bold",
        alignSelf: "flex-end",
        color: colorTextDark,
    },
    inputs: {
        flex: 1,
    },
    textInputContainer: {
        paddingHorizontal: 0,
    },
    textInput: {
        width: '100%',
        height: 50,
    },
    button: {

    }
});