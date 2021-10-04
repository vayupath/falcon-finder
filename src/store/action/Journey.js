import * as actionTypes from './ActionType';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const getToken = () => {
  return async (dispatch, getState) => {
    const response = await fetch(process.env.REACT_APP_API_URL + 'token', {
      method: 'POST',
      headers: { ...headers },
    });
    if (!response.ok) {
      dispatch(createApiError(actionTypes.API_FETCH_ERROR, response));
      return;
    }
    const resData = await response.json();
    dispatch({ type: actionTypes.GET_TOKEN, token: resData.token });
  };
};

export const getPlanets = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'planets', {
        method: 'GET',
        headers: { ...headers },
      });
      if (!response.ok) {
        dispatch(createApiError(actionTypes.API_FETCH_ERROR, response));
        return;
      }
      const resData = await response.json();
      dispatch({ type: actionTypes.GET_PLANET, planets: resData });
    } catch (e) {
      dispatch(createApiError(actionTypes.API_FETCH_ERROR, e));
    }
  };
};

export const getVehicles = () => {
  return async (dispatch, getState) => {
    const response = await fetch(process.env.REACT_APP_API_URL + 'vehicles', {
      method: 'GET',
      headers: { ...headers },
    });
    debugger;
    if (!response.ok) {
      dispatch(createApiError(actionTypes.API_FETCH_ERROR, response));
      return;
    }
    const resData = await response.json();
    dispatch({ type: actionTypes.GET_VEHICLE, vehicles: resData });
  };
};

export const findFalcon = () => {
  return async (dispatch, getState) => {
    let requestBody = {};
    requestBody.token = getState().JourneyReducer.token;
    requestBody.planet_names = [];
    requestBody.vehicle_names = [];

    const journeyObj = getState().JourneyReducer.journey;
    for (let journey of Object.keys(journeyObj)) {
      requestBody.planet_names.push(journeyObj[journey].planet);
      requestBody.vehicle_names.push(journeyObj[journey].vehicle);
    }

    //console.log(requestBody)
    const response = await fetch(process.env.REACT_APP_API_URL + 'find', {
      method: 'POST',
      headers: { ...headers },
      body: JSON.stringify(requestBody),
    });
    debugger;
    if (!response.ok) {
      dispatch(createApiError(actionTypes.API_FETCH_ERROR, response));
      return;
    }
    const resData = await response.json();
    dispatch({ type: actionTypes.FALCON_FOUND, result: resData });
  };
};

export const increamentVehicleCount = (vehicleName) => {
  return { type: actionTypes.INCREAMENT_VEHICLE_COUNT, vehicle: vehicleName };
};

export const decreamentVehicleCount = (vehicleName) => {
  return { type: actionTypes.DECREAMENT_VEHICLE_COUNT, vehicle: vehicleName };
};

export const markPlanetSelected = (paramObj) => {
  return { type: actionTypes.MARK_PLANET_SELECTED, journeyObj: paramObj };
};

export const updateJourney = (paramObj) => {
  return { type: actionTypes.UPDATE_JOURNEY, journeyObj: paramObj };
};

export const updateJourneyTimeOnVehicleSelect = (paramObj) => {
  return {
    type: actionTypes.UPDATE_TOTAL_JOURNEY_TIME_ON_VEHICLE_SELECT,
    journeyObj: paramObj,
  };
};

export const updateJourneyTimeOnPlanetSelect = (paramObj) => {
  return {
    type: actionTypes.UPDATE_TOTAL_JOURNEY_TIME_ON_PLANET_SELECT,
    journeyObj: paramObj,
  };
};

export const validateJourney = () => {
  return { type: actionTypes.VALIDATE_JOURNEY };
};

export const reset = () => {
  return { type: actionTypes.RESET };
};

export const createApiError = (type, error) => {
  debugger;
  const { url, statusText, status } = error;
  return { type: type, error: { url, statusText, status } };
};
