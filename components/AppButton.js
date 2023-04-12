//Default Imports
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

//Components IMports
import colors from "../config/colors";
import AppText from "./AppText";

function AppButton({ title, onPress, style, font, size, textColor }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <AppText
        style={[
          styles.text,
          { fontFamily: font, fontSize: size, color: textColor },
        ]}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },

  text: {
    color: colors.black,
  },
});

export default AppButton;
