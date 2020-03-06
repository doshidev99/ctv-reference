import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth/reducer';
import { project } from './project/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    project,
  });
