import React, { useRef } from "react";
import {
    StyleSheet,
    Animated,
    ActivityIndicator,
    Text,
    Pressable,
    View,
} from "react-native";

import { StyleGuidelines } from "../Utils/globals";

export interface ButtonProps {
    width?: number | string;
    height?: number | string;
    aspectRatio?: number;
    title: string;
    onPress: () => void;
    color?: string;
    textColor?: string;
    fontSize?: number;
    icon?: (props: {
        focused?: boolean;
        size?: number;
        color?: string;
    }) => React.ReactNode;
    type: "filled" | "outlined" | "link";
    isLoading?: boolean;
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
    const buttonAnim = useRef(new Animated.Value(1)).current;

    const buttonFadeIn = () => {
        Animated.timing(buttonAnim, {
            toValue: 0.6,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const buttonFadeOut = () => {
        Animated.timing(buttonAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const styles = StyleSheet.create({
        box: {
            width: props.width,
            height: props.height,
        },
        container: {
            width: "100%",
            height: "100%",
            aspectRatio: props.aspectRatio,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: props.type == "outlined" ? StyleGuidelines.borderWidth : 0,
            borderRadius: props.type == "link" ? 0 : StyleGuidelines.borderRadius,
            borderColor: props.type == "outlined" ? props.color : undefined,
            backgroundColor: props.type == "filled" ? props.color : undefined,
        },
        containerDisabled: {
            width: "100%",
            height: "100%",
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: props.type == "outlined" ? StyleGuidelines.borderWidth : 0,
            borderRadius: props.type == "link" ? 0 : StyleGuidelines.borderRadius,
            // `...` changes the opacity of the color
            borderColor: props.type == "outlined" ? `${props.color}65` : undefined,
            backgroundColor: props.type == "filled" ? `${props.color}65` : undefined,
        },
        items: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
        },
        text: {
            fontSize: props.fontSize
                ? props.fontSize
                : StyleGuidelines.mediumFontSize,
            color: props.textColor,
        },
    });

    const iconNode = props.icon ? props.icon({ size: 24 }) : null;

    if (!props.isLoading) {
        return (
            <Pressable
                style={styles.box}
                onPress={props.onPress}
                onPressIn={buttonFadeIn}
                onPressOut={buttonFadeOut}
                disabled={props.disabled}
            >
                <Animated.View
                    style={
                        props.disabled
                            ? styles.containerDisabled
                            : [styles.container, { opacity: buttonAnim }]
                    }
                >
                    <View style={styles.items}>
                        {iconNode}
                        <Text style={styles.text}>{props.title}</Text>
                    </View>
                </Animated.View>
            </Pressable>
        );
    } else {
        return (
            <Pressable style={styles.box} onPress={props.onPress} disabled={true}>
                <View style={styles.containerDisabled}>
                    <View style={styles.items}>
                        <ActivityIndicator size={34} color={props.color} />
                    </View>
                </View>
            </Pressable>
        );
    }
};

export default Button;
