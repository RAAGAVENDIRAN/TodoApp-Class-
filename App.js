//Default Imports
import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./features/store";

//Component Imports
import Navigator from "./screens/Navigator";

function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigator />
      </View>
    </Provider>
  );
}

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default App;
