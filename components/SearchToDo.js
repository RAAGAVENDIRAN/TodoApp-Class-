import React, { useRef, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";

function SearchToDo({ onChangeText, placeholder, value, style }) {
  // const inputRef = useRef(); //auto focus using Ref

  // useEffect(() => {
  //   if (fontsLoaded) inputRef.current.focus();
  // }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        style={[styles.Inputdesign, style]}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  Inputdesign: {
    width: "80%",
    paddingHorizontal: 25,
    marginBottom: 20,
    borderRadius: 35,
    fontSize: 15,
    borderWidth: 0.5,
    backgroundColor: "white",
    height: 50,
    fontFamily: "Poppins_300Light",
    elevation: 10,
  },
});

export default SearchToDo;
