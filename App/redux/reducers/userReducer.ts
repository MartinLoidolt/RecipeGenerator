import { User } from "../../Utils/interfaces";
import { reducerType } from "../types";

export interface SignInState {
    isLoading: boolean;
    isSignout: boolean;
    userToken: User | null;
}

export const userInitialState: SignInState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
};

export const userReducer = (
    prevState: SignInState = userInitialState,
    action: any
) => {
    switch (action.type) {
        case reducerType.restoreUsertokenType:
            return {
                ...prevState,
                userToken: action.payload,
                isLoading: false,
            };
        case reducerType.signInType:
            return {
                ...prevState,
                isSignout: false,
                userToken: action.payload,
            };
        case reducerType.signOutType:
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
            };
        default:
            return prevState;
    }
};
