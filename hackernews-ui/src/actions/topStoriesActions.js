import state from '../configureStore';
import { PER_PAGE, BASE_API_URL, TOP_STORIES } from '../helpers/constants';
import {
  FETCH_STORY,
  HEADER_INFO,
  FETCH_TOP_STORIE_IDS,
  FETCH_TOP_STORIE_LIST,
} from './constants';

export const getTopStorieList = ({ actionType, currentPage }) => {
  return async dispatch => {
    if (actionType === TOP_STORIES) {
      let { topStoriesIds, topStoriesList } = state.getState();

      if (topStoriesIds && !topStoriesIds.length) {
        let url = `${BASE_API_URL}topstories.json`;

        let res = await fetch(url);
        let data = await res.json();

        dispatch({
          type: FETCH_TOP_STORIE_IDS,
          payload: data,
        });
      }

      // IF data is already loaded don't call fetch api
      if (topStoriesList && topStoriesList[`page${currentPage}`]) {
        dispatch({
          type: FETCH_TOP_STORIE_LIST,
          payload: {
            [`page${currentPage}`]: topStoriesList[`page${currentPage}`],
          },
        });
      } else {
        topStoriesIds =
          topStoriesIds && !topStoriesIds.length
            ? state.getState().topStoriesIds
            : topStoriesIds;

        let currentIds = topStoriesIds.slice(
          (currentPage - 1) * PER_PAGE,
          currentPage * PER_PAGE,
        );
        let listOfPromise =
          currentIds &&
          currentIds.map(id => {
            return fetch(`${BASE_API_URL}item/${id}.json`).then(res =>
              res.json(),
            );
          });

        let data = await Promise.all(listOfPromise);
        dispatch({
          type: FETCH_TOP_STORIE_LIST,
          payload: {
            [`page${currentPage}`]: data,
          },
        });
      }

      dispatch({
        type: HEADER_INFO,
        payload: {
          currentPage,
          totalPage: Math.ceil(topStoriesIds.length / PER_PAGE),
        },
      });
    }
  };
};

export const getStory = storyId => {
  return async dispatch => {
    let { story } = state.getState();

    if (story && story[`story-${storyId}`]) {
      return dispatch({
        type: FETCH_STORY,
        payload: {
          [`story-${storyId}`]: story[`story-${storyId}`],
        },
      });
    } else {
      let res = await fetch(`${BASE_API_URL}item/${storyId}.json`);
      let data = await res.json();

      // Fetching all comments related to current story
      if (data && data.kids) {
        let allKidsPromise = data.kids.map(kidID =>
          fetch(`${BASE_API_URL}item/${kidID}.json`).then(res => res.json()),
        );

        let comments = await Promise.all(allKidsPromise);
        comments = comments.filter(d => d);
        let story = {
          [`story-${storyId}`]: { ...data, comments },
        };

        dispatch({
          type: FETCH_STORY,
          payload: story,
        });
      } else {
        dispatch({
          type: FETCH_STORY,
          payload: {
            [`story-${storyId}`]: { ...data },
          },
        });
      }
    }
  };
};
