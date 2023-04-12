export const ADD_USER = "SIGN UP";
export const ADD_TODO = "ADD_TOD";
export const DELETE_TODO = "DELETE_TOD";
export const SET_USER = "SET_USER";
export const CURRENT_USER = "CURRENT_USER";
export const SET_TODO = "SET_TODO";
export const MARK_TODO = "MARK_TODO";
export const MOVE_TO_TRASH = "MOVE_TO_TRASH";
export const RESTORE_FROM_TRASH = "RESTORE_FROM_TRASH";
export const DELETE_FROM_TRASH = "DELETE_FROM_TRASH";
export const CLEAR_TRASH = "CLEAR_TRASH";
export const EDIT_TODO = "EDIT_TODO";
export const SEARCH_TODO = "SEARCH_TODO";
export const REMOVE_DETAILS = "REMOVE DETAILS";
export const REMOVE_CURRENTUSER = "REMOVE_CURRENTUSER";
export const REMOVE_USER = "REMOVE_USER";
export const GET_USERS = "GET_USERS";
export const APP_STATE = "APP_STATE";
export const APP_CLOSING = "APP_CLOSING";
export const GET_TODO = "GET_TODO";

export const addUser = (content) => ({
  type: ADD_USER,
  payload: content,
});

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: content,
});

export const setUser = (content) => ({
  type: SET_USER,
  payload: content,
});

export const currentUser = (content) => ({
  type: CURRENT_USER,
  payload: content,
});

export const setTodo = (content) => ({
  type: SET_TODO,
  payload: content,
});

export const markTodo = (content) => ({
  type: MARK_TODO,
  payload: content,
});

export const moveToTrash = (content) => ({
  type: MOVE_TO_TRASH,
  payload: content,
});

export const restoreFromTrash = (content) => ({
  type: RESTORE_FROM_TRASH,
  payload: content,
});

export const deleteFromTrash = (content) => ({
  type: DELETE_FROM_TRASH,
  payload: content,
});

export const clearTrash = () => ({
  type: CLEAR_TRASH,
});

export const searchTodo = (content) => ({
  type: SEARCH_TODO,
  payload: content,
});

export const todoEdit = (content) => ({
  type: EDIT_TODO,
  payload: content,
});

export const removeDetails = () => ({
  type: REMOVE_DETAILS,
});

export const removeCurrentUser = () => ({
  type: REMOVE_CURRENTUSER,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const getUsers = () => ({
  type: GET_USERS,
});

// export const appState = () => ({
//   type: APP_STATE,
// });
