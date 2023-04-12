//default Imports
import React, { useState } from "react";
import { FlatList } from "react-native";

//Components Imports
import DisplayListPending from "./DisplayListPending";
import { useSelector } from "react-redux";

export default function ListingPending({ navigation, pendingTodoArr }) {
  const [scrollLock, setScrollLock] = useState(true);

  return (
    <>
      <FlatList
        data={pendingTodoArr}
        keyExtractor={(item) => item.id}
        scrollEnabled={scrollLock}
        style={{ backgroundColor: "#fff" }}
        renderItem={({ item }) => (
          <DisplayListPending
            data={pendingTodoArr}
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
