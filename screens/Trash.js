// default imports
import React, { Component } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { connect } from "react-redux";

//third part IMports
import { MaterialIcons } from "@expo/vector-icons";

//Components Imports
import AppText from "../components/AppText";
import DisplayListTrash from "../components/DisplayListTrash";
import SearchToDo from "../components/SearchToDo";

//actions
import { clearTrash } from "../features/actions";

class Trash extends Component {
  constructor(props) {
    let tempTrash = [];
    super(props);
    Object.keys(this.props.trashTodo).filter((key) => {
      tempTrash.push(this.props.trashTodo[key.toString()]);
    });
    this.state = {
      search: "",
      searchTodoArr: tempTrash,
      trashTodo: this.props.trashTodo,
      userId: this.props.user.userId,
    };
  }

  componentDidUpdate(prevprops, prevState) {
    if (prevState.trashTodo !== this.props.trashTodo) {
      this.setState({
        trashTodo: this.props.trashTodo,
      });
    }
  }

  //Handlers
  Searching = (newtext) => {
    let tempTrash = [];
    let objSearch = Object.values(this.state.trashTodo).filter((item) => {
      let itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      let textData = newtext.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    Object.keys(objSearch).filter((key) => {
      tempTrash.push(objSearch[key.toString()]);
    });
    this.setState({
      ...this.state,
      search: newtext,
      searchTodoArr: tempTrash,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Top}>
          <View style={[styles.Headercontainer, { flexDirection: "row" }]}>
            <MaterialIcons
              name="arrow-back"
              size={30}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
            <AppText style={styles.DesignText}> TRASH</AppText>
            <MaterialIcons
              name="delete"
              style={styles.Headericon}
              size={30}
              color="black"
              onPress={() => {
                if (this.state.trashTodoArr.length > 0) {
                  Alert.alert("Are you Sure?", "Your Trash  will be deleted", [
                    {
                      text: "Confirm",
                      onPress: () => {
                        this.props.clearTrash();
                      },
                    },
                    {
                      text: "Cancel",

                      style: "cancel",
                    },
                  ]);
                } else {
                  Alert.alert("OOPS!", "EMPTY", [
                    {
                      text: "Confirm",
                    },
                    {
                      text: "Cancel",

                      style: "cancel",
                    },
                  ]);
                }
              }}
            />
          </View>

          <SearchToDo
            value={this.search}
            placeholder={"Search Here"}
            onChangeText={this.Searching}
          />
        </View>
        <FlatList
          data={this.state.searchTodoArr}
          keyExtractor={(item) => item.id}
          style={{ backgroundColor: "#fff" }}
          renderItem={({ item }) => (
            <DisplayListTrash data={this.state.searchTodoArr} item={item} />
          )}
        />
      </View>
    );
  }
}

//mapState
const mapStateToProps = (state) => {
  return {
    trashTodo: state.todo.trashTodo,
    user: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearTrash: () => dispatch(clearTrash()),
  };
};

//Stylesheet
const styles = StyleSheet.create({
  Headercontainer: {
    paddingTop: 20,
    height: 80,
    width: "100%",
  },
  Top: {
    backgroundColor: "#B0DAFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#C6CFFF",
  },

  DesignText: {
    fontSize: 25,
    width: "80%",
    color: "black",
    fontFamily: "Poppins_700Bold_Italic",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
