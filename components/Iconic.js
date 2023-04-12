//Default Imports
import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

//Third-Party Imports
import { useFonts, Poppins_800ExtraBold } from "@expo-google-fonts/poppins";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Iconic({
  name,
  size,
  onPress,
  height,
  placeholder,
  isFocused,

  secureTextEntry,
  onChangeText,
  value,
}) {
  let [fontsLoaded, error] = useFonts({
    Poppins_800ExtraBold,
  });

  const [focused, setFocused] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        focused
          ? {
              borderWidth: 1,
              borderColor: "purple",
            }
          : {},
      ]}
    >
      <MaterialCommunityIcons
        style={styles.icon}
        name={name}
        size={size}
        onPress={onPress}
      />
      <TextInput
        style={[styles.text, { height: height }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        importantForAutofill="no"
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    margin: 10,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 0.88,
    shadowRadius: 10,
    shadowOffset: {
      height: 20,
      width: 0,
    },
    backgroundColor: "#fff",
  },
  text: {
    flex: 0.9,
    height: "100%",
    fontFamily: "Poppins_800ExtraBold",
    marginLeft: 5,
  },
  icon: {
    flex: 0.1,
    marginLeft: 5,
  },
});

export default Iconic;
