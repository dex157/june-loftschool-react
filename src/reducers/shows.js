import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  getShowRequest,
  getSuccessShowRequest,
  getFailureShowRequest
} from '../actions/show.js';

const isFetching = handleActions(
  {
    [getShowRequest.toString()]: () => true,
    [getSuccessShowRequest.toString()]: () => false,
    [getFailureShowRequest.toString()]: () => false
  },
  false
);

const result = handleActions(
  {
    [getSuccessShowRequest.toString()]: (_state, action) => action.payload
  },
  false
);

const error = handleActions(
  {
    [getFailureShowRequest.toString()]: (_state, action) => action.payload
  },
  false
);

export default combineReducers({
  isFetching,
  result,
  error
});
