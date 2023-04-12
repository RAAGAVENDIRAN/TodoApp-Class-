import { setData, getTodo } from "../request/todos";
import { call, put } from "redux-saga/effects";
import { REMOVE_DETAILS, SET_TODO } from "../../actions";

export function* setTodos(action) {
  yield call(setData, action.payload);
  console.log("Calling Remove");
  yield put({ type: REMOVE_DETAILS });
}

export function* settingTodos(action) {
  yield call(setData, action.payload);
}

export function* getTodos(action) {
  // console.log(a)
  const value = yield call(getTodo, action.payload);

  yield put({
    type: SET_TODO,
    payload: value
      ? value.userId
      : {
          completedTodo: {},
          pendingTodo: {},
          trashTodo: {},
        },
  });
}
