import React from "react";
import { View, StyleSheet } from "react-native";
import * as Icons from "@expo/vector-icons";

export default function IconsProfile({
  iconType = "Ionicons",
  name = "settings-outline",
  size = 30,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
