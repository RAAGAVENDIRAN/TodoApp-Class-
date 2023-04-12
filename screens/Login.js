//default Imports
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Text,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { currentUser, getUsers } from "../features/actions";

//third-Party Imports

import AsyncStorage from "@react-native-async-storage/async-storage";

//Component Imports
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Iconic from "../components/Iconic";

//constants
const data = [""];
const { width, height } = Dimensions.get("window");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      seePassword: true,
      checkValidEmail: false,
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  //Handlers

  //Clear Async Storage

  clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {}

    console.log("Done.");
  };

  //Validate Email Function
  validateEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (re.test(text) || regex.test(text) || text == "") {
      this.setState({
        ...this.state,
        email: text,
        checkValidEmail: false,
      });
    } else {
      this.setState({
        ...this.state,
        email: text,
        checkValidEmail: true,
      });
    }
  };

  //Authentication Function
  Auth = () => {
    let isValid = false;
    this.props.users.filter((item) => {
      if (item.email === this.state.email) {
        if (item.password === this.state.password) {
          isValid = true;
          this.setState({
            ...this.state,
            password: "",
            email: "",
          });

          this.props.currentUser({ currentUser: item });

          this.props.navigation.navigate({
            name: "TodoList",
          });
        }
      }
    });
    if (!isValid)
      ToastAndroid.show("Incorrect Credentials!", ToastAndroid.SHORT);
  };

  render() {
    return (
      <ScrollView style={[styles.container]}>
        <View style={{ height: height }}>
          <View style={{ flex: 0.9 }}>
            <View style={styles.topStyle}></View>

            <View style={styles.upperText}>
              <AppText
                style={{ fontFamily: "Poppins_600SemiBold", fontSize: 40 }}
              >
                Login
              </AppText>
              <AppText
                style={{ fontFamily: "Poppins_200ExtraLight", fontSize: 20 }}
              >
                Please sign in to continue.
              </AppText>
            </View>
            <View style={styles.middleText}>
              <Iconic
                name="email-outline"
                size={30}
                height={70}
                placeholder="EMAIL"
                value={this.state.email}
                onChangeText={this.validateEmail}
              />
              <View style={styles.wrongText}>
                {this.state.checkValidEmail ? (
                  <Text style={styles.textFailed}>Wrong Format Email</Text>
                ) : null}
              </View>
              <Iconic
                name="lock-outline"
                size={30}
                height={70}
                placeholder="PASSWORD"
                secureTextEntry={this.state.seePassword}
                onChangeText={(text) =>
                  this.setState({
                    ...this.state,
                    password: text,
                  })
                }
                value={this.state.password}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    seePassword: !this.state.seePassword,
                  })
                }
              />
            </View>

            <View style={styles.Last}>
              <AppButton
                style={styles.button}
                title="LOGIN"
                onPress={this.Auth}
                // onPress={this.clearAll}
                size={18}
                font="Poppins_700Bold"
                textColor="black"
              />
            </View>
          </View>
          <View style={styles.LastText}>
            <AppText style={{ fontFamily: "Poppins_400Regular" }}>
              Don't have an account?
              <AppText
                onPress={() => {
                  this.props.navigation.navigate({
                    name: "SignUp",
                  });
                }}
                style={{ color: "#B0DAFF", fontFamily: "Poppins_600SemiBold" }}
              >
                Sign up
              </AppText>
            </AppText>
          </View>
        </View>
      </ScrollView>
    );
  }
}

//mapState
const mapStateToProps = (state) => {
  return {
    users: state.user.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
    currentUser: (payload) => dispatch(currentUser(payload)),
  };
};

//Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    height: 250,
    borderBottomLeftRadius: 100, // logic goes here
    marginTop: -100, // move container
    paddingTop: 100, // move inner item down
    overflow: "hidden",
  },
  upperText: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  topStyle: {
    backgroundColor: "#B0DAFF",
    height: 150,
    borderBottomLeftRadius: 200,
  },
  middleText: {
    marginTop: 40,
    marginHorizontal: 15,
  },
  inputText: {
    margin: 10,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 300,
    fontFamily: "Poppins_400Regular",
    shadowOpacity: 0.88,
    shadowRadius: 10,
    shadowOffset: {
      height: 20,
      width: 0,
    },
    elevation: 5,
  },
  Last: {
    marginTop: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: 30,
  },
  button: {
    borderRadius: 10,
    width: "40%",
    backgroundColor: "#B0DAFF",
    borderRadius: 25,
  },
  LastText: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.1,
  },
  wrongText: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 20,
  },
  textFailed: {
    color: "red",
  },
  Wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
