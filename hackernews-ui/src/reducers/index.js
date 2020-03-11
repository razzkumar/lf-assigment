import { combineReducers } from 'redux';

import storyReducer from './story';
import headerDataReducer from './headerInfo';
import topStoriesIdsReducer from './TopStoriesIds';
import topStoriesListReducer from './topStoriesList';

const rootReducer = combineReducers({
  story: storyReducer,
  headerData: headerDataReducer,
  topStoriesIds: topStoriesIdsReducer,
  topStoriesList: topStoriesListReducer,
});

export default rootReducer;
