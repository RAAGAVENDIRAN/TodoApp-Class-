//Default Import
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

//ThirdParty Imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, useTheme } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import * as ImagePicker from "expo-image-picker";

//Component Import
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import IconsProfile from "../components/IconsProfile";
import IconsGreater from "../components/IconGreater";
import { currentUser, setUser } from "../features/actions";

//
const { width, height } = Dimensions.get("screen");
const PhoneRegExp = /^[0-9]{10}$/;

//Handlers

const EditProfileSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(PhoneRegExp, "Phone Number is not Valid")
    .min(9, "Invalid PhoneNumber!")
    .max(11, "Invalid Phone Number")
    .required("Required"),
  place: Yup.string().min(1, "Too Short!").required("Required"),
});

function EditProfile({ navigation }) {
  //dispatcher
  const dispatch = useDispatch();

  //Selectors
  const currentuser = useSelector((state) => state.user.currentUser);
  const user = useSelector((state) => state.user.users);

  //Image state
  const [image, setImage] = useState(currentuser.profile);

  //Var
  const userId = user.userId;
  let date = currentuser.joinedDate;
  let joined = date.toString().slice(0, 10);

  //fonts Hook
  let [fontsLoaded, error] = useFonts({
    Poppins_600SemiBold,
  });

  //Handlers

  //Image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //theme
  const theme = useTheme();
  const themes = {
    fonts: {
      bodyLarge: {
        ...theme.fonts.bodyLarge,
        fontFamily: "Poppins_600SemiBold",
      },
    },
  };

  //Delete Profile
  const handleDelete = async () => {
    Alert.alert("Are you Sure?", "Your Account will be deleted", [
      {
        text: "Confirm",
        onPress: async () => {
          const editedUser = user.filter((item) => {
            if (currentuser.userId !== item.userId) return item;
          });

          dispatch(setUser({ user: editedUser }));

          const jsonValue = JSON.stringify({ users: [...editedUser] });
          await AsyncStorage.setItem(`@users`, jsonValue);
          ToastAndroid.show("Profile Deleted!", ToastAndroid.SHORT);

          navigation.navigate({
            name: "Login",
          });
        },
      },
      {
        text: "Cancel",

        style: "cancel",
      },
    ]);
  };

  if (fontsLoaded) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <IconsGreater
              name="chevron-left"
              style={{ backgroundColor: "white", flex: 1 }}
              onPress={() => {
                navigation.navigate({
                  name: "Profile",
                });
              }}
            />
            <View style={{ flex: 8 }}>
              <AppText style={styles.topText}>Edit Profile</AppText>
            </View>
            <View style={{ flex: 1 }} />
          </View>

          <View style={styles.middle}>
            <View>
              {image ? (
                <Image source={{ uri: image }} style={styles.circle} />
              ) : (
                <Image
                  source={require("../assets/profile.png")}
                  style={styles.circle}
                />
              )}

              <IconsProfile
                size={20}
                name="edit"
                iconType="MaterialIcons"
                style={styles.editIcon}
                onPress={pickImage}
              />
            </View>

            <View style={styles.middleInput}>
              <Formik
                initialValues={{
                  username: currentuser.username ? currentuser.username : "",
                  email: currentuser.email ? currentuser.email : "",
                  phoneNumber: currentuser.phoneNumber
                    ? currentuser.phoneNumber
                    : "",
                  place: currentuser.place ? currentuser.place : "",
                }}
                validationSchema={EditProfileSchema}
                onSubmit={async (values) => {
                  dispatch(
                    currentUser({
                      currentUser: {
                        ...currentuser,

                        username: values.username,
                        email: values.email,
                        phoneNumber: values.phoneNumber,
                        place: values.place,
                        profile: image,
                      },
                    })
                  );
                  const editarr = user.filter((item) => {
                    if (currentuser.userId === item.userId) {
                      item.username = values.username;
                      item.email = values.email;
                      item.phoneNumber = values.phoneNumber;
                      item.place = values.place;
                      item.profile = image;
                    }
                    return item;
                  });

                  dispatch(
                    setUser({
                      user: editarr,
                    })
                  );
                  const jsonValue = JSON.stringify({ users: [...editarr] });
                  await AsyncStorage.setItem(`@users`, jsonValue);
                  ToastAndroid.show("Profile Updated!", ToastAndroid.SHORT);

                  navigation.navigate({
                    name: "Profile",
                  });
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  theme,
                  errors,
                  touched,
                }) => (
                  <View>
                    <TextInput
                      label="Username"
                      style={styles.input}
                      mode="outlined"
                      theme={themes}
                      value={values.username}
                      onChangeText={handleChange("username")}
                    />
                    {errors.username && touched.username ? (
                      <AppText style={styles.error}>{errors.username}</AppText>
                    ) : null}
                    <TextInput
                      label="Email"
                      style={styles.input}
                      mode="outlined"
                      scrollEnabled={false}
                      dense={true}
                      theme={themes}
                      value={values.email}
                      onChangeText={handleChange("email")}
                    />
                    {errors.email && touched.email ? (
                      <AppText style={styles.error}>{errors.email}</AppText>
                    ) : null}
                    <TextInput
                      label="phoneNumber"
                      style={styles.input}
                      mode="outlined"
                      dense={true}
                      value={values.phoneNumber}
                      theme={themes}
                      onChangeText={handleChange("phoneNumber")}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <AppText style={styles.error}>
                        {errors.phoneNumber}
                      </AppText>
                    ) : null}
                    <TextInput
                      label="Place"
                      style={styles.input}
                      mode="outlined"
                      dense={true}
                      value={values.place}
                      theme={themes}
                      onChangeText={handleChange("place")}
                    />
                    {errors.email && touched.email ? (
                      <AppText style={styles.error}>{errors.place}</AppText>
                    ) : null}
                    <AppButton
                      title="Edit Profile"
                      color="#B0DAFF"
                      size={15}
                      dense={true}
                      font="Poppins_600SemiBold"
                      textColor="black"
                      style={styles.button}
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </View>
          <View style={styles.last}>
            <AppText style={styles.bottomText}>{`Joined ${joined}`}</AppText>
            <AppButton
              title="Delete"
              color="#B0DAFF"
              size={15}
              font="Poppins_600SemiBold"
              textColor="#FF0000"
              style={styles.bottomButton}
              onPress={handleDelete}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

//Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: height,
    width: width,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: width,
  },
  error: {
    color: "red",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
  },
  topText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    alignSelf: "center",
  },
  middle: {
    margin: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 175,
    width: 175,
    backgroundColor: "#E4DCCF",
    borderRadius: 85,
  },
  middleInput: {
    marginTop: 30,
    marginBottom: 20,
  },
  input: {
    width: 300,
    // height: 50,
    margin: 10,
    paddingVertical: 0,
    textAlignVertical: "center",
  },

  button: {
    width: width - 100,
    marginTop: 20,
    backgroundColor: "#B0DAFF",
    borderRadius: 40,
    alignSelf: "center",
  },
  last: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-around",
    marginBottom: 30,
  },
  bottomText: {
    fontFamily: "Poppins_600SemiBold",
  },
  bottomButton: {
    width: 100,
    backgroundColor: "#FF6464",
    borderRadius: 60,
    opacity: 0.8,
    alignSelf: "center",
  },
  editIcon: {
    backgroundColor: "#B0DAFF",
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 2.5,
    right: 15,
  },
});

export default EditProfile;
