import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import Iconic from "./components/Iconic";

import Navigator from "./screens/Navigator";
import Profile from "./screens/Profile";
import { Provider } from "react-redux";
import store from "./features/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
