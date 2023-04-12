//Default Imports
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

//ThirdParty Imports
import { MaterialIcons } from "@expo/vector-icons";
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

//Components Import
import AppText from "./AppText";

//actions
import { deleteFromTrash, restoreFromTrash } from "../features/actions";

//const
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const LIST_ITEM_HEIGHT = 80;

function DisplayListTrash({ item }) {
  //dispatcher
  const dispatch = useDispatch();

  //selectors
  const user = useSelector((state) => state.user.currentUser);

  //datas
  const userId = user.userId;
  const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(80);
  const marginVertical = useSharedValue(5);
  const opacity = useSharedValue(1);
  const isCompleted = item.completed;

  //state
  const [callRestore, setCallRestore] = useState(false);
  const [callDelete, setCallDelete] = useState(false);

  const pan = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.value = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.value;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value * -1 > TRANSLATE_X_THRESHOLD;
      const delete_trash = translateX.value > TRANSLATE_X_THRESHOLD;

      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            console.log("Delete Called");
            runOnJS(setCallRestore)(true);
            // runOnJS(remove)(item.id, item.completed);
          }
        });
      } else {
        translateX.value = withSpring(0);
      }

      if (delete_trash) {
        translateX.value = withTiming(SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            console.log("Delete ");
            runOnJS(setCallDelete)(true);
            // runOnJS(deleteTrash)(item.id, item.completed);
          }
        });
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
      translateX.value < -TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  const rIconContainerStyleDelete = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value > TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
      marginBottom: 13,
    };
  });

  //
  useEffect(() => {
    if (callDelete) {
      dispatch(deleteFromTrash({ todo: item }));
      // callDB();
    }
  }, [callDelete]);

  //
  useEffect(() => {
    if (callRestore) {
      dispatch(restoreFromTrash({ todo: item }));
      // callDB();
    }
  }, [callRestore]);

  return (
    <>
      <TouchableWithoutFeedback>
        <GestureHandlerRootView>
          <Animated.View style={rTaskContainerStyle}>
            <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
              <MaterialIcons name={"restore"} size={70 * 0.4} color={"red"} />
            </Animated.View>
            <Animated.View
              style={[styles.iconContainerDelete, rIconContainerStyleDelete]}
            >
              <MaterialIcons name={"delete"} size={70 * 0.4} color={"red"} />
            </Animated.View>

            <PanGestureHandler
              onactivateAfterLongPress={100}
              onGestureEvent={pan}
              onEnd={() => {
                console.log(item);
              }}
            >
              <Animated.View style={[styles.container, rStyle]}>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flex: 8, paddingLeft: 15 }}>
                    <AppText
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={[
                        styles.DesignText,
                        isCompleted
                          ? { textDecorationLine: "line-through" }
                          : {},
                      ]}
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

//StyleSheet
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
    backgroundColor: "#391e7e",
    flex: 1,
    marginRight: 20,
  },
  container: {
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    borderRadius: 10,
    margin: 10,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#2F89FC",
    shadowOpacity: 0.88,
    shadowRadius: 10,
    shadowOffset: {
      height: 20,
      width: 0,
    },
    elevation: 5,
  },
  date: {
    fontFamily: "Poppins_300Light_Italic",
    fontSize: 10,
    color: "black",
    alignItems: "flex-end",
    marginRight: 20,
  },
  dateStart: {
    fontFamily: "Poppins_300Light_Italic",
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

export default DisplayListTrash;
