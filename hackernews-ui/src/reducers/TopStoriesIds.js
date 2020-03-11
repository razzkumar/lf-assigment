import { FETCH_TOP_STORIE_IDS } from '../actions/constants';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TOP_STORIE_IDS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
