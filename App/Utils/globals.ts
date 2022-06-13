import {colorBackground, colorPrimary, colorTextDark, colorTextLight} from "./colors";

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

export const StyleGuidelines = {
    borderWidth: 2,
    borderRadius: 3,
    smallFontSize: 12,
    mediumFontSize: 14,
    bigFontSize: 18,
};

