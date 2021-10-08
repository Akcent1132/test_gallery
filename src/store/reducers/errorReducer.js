import { ADD_NEW_ERROR, DELETE_ERROR } from '../type';

const errorState = {
  errors: [],
};

const errorReducer = (state = errorState, action) => {
  switch (action.type) {
    case DELETE_ERROR:
      return {...state,
        errors: state.errors.filter((err) => err !== action.payload),
      };
    case ADD_NEW_ERROR:
      return { ...state, errors: [...state.errors, action.payload] };
    default:
      return state;
  }
};

export default errorReducer;
