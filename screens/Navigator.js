import React, { useRef, useState, useEffect } from "react";
import { AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import store from "../features/store";

import ToDoList from "./ToDoList";
import InputModel from "../components/InputModel";
import EditModel from "../components/EditModel";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Trash from "./Trash";
import EditProfile from "./EditProfile";
import { APP_STATE, APP_CLOSING } from "../features/actions";

const Stack = createNativeStackNavigator();

let fromLogIn = true;
let fromSignIn = false;
export default function NavigatorPage() {
  //
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.currentUser);
  // const completedTodo = useSelector((state) => state.todo.completedTodo);
  // const pendingTodo = useSelector((state) => state.todo.pendingTodo);
  // const trashTodo = useSelector((state) => state.todo.trashTodo);
  // console.log(completedTodo);
  // console.log(pendingTodo);
  // console.log(trashTodo);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;

      if (!fromLogIn && appState.current === "background") {
        console.log("AppState");
        dispatch({
          type: APP_STATE,
          payload: {
            completedTodo: store.getState().todo.completedTodo,
            pendingTodo: store.getState().todo.pendingTodo,
            trashTodo: store.getState().todo.trashTodo,
            userId: store.getState().user.currentUser.userId,
          },
        });
      }
    });
    // return () => {
    //   subscription.remove();
    // };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
          listeners={() => ({
            blur: () => {
              // console.log("blur");
              fromLogIn = false;
            },

            focus: () => {
              console.log("Focus");
              // console.log(fromLogIn);
              if (fromSignIn) {
                fromSignIn = false;
              } else if (!fromLogIn) {
                console.log("call dispatch");

                dispatch({
                  type: APP_CLOSING,
                  payload: {
                    completedTodo: store.getState().todo.completedTodo,
                    pendingTodo: store.getState().todo.pendingTodo,
                    trashTodo: store.getState().todo.trashTodo,
                    userId: store.getState().user.currentUser.userId,
                  },
                });
              }
              fromLogIn = true;
            },
          })}
        ></Stack.Screen>
        <Stack.Screen
          name="SignUp"
          listeners={() => ({ focus: () => (fromSignIn = true) })}
          component={SignUp}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>

        <Stack.Screen
          name="TodoList"
          component={ToDoList}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Trash"
          component={Trash}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="InputModel"
          component={InputModel}
          options={{
            headerShown: false,
            animation: "flip",
          }}
        />
        <Stack.Screen
          name="EditModel"
          component={EditModel}
          options={{
            headerShown: false,
            animation: "flip",
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            animation: "flip",
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
