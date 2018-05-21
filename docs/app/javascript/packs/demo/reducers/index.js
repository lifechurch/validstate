import { combineReducers } from 'redux';
import CoreReducer from './CoreReducer';
import { ValidstateReducer } from '../../validstate';

export default combineReducers({
  core: CoreReducer,
  validstate: ValidstateReducer
});
