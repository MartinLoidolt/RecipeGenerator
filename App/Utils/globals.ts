import {createTheme} from "@react-native-elements/themed";
import {colorBackground, colorPrimary, colorSecondary, colorTextDark, colorTextLight} from "./colors";

export const WEBHOOK = "http://localhost:8080";

export const themeNavigation = {
    dark: false,
    colors: {
        primary: colorPrimary,
        background: colorBackground,
        card: colorTextLight,
        text: colorTextDark,
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

export const themeReactNativeElements = createTheme({
    colors: {
        primary: colorPrimary,
        secondary: colorSecondary,
        black: colorTextDark,

    },
    darkColors: {
        primary: colorPrimary,
        secondary: colorSecondary,
    }

});