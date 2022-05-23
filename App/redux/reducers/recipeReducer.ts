import {Recipe} from "../../Utils/interfaces";
import {reducerType} from "../types";

export interface recipeState {
    recipes: Recipe[],
}

export const recipeInitialState: recipeState = {
    recipes: [],
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
        default:
            return prevState;
    }
};
