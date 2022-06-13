import {Recipe} from "../../Utils/interfaces";
import {reducerType} from "../types";

export interface recipeState {
    recipes: Recipe[],
    generatedRecipes: Recipe[]
}

export const recipeInitialState: recipeState = {
    recipes: [],
    generatedRecipes: [],
};

export const recipeReducer = (
    prevState: recipeState = recipeInitialState,
    action: any
) => {
    switch (action.type) {
        case reducerType.storeRecipesType:
            return {
                ...prevState,
                recipes: action.payload,
            };
        case reducerType.storeGeneratedRecipesType:
            return {
              ...prevState,
              generatedRecipes: action.payload,
            };
        default:
            return prevState;
    }
};
