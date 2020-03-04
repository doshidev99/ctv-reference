import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth,
  });
