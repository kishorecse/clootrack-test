import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return state;
    case 'FETCH_SUCCESS':
      return { ...state, chartsList: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

function fetchChartsRequest() {
  return {
    type: 'FETCH_REQUEST',
  };
}

function fetchChartsSuccess(payload) {
  return {
    type: 'FETCH_SUCCESS',
    payload,
  };
}

function fetchChartsError() {
  return {
    type: 'FETCH_ERROR',
  };
}

function fetchChartsWithRedux() {
  return (dispatch) => {
    dispatch(fetchChartsRequest());
    return fetchCharts().then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchChartsSuccess(json));
      } else {
        dispatch(fetchChartsError());
      }
    });
  };
}

function fetchCharts() {
  const URL =
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json';
  return fetch(URL, { method: 'GET' }).then((response) =>
    Promise.all([response, response.json()])
  );
}

export { store, fetchChartsWithRedux };
