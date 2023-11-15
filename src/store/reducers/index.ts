/* eslint-disable-next-line padded-blocks */
import { combineReducers } from 'redux';

import auth from './auth';

const reducer = combineReducers({
  auth,
});

export default reducer;
