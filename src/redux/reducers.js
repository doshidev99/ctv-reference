import {
  combineReducers,
} from 'redux';
import {
  connectRouter,
} from 'connected-react-router';
import {
  staff,
} from './staff/reducer';
import {
  property,
} from './property/reducer';
import {
  transaction,
} from './transaction/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    staff,
    property,
    transaction,
  });
