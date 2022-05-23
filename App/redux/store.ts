import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import {recipeReducer} from "./reducers/recipeReducer";


export const store = configureStore({
   reducer: {
       user: userReducer,
       recipe: recipeReducer,
   } ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;