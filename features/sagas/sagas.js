import { fork, takeEvery, all } from "redux-saga/effects";
import { GET_USERS, APP_STATE, GET_TODO, APP_CLOSING } from "../actions";
import getUsers from "./handlers/users";
import { setTodos, getTodos, settingTodos } from "./handlers/todos";

function* getUser() {
  yield takeEvery(GET_USERS, getUsers);
}

function* settingData() {
  yield takeEvery(APP_STATE, settingTodos);
}

function* setData() {
  yield takeEvery(APP_CLOSING, setTodos);
}

function* getTodo() {
  yield takeEvery(GET_TODO, getTodos);
}

const appSaga = [
  fork(getUser),
  fork(settingData),
  fork(getTodo),
  fork(setData),
];
function* rootSaga() {
  yield all([...appSaga]);
}

export default rootSaga;
