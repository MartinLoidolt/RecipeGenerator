import {Action, Recipe} from "../../Utils/interfaces";
import {reducerType} from "../types";
import {getGeneratedRecipes, getRecipes} from "../../Utils/apiCalls";

export const storeRecipes = (recipes: Recipe[]): Action => ({
    type: reducerType.storeRecipesType,
    payload: recipes,
});

export const storeGeneratedRecipes = (recipes: Recipe[]): Action => ({
    type: reducerType.storeGeneratedRecipesType,
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

export const onGetGeneratedRecipes = () => async (dispatch: any) => {
    getGeneratedRecipes()
        .then(async (recipes: Recipe[]) => {
            await dispatch(storeGeneratedRecipes(recipes));
        })
        .catch((error) => {
            console.log(`recipeActions onGetGeneratedRecipes: ${error}`);
        });
};