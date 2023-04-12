//Default Imports
import React, { useState } from "react";
import { FlatList } from "react-native";
import store from "../features/store";

//Components Import
import DisplayList from "./DisplayList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";

export default function Listing({ navigation, completedTodoArr }) {
  const [scrollLock, setScrollLock] = useState(true);

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(
  //       "Fetch 1 sec : ",
  //       completedTodo,
  //       store.getState().todo.completedTodo
  //     );
  //     if (completedTodo !== store.getState().todo.completedTodo) {
  //       completedTodo = store.getState().todo.completedTodo;
  //       completedTodoArr = [];
  //       console.log("completedArr", completedTodoArr);
  //       // Object.keys(completedTodo).filter((key) => {
  //       //   completedTodoArr.push(completedTodo[key.toString()]);
  //       // });
  //     }
  //   }, 10000);
  // }, []);

  // useEffect(() => {
  //   console.log("useeffect", completedTodo, completedTodoRef);
  //   // console.log("useEffect Completed TODO : ", completedTodo);
  //   if (completedTodoRef.current !== completedTodo) {
  //     completedTodoArr = [];
  //     Object.keys(completedTodo).filter((key) => {
  //       completedTodoArr.push(completedTodo[key.toString()]);
  //     });
  //     completedTodoRef.current = completedTodo;
  //   }
  // }, [{ ...completedTodo }]);

  return (
    <>
      <FlatList
        scrollEnabled={scrollLock}
        data={completedTodoArr}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: "#fff" }}
        renderItem={({ item }) => (
          <DisplayList
            data={[...completedTodoArr]}
            item={item}
            scrollLock={(scrollLock) => {
              setScrollLock(scrollLock);
            }}
            navigation={navigation}
          />
        )}
      />
    </>
  );
}
