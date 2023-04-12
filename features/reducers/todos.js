import {
  ADD_TODO,
  SET_TODO,
  MARK_TODO,
  MOVE_TO_TRASH,
  RESTORE_FROM_TRASH,
  DELETE_FROM_TRASH,
  CLEAR_TRASH,
  EDIT_TODO,
  SEARCH_TODO,
  REMOVE_DETAILS,
} from "../actions";

const initialState = {
  completedTodo: {},
  pendingTodo: {},
  trashTodo: {},
  isFetched: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        completedTodo: { ...action.payload.completedTodo },
        pendingTodo: { ...action.payload.pendingTodo },
        trashTodo: { ...action.payload.trashTodo },
        isFetched: true,
      };

    case ADD_TODO: {
      state.pendingTodo[action.payload.newTodo.id] = action.payload.newTodo;

      return {
        ...state,
      };
    }

    case MARK_TODO: {
      if (action.payload.todo.completed) {
        action.payload.todo.completed = false;
        delete state.completedTodo[action.payload.todo.id];
        state.pendingTodo[action.payload.todo.id] = action.payload.todo;
      } else {
        action.payload.todo.completed = true;
        delete state.pendingTodo[action.payload.todo.id];
        state.completedTodo[action.payload.todo.id] = action.payload.todo;
      }

      return {
        ...state,
      };
    }

    case MOVE_TO_TRASH: {
      if (action.payload.todo.completed) {
        delete state.completedTodo[action.payload.todo.id];

        state.trashTodo[action.payload.todo.id] = action.payload.todo;
      } else {
        delete state.pendingTodo[action.payload.todo.id];
        state.trashTodo[action.payload.todo.id] = action.payload.todo;
      }
      return {
        ...state,
      };
    }
    case RESTORE_FROM_TRASH: {
      if (action.payload.todo.completed) {
        delete state.trashTodo[action.payload.todo.id];
        state.completedTodo[action.payload.todo.id] = action.payload.todo;
      } else {
        delete state.trashTodo[action.payload.todo.id];
        state.pendingTodo[action.payload.todo.id] = action.payload.todo;
      }

      return {
        ...state,
      };
    }

    case DELETE_FROM_TRASH: {
      delete state.trashTodo[action.payload.todo.id];

      return {
        ...state,
      };
    }

    case CLEAR_TRASH: {
      console.log("clear");
      return {
        ...state,
        trashTodo: {},
      };
    }

    case EDIT_TODO: {
      if (action.payload.completed) {
        state.completedTodo[action.payload.id].title = action.payload.title;
        state.completedTodo[action.payload.id].date = action.payload.date;
      } else {
        state.pendingTodo[action.payload.id].title = action.payload.title;
        state.pendingTodo[action.payload.id].date = action.payload.date;
      }

      return {
        ...state,
      };
    }

    case REMOVE_DETAILS: {
      return {
        ...state,
        completedTodo: {},
        pendingTodo: {},
        trashTodo: {},
        isFetched: false,
      };
    }

    default:
      return state;
  }
}
