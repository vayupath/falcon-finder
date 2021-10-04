import * as Utility from '../../Utility';
import * as actionTypes from '../action/ActionType';

const initialState = {
  token: null,
  planets: null,
  vehicles: null,
  journey: null,
  totalJourneyTime: 0,
  isJourneyValid: false,
  falconeFound: '',
  error: null,
};

const setToken = (state, action) => {
  //console.log("Set Token");
  return {
    ...state,
    token: action.token,
  };
};

const setPlanets = (state, action) => {
  //console.log("Set Planets");
  return {
    ...state,
    planets: action.planets,
  };
};

const setVehicles = (state, action) => {
  //console.log("Set Vehcles");
  return {
    ...state,
    vehicles: action.vehicles,
  };
};

const validateJourney = (state, action) => {
  const journeyObj = { ...state.journey };
  const totalJouney = Object.keys(journeyObj).length;

  let journeyValid = true;
  for (let journey of Object.keys(journeyObj)) {
    if (!journeyObj[journey].planet || !journeyObj[journey].vehicle)
      journeyValid = false;
  }

  return {
    ...state,
    isJourneyValid: totalJouney == 4 && journeyValid,
  };
};

const markPlanetSelected = (state, action) => {
  let planets = [...state.planets];

  let currSelectedPlanet = Utility.findObj(
    planets,
    action.journeyObj.newPlanet
  );
  if (currSelectedPlanet) currSelectedPlanet['selected'] = true;

  let prevSelectedPlanet = Utility.findObj(
    planets,
    action.journeyObj.oldPlanet
  );
  if (prevSelectedPlanet) prevSelectedPlanet['selected'] = false;

  return {
    ...state,
    planets: [...planets],
  };
};

const increamentVehicleCount = (state, action) => {
  let vehicles = [...state.vehicles];

  let selectedVehicle = Utility.findObj(vehicles, action.vehicle);
  if (selectedVehicle) selectedVehicle.total_no = selectedVehicle.total_no + 1;

  return {
    ...state,
    vehicles: [...vehicles],
  };
};

const decreamentVehicleCount = (state, action) => {
  let vehicles = [...state.vehicles];

  let selectedVehicle = Utility.findObj(vehicles, action.vehicle);
  if (selectedVehicle) selectedVehicle.total_no = selectedVehicle.total_no - 1;

  return {
    ...state,
    vehicles: [...vehicles],
  };
};

const updateJourney = (state, action) => {
  //validateJourney(state, action);

  return {
    ...state,
    journey: {
      ...state.journey,
      [action.journeyObj.journeyId]: {
        planet: action.journeyObj.newPlanet,
        vehicle: action.journeyObj.isVehicleValid
          ? action.journeyObj.newVehicle
          : null,
      },
    },
  };
};

const getSelectedPlanetsVehiclesObj = (state, action) => {
  let obj = {};

  obj.vehicles = [...state.vehicles];
  obj.planets = [...state.planets];
  obj.totalTime = state.totalJourneyTime;

  obj.prevSelectedPlanet = Utility.findObj(
    obj.planets,
    action.journeyObj.oldPlanet
  );
  obj.currSelectedPlanet = Utility.findObj(
    obj.planets,
    action.journeyObj.newPlanet
  );
  obj.currSelectedVehicle = Utility.findObj(
    obj.vehicles,
    action.journeyObj.newVehicle
  );
  obj.prevSelectedVehicle = Utility.findObj(
    obj.vehicles,
    action.journeyObj.oldVehicle
  );

  return obj;
};

const updateJourneyTimeOnVehicleSelect = (state, action) => {
  const {
    totalTime,
    prevSelectedVehicle,
    currSelectedVehicle,
    currSelectedPlanet,
  } = getSelectedPlanetsVehiclesObj(state, action);

  let minusTime = 0,
    addTime = 0;

  if (prevSelectedVehicle)
    minusTime = currSelectedPlanet.distance / prevSelectedVehicle.speed;

  addTime = currSelectedPlanet.distance / currSelectedVehicle.speed;

  return {
    ...state,
    totalJourneyTime: totalTime - minusTime + addTime,
  };
};

const updateJourneyTimeOnPlanetSelect = (state, action) => {
  const {
    totalTime,
    prevSelectedPlanet,
    prevSelectedVehicle,
    currSelectedVehicle,
    currSelectedPlanet,
  } = getSelectedPlanetsVehiclesObj(state, action);

  let minusTime = 0,
    addTime = 0;
  if (currSelectedVehicle) {
    if (prevSelectedPlanet)
      minusTime = prevSelectedPlanet.distance / currSelectedVehicle.speed;

    if (action.journeyObj.isVehicleValid)
      addTime = currSelectedPlanet.distance / currSelectedVehicle.speed;
  }

  return {
    ...state,
    totalJourneyTime: totalTime - minusTime + addTime,
  };
};

const reset = (state, action) => {
  return {
    ...state,
    ...initialState,
  };
};

const result = (state, action) => {
  let falconeFound = '';
  if (action.result.status == 'success') {
    falconeFound = action.result.planet_name;
  } else {
    falconeFound = 'NOT_FOUND';
  }
  return {
    ...state,
    falconeFound: falconeFound,
  };
};

const createApiError = (state, action) => {
  if (!action.error) {
    return {
      ...state,
    };
  }

  return {
    ...state,
    error: {
      errorType: action.type,
      ...action.error,
    },
  };
};
const JourneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOKEN:
      return setToken(state, action);
    case actionTypes.GET_PLANET:
      return setPlanets(state, action);
    case actionTypes.GET_VEHICLE:
      return setVehicles(state, action);
    case actionTypes.RESET:
      return reset(state, action);

    case actionTypes.MARK_PLANET_SELECTED:
      return markPlanetSelected(state, action);
    case actionTypes.UPDATE_JOURNEY:
      return updateJourney(state, action);
    case actionTypes.VALIDATE_JOURNEY:
      return validateJourney(state, action);

    case actionTypes.INCREAMENT_VEHICLE_COUNT:
      return increamentVehicleCount(state, action);
    case actionTypes.DECREAMENT_VEHICLE_COUNT:
      return decreamentVehicleCount(state, action);

    case actionTypes.UPDATE_TOTAL_JOURNEY_TIME_ON_VEHICLE_SELECT:
      return updateJourneyTimeOnVehicleSelect(state, action);
    case actionTypes.UPDATE_TOTAL_JOURNEY_TIME_ON_PLANET_SELECT:
      return updateJourneyTimeOnPlanetSelect(state, action);

    case actionTypes.FALCON_FOUND:
      return result(state, action);

    case actionTypes.API_FETCH_ERROR:
      return createApiError(state, action);

    default:
      return state;
  }
};

export default JourneyReducer;
