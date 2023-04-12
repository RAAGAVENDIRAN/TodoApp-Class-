//default Imports
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";

//Third-Party Imports
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//components IMports
import SearchToDo from "../components/SearchToDo";
import BottomButton from "../components/BottomButton";
import Listing from "../components/Listing";
import ListingPending from "../components/ListingPending";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_TODO,
  currentUser,
  removeDetails,
  searchTodo,
  setTodo,
} from "../features/actions";
import { useIsFocused } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import AppText from "../components/AppText";

import store from "../features/store";

const Tab = createMaterialTopTabNavigator();
let findTab = 1;

function ToDoList({ navigation }) {
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const isFocused = useIsFocused();
  let profile = user.profile;

  //getting data from redux
  const { completedTodo, pendingTodo } = useSelector((state) => state.todo);

  const isFetched = useSelector((state) => state.todo.isFetched);

  //state
  const [search, setSearch] = useState("");
  const [searchTodo, setSearchTodo] = useState(completedTodo);

  let completedTodoArr = [];
  Object.keys(completedTodo).filter((key) => {
    completedTodoArr.push(completedTodo[key.toString()]);
  });
  let pendingTodoArr = [];
  Object.keys(pendingTodo).filter((key) => {
    pendingTodoArr.push(pendingTodo[key.toString()]);
  });

  let searchTodoArr = [];
  Object.keys(searchTodo).filter((key) => {
    searchTodoArr.push(searchTodo[key.toString()]);
  });

  //datas
  const userId = user.userId;
  const username = user.username;
  // console.log(userId);

  //getdata from async storage
  useEffect(() => {
    if (!isFetched) {
      console.log("Get Data Called");
      dispatch({
        type: GET_TODO,
        payload: {
          userId: userId,
        },
      });
    }
  }, [user]);

  //
  useEffect(() => {
    if (findTab == 1) {
      setSearchTodo(completedTodo);
    } else {
      setSearchTodo(pendingTodo);
    }
  }, [completedTodo, pendingTodo]);

  //fonts
  let [fontsLoaded] = useFonts({ Poppins_400Regular });

  // Search function
  const Searching = (newtext) => {
    setSearch(newtext);

    if (Object.values(findTab ? completedTodo : pendingTodo).length) {
      let objSearch = Object.values(
        findTab ? completedTodo : pendingTodo
      ).filter((item) => {
        let itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
        let textData = newtext.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setSearchTodo(objSearch);
    }
  };

  // setting the current tab array
  const setTab = (tab) => {
    if (tab == 1) {
      setSearchTodo(completedTodo);
    } else {
      setSearchTodo(pendingTodo);
    }
    // console.log(obj);
  };

  // if (isFocused) {
  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <View style={styles.Headercontainer}>
          <View style={{ flexDirection: "row" }}>
            <View>
              {profile ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate({
                      name: "Profile",
                    });
                  }}
                >
                  <Image source={{ uri: profile }} style={styles.circle} />
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate({
                      name: "Profile",
                    });
                  }}
                >
                  <Image
                    source={require("../assets/profile.png")}
                    style={styles.circle}
                  />
                </TouchableWithoutFeedback>
              )}
            </View>
            <AppText style={styles.HeaderText}>Hi {user.username}</AppText>
          </View>
          <View>
            <MaterialIcons
              name="restore-from-trash"
              style={styles.Headericon}
              size={40}
              color="black"
              onPress={() => {
                navigation.navigate({
                  name: "Trash",
                });
              }}
            />
          </View>
        </View>

        <SearchToDo
          style={{ backgroundColor: "#fff" }}
          value={search}
          placeholder={"Search Here"}
          onChangeText={Searching}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,

          tabBarStyle: {
            backgroundColor: "#F3F8FF",
            fonFamily: "Poppins_400Regular",
          },
        }}
      >
        <Tab.Screen
          listeners={({ navigation, route }) => ({
            focus: (e) => {
              console.log("IN cOMPLETED");
              setTab(1);
              findTab = 1;
            },
            blur: (e) => {
              // setTab(0);
              if (search !== "") Searching("");
            },
          })}
          options={{
            tabBarStyle: {
              backgroundColor: "#fff",
              labelStyle: {
                fontFamily: "Poppins_400Regular",
                fontSize: 30,
              },
            },
          }}
          name="Completed"
          children={() => {
            return (
              <Listing
                navigation={navigation}
                completedTodoArr={
                  findTab === 1 ? searchTodoArr : completedTodoArr
                }
              />
            );
          }}
        />
        <Tab.Screen
          listeners={({ navigation, route }) => ({
            focus: (e) => {
              setTab(0);
              findTab = 0;
            },
            blur: (e) => {
              if (search !== "") Searching("");
            },
          })}
          name="Pending"
          children={() => {
            return (
              <ListingPending
                navigation={navigation}
                pendingTodoArr={findTab === 0 ? searchTodoArr : pendingTodoArr}
              />
            );
          }}
        />
      </Tab.Navigator>

      {search === "" ? (
        <BottomButton
          navigated={() => {
            navigation.navigate({
              name: "InputModel",
            });
          }}
        />
      ) : null}
    </View>
  );
}
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Top: {
    backgroundColor: "#B0DAFF",
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 20,
  },

  itemStyle: {
    padding: 10,
  },

  HeaderText: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },

  circle: {
    height: 50,
    width: 50,
    backgroundColor: "#E4DCCF",
    borderRadius: 25,
  },

  Headercontainer: {
    paddingTop: 20,
    height: 80,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  DesignText: {
    fontSize: 25,
    width: "80%",
    color: "black",
    fontFamily: "Poppins_700Bold_Italic",
  },
});

export default ToDoList;
