import { SET_USER } from "../../actions";
import getFromAsync from "../request/users";
import { call, put } from "redux-saga/effects";

function* getUsers() {
  const userData = yield call(getFromAsync);
  yield put({ type: SET_USER, payload: { user: userData } });
}

export default getUsers;
