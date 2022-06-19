import { usersActionsTypes } from '../actions/usersActionsTypes';

const initialState = {
  loading: false,
  list: [],
  pagination: {
    total: 0,
    current: 1,
    pageSize: 20,
  },
  selectedUser: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case usersActionsTypes.FETCH_USERS: {
      const {
        data,
        pagination,
        pagination: { pageSize },
      } = action.payload;

      return { ...state, list: data, pagination: { ...pagination, pageSize } };
    }
    case usersActionsTypes.UPDATE_USER: {
      return state;
    }
    case usersActionsTypes.SET_EDITABLE_USER: {
      const user = action.payload;
      return { ...state, selectedUser: user };
    }
    case usersActionsTypes.REMOVE_EDITABLE_USER: {
      return { ...state, selectedUser: null };
    }
    default:
      return {
        ...state,
      };
  }
};

export default usersReducer;
