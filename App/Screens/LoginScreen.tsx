import { useState } from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { useAppDispatch } from "../redux/hooks";
import { signInUser } from "../redux/actions/userActions";
import {colorPrimary, colorTextDark} from "../Utils/colors";
import Button from "../Components/Button";

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
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Benutzername"
                    textContentType="username"
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Passwort"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <Button
                    type='filled'
                    height={50}
                    color={colorPrimary}
                    textColor={colorTextDark}
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
        marginBottom: 10,
        width: '100%',
        height: 50,
        borderColor: '#a9a9a9',
        borderWidth: 1,
        borderRadius: 3,
        paddingStart: 8,
    },
    button: {

    }
});