import {WEBHOOK} from "./globals";
import {Recipe} from "./interfaces";
import {store} from "../redux/store";
import {signOutUser} from "../redux/actions/userActions";

export async function getRecipes(): Promise<Recipe[]> {
    return fetch(WEBHOOK + "/recipes")
        .then((resp) => {
            if (resp.status != 200) {
                throw resp.status;
            } else if (resp.headers.get("Content-Type")?.includes("text/html")) {
                throw 403;
            }
            return resp.json();
        })
        .catch((error) => {
            if (error == 403) {
                store.dispatch(signOutUser());
            } else {
                console.log(`apiCalls getActiveTours: ${error}`);
            }
        });
}