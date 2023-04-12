import {
  ADD_USER,
  SET_USER,
  CURRENT_USER,
  REMOVE_CURRENTUSER,
  REMOVE_USER,
} from "../actions";

const initialState = {
  users: [],
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        users: [...action.payload.user],
      };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload.user] };

    case CURRENT_USER:
      return {
        ...state,
        currentUser: { ...action.payload.currentUser },
      };

    case REMOVE_CURRENTUSER:
      return {
        ...state,
        currentUser: [],
      };

    // case REMOVE_USER:
    //   return {
    //     ...state,
    //     users: users.filter((item) => {
    //       if (item.id !== action.payload.id) return item;
    //     }),
    //   };

    default:
      return state;
  }
}
