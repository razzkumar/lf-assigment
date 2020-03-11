import { HEADER_INFO } from '../actions/constants';

export default function(state = {}, action) {
  switch (action.type) {
    case HEADER_INFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
