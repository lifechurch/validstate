import {
  VALIDSTATE_INIT,
  VALIDSTATE_SUCCESS,
  VALIDSTATE_FAIL,
  VALIDSTATE_CLEAR
} from "./ValidstateConst";

const INITIAL_STATE = {
  valid: null
}

export default (state = {}, action) => {
  switch (action.type) {
    case VALIDSTATE_INIT:
      return { ...state, ...action.payload }
    case VALIDSTATE_SUCCESS:
      return { ...state, valid: true, ...action.payload };
    case VALIDSTATE_FAIL:
      return { ...state, valid: false, ...action.payload };
    case VALIDSTATE_CLEAR: 
      return { ...state, ...action.payload }; 
    default:
      return state;
  }
};