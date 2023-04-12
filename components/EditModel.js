//Default Import
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

//ThirdParty Imports
import {
  useFonts,
  Poppins_400Regular,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import Calendar from "react-native-calendars/src/calendar";
import { AntDesign } from "@expo/vector-icons";

//Components Import
import colors from "../config/colors";
import AppText from "./AppText";

//actions
import { todoEdit } from "../features/actions";

//const
const { width, height } = Dimensions.get("screen");

export default function EditModel({ navigation, route }) {
  //disptcher
  const dispatch = useDispatch();

  //selectors
  const user = useSelector((state) => state.user.currentUser);

  const { id, completed, curDate, finishDate, title } = route.params;
  const finish = new Date(finishDate.slice(0, 16));

  //states
  const [editTodo, setEditTodo] = useState(title);
  const [betweenDates, setBetweenDates] = useState({});
  const [endDate, setEndDate] = useState(
    new Date(finish.setDate(finish.getDate() + 1)).toISOString().slice(0, 10)
  );

  const current = new Date(curDate.slice(0, 16));

  const start = new Date(current.setDate(current.getDate() + 1))
    .toISOString()
    .slice(0, 10);

  useEffect(() => {
    let newBetweenDates = {};
    newBetweenDates[start] = {
      startingDay: true,
      color: "dodgerblue",
    };
    let newEnd = new Date(endDate);
    while (current.getTime() < newEnd.getTime()) {
      let newDate = new Date(current.setDate(current.getDate() + 1))
        .toISOString()
        .slice(0, 10);
      newBetweenDates[newDate] = {
        color: "dodgerblue",
      };
    }
    newBetweenDates[endDate] = {
      endingDay: true,
      color: "dodgerblue",
    };

    setBetweenDates({ ...newBetweenDates });
  }, [endDate]);

  const changeDate = (day) => {
    setEndDate(day.dateString);
  };

  const istyle = {
    backgroundColor: "#B0DAFF",
  };

  const mstyle = {
    backgroundColor: "#B0DAFF",
  };

  const Edit = (val) => {
    setEditTodo(val);
  };

  //fonts

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.calendar}>
          <Calendar
            style={styles.calendar}
            minDate={curDate}
            onDayPress={changeDate}
            markingType={"period"}
            markedDates={{
              ...betweenDates,
            }}
          />
        </View>
        <View style={styles.box}>
          <View style={styles.boxContainer}>
            <AppText style={{ fontFamily: "Poppins_300Light" }}>
              Created on: {curDate}
            </AppText>
            <View style={styles.top}>
              <AppText style={styles.textDesign}>Edit Todo</AppText>
              <AntDesign name="edit" size={30} color={colors.dark}></AntDesign>
            </View>

            <TextInput
              style={styles.inputStyle}
              placeholder="Edit Todo"
              onChangeText={Edit}
              value={editTodo}
            ></TextInput>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.buttonDesign, istyle]}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <AppText style={styles.closeText}> X </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonDesign, mstyle]}
                onPress={() => {
                  dispatch(
                    todoEdit({
                      id: id,
                      title: editTodo === "" ? title : editTodo,
                      date: new Date(endDate).toString().slice(0, 24),
                      completed: completed,
                    })
                  );
                  navigation.navigate({
                    name: "TodoList",
                  });
                }}
              >
                <AppText style={styles.crctText}>✓</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

//StyleSheet
const styles = StyleSheet.create({
  boxContainer: {
    height: height * 0.4,
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowOpacity: 0.88,
    shadowRadius: 10,
    shadowColor: "#2F89FC",
    shadowOffset: {
      height: 20,
      width: 0,
    },
    elevation: 5,
  },
  buttonDesign: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
    width: "20%",
    marginVertical: 10,
    marginHorizontal: 40,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 35,
    shadowOpacity: 0.3,
  },
  calendar: {
    elevation: 4,
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#B0DAFF",
    height: height,
    width: width,
  },
  box: {
    marginTop: 25,
    alignItems: "center",
  },
  inputStyle: {
    width: 300,
    height: 50,
    backgroundColor: "#B0DAFF",
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    letterSpacing: 1,
    borderWidth: 1,
    fontFamily: "Poppins_300Light",
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold_Italic",
  },

  textDesign: {
    color: "black",
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold_Italic",
  },

  crctText: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold_Italic",
    color: "black",
  },
});
