//Default Imports
import React, { useState, useEffect } from "react";
import { RadioButton } from "react-native-paper";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

//Third-Party Imports
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

//Components Imorts
import AppText from "./AppText";
import { markTodo, moveToTrash } from "../features/actions";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LIST_ITEM_HEIGHT = 90;

function DisplayList({ item, navigation, scrollLock }) {
  //redux
  // console.log("DIplay ", item);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  //datas
  const userId = user.userId;

  //state
  const [isChecked, setChecked] = useState(item.completed ? 1 : 0);
  const [callDelete, setCallDelete] = useState(false);

  const checks = ["unchecked", "checked"];
  const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(100);
  const marginVertical = useSharedValue(5);
  const opacity = useSharedValue(1);

  const pan = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.value = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.value;
      runOnJS(scrollLock)(false);
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value * -1 > TRANSLATE_X_THRESHOLD;

      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(setCallDelete)(true);

            runOnJS(scrollLock)(true);
          }
        });
      } else {
        translateX.value = withSpring(0);
        runOnJS(scrollLock)(true);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
      // backgroundColor: "red",
      marginBottom: 13,
    };
  });

  //
  useEffect(() => {
    if (callDelete) {
      dispatch(moveToTrash({ todo: item }));
    }
  }, [callDelete]);

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate({
            name: "EditModel",
            params: {
              id: item.id,
              completed: true,
              curDate: item.createDate,
              finishDate: item.date,
              title: item.title,
            },
            merge: true,
          });
        }}
      >
        <GestureHandlerRootView>
          <Animated.View style={rTaskContainerStyle}>
            <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
              <FontAwesome5
                name={"trash-alt"}
                size={70 * 0.4}
                color={"red"}
              ></FontAwesome5>
            </Animated.View>

            <PanGestureHandler
              on
              activateAfterLongPress={100}
              onGestureEvent={pan}
            >
              <Animated.View style={[styles.container, rStyle]}>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                  }}
                >
                  <RadioButton
                    color="#2F89FC"
                    style={styles.check}
                    status={checks[isChecked]}
                    onPress={async () => {
                      setChecked(isChecked ^ 1);
                      dispatch(markTodo({ todo: item }));
                    }}
                  />

                  <View style={{ flex: 8 }}>
                    <AppText
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.DesignText}
                    >
                      {item.title}
                    </AppText>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <AppText style={styles.dateStart}>{item.createDate}</AppText>
                  <AppText style={styles.date}>{item.date}</AppText>
                </View>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  CheckBoxDesign: {
    height: 50,
    width: 40,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  check: {
    flex: 1,
    marginRight: 20,
  },
  container: {
    height: 100,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    borderRadius: 10,
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    shadowOpacity: 0.88,
    shadowRadius: 10,
    shadowColor: "#2F89FC",
    shadowOffset: {
      height: 20,
      width: 0,
    },
    elevation: 5,
  },
  date: {
    fontFamily: "Poppins_300Light",
    fontSize: 10,
    color: "black",
    alignItems: "flex-end",
    marginRight: 20,
  },
  dateStart: {
    fontFamily: "Poppins_300Light",
    fontSize: 10,
    color: "black",
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
  },
  DeleteIcon: {
    flex: 1,
    height: 50,
    width: 40,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  DesignText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Poppins_600SemiBold",
  },

  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "10%",
  },

  iconContainerDelete: {
    height: LIST_ITEM_HEIGHT,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "10%",
  },
});

export default DisplayList;
