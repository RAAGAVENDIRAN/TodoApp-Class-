//Default Imports
import React from "react";
import { View, StyleSheet } from "react-native";

//Third Party imports
import * as Icons from "@expo/vector-icons";

export default function IconsGreater({
  iconType = "Entypo",
  name = "chevron-right",
  size = 20,
  color,
  style,
  onPress,
}) {
  let Icon = Icons[iconType];
  return (
    <View style={[styles.circle, style]}>
      <Icon name={name} size={size} color={color} onPress={onPress}></Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 35,
    height: 35,
    backgroundColor: "red",
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
});
