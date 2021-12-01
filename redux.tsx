import { applyMiddleware, createStore } from 'redux';
import { ChartData } from './Chart';
import thunk from 'redux-thunk';
import { shuffle } from './utils';

const reducer = (state: any = {}, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return state;
    case 'SHOW_LOADING':
      return { ...state, loading: true };
    case 'HIDE_LOADING':
      return { ...state, loading: false };
    case 'FETCH_SUCCESS':
      return { ...state, chartsList: action.payload };

    case 'RANDOM_UPDATE':
      const { chartsList } = state;

      const updateIndex = Math.floor(Math.random() * chartsList.length);
      console.log(chartsList[updateIndex]);
      const updateData: ChartData = { ...chartsList[updateIndex] };

      updateData.elements = shuffle(updateData.elements);
      chartsList[updateIndex] = updateData;

      console.log(updateData);
      return {
        ...state,
        chartsList,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

function showLoading() {
  return {
    type: 'SHOW_LOADING',
  };
}

function hideLoading() {
  return {
    type: 'HIDE_LOADING',
  };
}

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

function randomUpdateData() {
  return {
    type: 'RANDOM_UPDATE',
  };
}
function fetchChartsWithRedux() {
  return (dispatch) => {
    dispatch(fetchChartsRequest());
    dispatch(showLoading());
    return fetchCharts()
      .then(([response, json]) => {
        if (response.status === 200) {
          dispatch(fetchChartsSuccess(json));
          dispatch(hideLoading());
        } else {
          dispatch(fetchChartsError());
          dispatch(hideLoading());
        }
      })
      .catch((e) => {
        dispatch(hideLoading());
      });
  };
}

function randomDataUpdate() {
  return (dispatch) => {
    dispatch(randomUpdateData());
  };
}

function fetchCharts() {
  const URL =
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json';
  return fetch(URL, { method: 'GET' }).then((response) =>
    Promise.all([response, response.json()])
  );
}

export { store, fetchChartsWithRedux, randomDataUpdate };
