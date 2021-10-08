import { ADD_NEW_ERROR, DELETE_ERROR } from '../type';

const deleteErrorAction = (errorText) => ({ type: DELETE_ERROR, payload: errorText });


const addErrorAction = (errorText) => ({ type: ADD_NEW_ERROR, payload: errorText });

export const newErrorAction = (errorText) => (dispatch) => {
  dispatch(addErrorAction(errorText));
  setTimeout(() => {dispatch(deleteErrorAction(errorText));}, 1000);
};
