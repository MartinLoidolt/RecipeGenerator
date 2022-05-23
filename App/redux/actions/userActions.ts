import { User } from "../../Utils/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Action } from "../../Utils/interfaces";
import { reducerType } from "../types";
import { WEBHOOK } from "../../Utils/globals";

export const restoreUser = (userToken: User | null): Action => ({
    type: reducerType.restoreUsertokenType,
    payload: userToken,
});

const signIn = (userToken: User | null): Action => ({
    type: reducerType.signInType,
    payload: userToken,
});

const signOut = (): Action => ({
    type: reducerType.signOutType,
    payload: null,
});

async function sendLogoutRequest(): Promise<Response | void> {
    return fetch(`${WEBHOOK}/users/logout`, {
        method: "GET",
    }).catch((error) => {
        console.log(`apiCalls sendLogoutRequest: ${error}`);
    });
}

async function sendLoginRequest(
    username: string,
    password: string
): Promise<User> {
    console.log(`${WEBHOOK}/users/${username}?password=${password}`);
    return fetch(`${WEBHOOK}/users/${username}?password=${password}`, {
        method: "GET",
    })
        .then((resp) => {
            if (resp.status == 200) {
                return resp.json().then(json => {
                    return json;
                });
            } else {
                throw resp.status;
            }
        })
        .catch((error) => {
            if (error == 404) {
                throw error;
            } else {
                console.log(`apiCalls sendLoginRequest: ${error}`);
            }
        });
}

export const signInUser =
    (username: string, passowrd: string) => async (dispatch: any) => {
    console.log(username + passowrd);
        sendLoginRequest(username, passowrd)
            .then((user: User) => {
                AsyncStorage.setItem("user", JSON.stringify(user));
                dispatch(signIn(user));
            })
            .catch((error) => {
                if (error == 404) {
                    alert("Login fehlgeschlagen. Bitte versuchen Sie es erneut!");
                } else {
                    alert(error);
                    console.log("userActions signInUser: " + error);
                }
            });
    };

export const signOutUser = () => async (dispatch: any) => {
    sendLogoutRequest().then(() => {
        AsyncStorage.removeItem("user");
        dispatch(signOut());
    });
};
