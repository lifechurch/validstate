import { combineReducers } from 'redux';
import CoreReducer from './CoreReducer';
import AdminReducer from './AdminReducer';
import { ValidstateReducer } from '../../validstate';

export default combineReducers({
  core: CoreReducer,
  admin: AdminReducer,
  validstate: ValidstateReducer
});
