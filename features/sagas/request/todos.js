import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setData(actionData) {
  try {
    const jsonValue = JSON.stringify({
      userId: {
        completedTodo: actionData.completedTodo,
        pendingTodo: actionData.pendingTodo,
        trashTodo: actionData.trashTodo,
      },
    });
    // console.log("Calling Async");
    // console.log(jsonValue);
    await AsyncStorage.setItem(`@todo ${actionData.userId}`, jsonValue);
  } catch (e) {
    console.log("Error");
  }
}

export async function getTodo(actionData) {
  try {
    const jsonValue = await AsyncStorage.getItem(`@todo ${actionData.userId}`);
    const value = JSON.parse(jsonValue);

    return value;
  } catch (e) {
    console.log(e);
  }
}
