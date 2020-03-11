import { FETCH_STORY } from '../actions/constants';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_STORY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
