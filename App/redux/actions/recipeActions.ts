import {Action, Recipe} from "../../Utils/interfaces";
import {reducerType} from "../types";
import {getRecipes} from "../../Utils/apiCalls";

export const storeRecipes = (recipes: Recipe[]): Action => ({
    type: reducerType.storeRecipesType,
    payload: recipes,
});

export const onGetRecipes = () => async (dispatch: any) => {
    getRecipes()
        .then(async (recipes: Recipe[]) => {
            await dispatch(storeRecipes(recipes));
        })
        .catch((error) => {
            console.log(`recipeActions onGetRecipes: ${error}`);
        });
};