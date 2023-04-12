//Default IMports
import React, { useRef, useEffect } from "react";
import { AppState } from "react-native";
import { useDispatch } from "react-redux";
import store from "../features/store";

//ThirdParty Imorts
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Components Import
import ToDoList from "./ToDoList";
import InputModel from "../components/InputModel";
import EditModel from "../components/EditModel";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Trash from "./Trash";
import EditProfile from "./EditProfile";

//action
import { APP_STATE, APP_CLOSING } from "../features/actions";

//Stack Navigator
const Stack = createNativeStackNavigator();

//variables
let fromLogIn = true;
let fromSignIn = false;

export default function NavigatorPage() {
  //dispatcher
  const dispatch = useDispatch();

  //appState
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
              fromLogIn = false;
            },

            focus: () => {
              if (fromSignIn) {
                fromSignIn = false;
              } else if (!fromLogIn) {
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
