import { FETCH_TOP_STORIE_LIST } from '../actions/constants';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TOP_STORIE_LIST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
