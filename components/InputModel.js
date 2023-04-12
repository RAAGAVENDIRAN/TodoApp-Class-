//default Imports
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

//Third-Party Imports
import DateTimePicker from "@react-native-community/datetimepicker";
import Calendar from "react-native-calendars/src/calendar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";
import { AntDesign } from "@expo/vector-icons";

//Components Imports
import { addTodo } from "../features/actions";
import colors from "../config/colors";
import AppText from "./AppText";

//const
const { width, height } = Dimensions.get("screen");

export default function InputModel({ navigation, route }) {
  //dispatcher
  const dispatch = useDispatch();

  //Selectors
  const completedTodo = useSelector((state) => state.todo.completedTodo);
  const pendingTodo = useSelector((state) => state.todo.pendingTodo);
  const user = useSelector((state) => state.user.currentUser);

  //datas
  const userId = user.userId;

  //var
  let completedTodoArr = [];
  let pendingTodoArr = [];

  //converting to arr
  Object.keys(completedTodo).filter((key) => {
    completedTodoArr.push(completedTodo[key.toString()]);
  });
  Object.keys(pendingTodo).filter((key) => {
    pendingTodoArr.push(pendingTodo[key.toString()]);
  });

  //states
  const [todoInput, setTodoInput] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [fDate, setfDate] = useState("");
  const [markDate, setMarkDate] = useState({});

  //handlers
  useEffect(() => {
    calendarDate();
  }, [markDate]);

  const calendarDate = () => {
    [...completedTodoArr, ...pendingTodoArr].map((item) => {
      if (item.completed == true) {
        markDate[new Date(item.date).toISOString().slice(0, 10)] = {
          marked: true,
          selectedColor: "green",
          selected: true,
        };
      } else {
        markDate[new Date(item.date).toISOString().slice(0, 10)] = {
          marked: true,
          selectedColor: "red",
          selected: true,
        };
      }
    });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(!show);
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    let newDate =
      tempDate.toString().slice(0, 16) +
      tempDate.getHours() +
      ":" +
      +tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();

    setfDate(newDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const istyle = {
    backgroundColor: "#B0DAFF",
  };

  const mstyle = {
    backgroundColor: "#B0DAFF",
  };

  const getInput = (val) => {
    setTodoInput(val);
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
          <Calendar markedDates={{ ...markDate }} />
        </View>
        <View style={styles.box}>
          <View style={styles.boxContainer}>
            <View style={styles.top}>
              <AppText style={styles.textDesign}>Todos</AppText>
              <AntDesign name="addfolder" size={30} color={colors.dark} />
            </View>
            <View style={styles.Wrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Add Todo"
                onChangeText={getInput}
                value={todoInput}
                autoFocus={true}
              />
              <AntDesign
                name="calendar"
                size={30}
                onPress={() => showMode("date")}
              />
              <AntDesign
                name="clockcircle"
                size={30}
                onPress={() => showMode("time")}
              />
            </View>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="dafault"
                onChange={onChange}
                minimumDate={new Date()}
                is24Hour={true}
              />
            )}

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
                  if (fDate != "") {
                    if (todoInput.trim() === "") return;
                    if (todoInput.length > 3) {
                      let newtodos = {
                        userid: userId,
                        id: Math.random(),
                        title: todoInput.trim(),
                        completed: false,
                        date: fDate,
                        createDate: new Date().toString().slice(0, 24),
                      };

                      dispatch(addTodo({ newTodo: newtodos }));
                      navigation.navigate({
                        name: "TodoList",
                      });
                    } else {
                      Alert.alert("OOPS!", "Todos must be over 3 chars long", [
                        { text: "Understood" },
                      ]);
                    }
                  } else {
                    Alert.alert("Please select the data ");
                  }
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

const styles = StyleSheet.create({
  boxContainer: {
    height: height * 0.4,
    width: width * 0.9,
    backgroundColor: "#FFF",
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
  box: {
    marginTop: 25,
    alignItems: "center",
  },
  calendar: {
    margin: 10,
    width: width * 0.9,
    marginTop: 30,
    elevation: 4,
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
  Wrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 35,
    shadowOpacity: 0.3,
  },
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: "#B0DAFF",
    alignItems: "center",
  },
  inputStyle: {
    width: 250,
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
