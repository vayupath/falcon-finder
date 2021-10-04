import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import APIFetchError from '../component/error/APIFetchError';
import * as config from '../Config';
import * as ACTION_TYPE from '../store/action/ActionType';
import * as ErrorType from '../store/action/ActionType';
import * as action from '../store/action/index';
import * as STYLE from '../Style';
import Journey from './journey/Journey';

class FalconFinder extends Component {
  //Redux Calls
  callbackHandler = (type, data) => {
    switch (type) {
      case ACTION_TYPE.INCREAMENT_VEHICLE_COUNT:
        //throw new Error("Something went wrong!");
        this.props.increamentVehicleCount(data);
        break;

      case ACTION_TYPE.DECREAMENT_VEHICLE_COUNT:
        this.props.decreamentVehicleCount(data);
        break;

      case ACTION_TYPE.MARK_PLANET_SELECTED:
        this.props.markPlanetSelected(data);
        break;

      case ACTION_TYPE.UPDATE_JOURNEY:
        this.props.updateJourney(data);
        break;

      case ACTION_TYPE.VALIDATE_JOURNEY:
        this.props.validateJourney(data);
        break;

      case ACTION_TYPE.UPDATE_TOTAL_JOURNEY_TIME_ON_VEHICLE_SELECT:
        this.props.updateJourneyTimeOnVehicleSelect(data);
        break;

      case ACTION_TYPE.UPDATE_TOTAL_JOURNEY_TIME_ON_PLANET_SELECT:
        this.props.updateJourneyTimeOnPlanetSelect(data);
        break;

      default:
        break;
    }
  };

  componentDidMount() {
    // loads the token planets and vehicles
    this.props.reset();
    this.props.loadToken();
    this.props.loadPlanets();
    this.props.loadVehicles();
  }

  // throws errors like API fetch error
  throwError = (type) => {
    switch (type) {
      case ErrorType.API_FETCH_ERROR:
        const { url, status, statusText, ...others } = this.props.error;
        throw new APIFetchError('API Fetch Error', url, status, statusText);

      default:
        break;
    }
  };

  render() {
    debugger;
    //destructring props
    const {
      error,
      planets,
      vehicles,
      findFalcon,
      falconeFound,
      totaljourneyTime,
      isJourneyValid,
    } = this.props;

    const isDataLoaded = planets && vehicles;

    // reditrects to result page if falcon is found
    if (falconeFound != '') {
      return <Redirect to='/falcon-result'></Redirect>;
    }

    //if there is any run time error occured
    if (error) {
      this.throwError(this.props.error.errorType);
    }

    return (
      <React.Fragment>
        <div className={STYLE.flex_col_center + ' px-4 py-4 mb-10'}>
          <div className={STYLE.flex_col_center}>
            <h1 className='font-semibold text-indigo-700 md:text-4xl text-2xl mb-3'>
              Select planets you want to search in
            </h1>
            <span> </span>
            <h1 className='text-xl text-indigo-700 md:text-3xl mb-3'>
              Total time to find falcon: {totaljourneyTime}
            </h1>
          </div>

          <div className={STYLE.flex_row_wrap_center}>
            {isDataLoaded &&
              this.props.planets.map((items, index) => {
                if (index < config.MAX_JOURNEY)
                  return (
                    <Journey
                      key={index}
                      journeyId={'Journey_' + index}
                      planets={planets}
                      vehicles={vehicles}
                      callbackHandler={this.callbackHandler}
                    ></Journey>
                  );
              })}
          </div>
          <div className={STYLE.flex_row_center}>
            <button
              type='button'
              disabled={!isJourneyValid}
              onClick={findFalcon}
              className={isJourneyValid ? STYLE.btn : STYLE.btn_disabled}
            >
              Find Falcon
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.JourneyReducer.token,
    planets: state.JourneyReducer.planets,
    vehicles: state.JourneyReducer.vehicles,
    totaljourneyTime: state.JourneyReducer.totalJourneyTime,
    isJourneyValid: state.JourneyReducer.isJourneyValid,
    falconeFound: state.JourneyReducer.falconeFound,
    error: state.JourneyReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadToken: () => dispatch(action.getToken()),
    loadPlanets: (token) => dispatch(action.getPlanets(token)),
    loadVehicles: (token) => dispatch(action.getVehicles(token)),

    //increament and decreament the vechicle count once selected for any planets
    increamentVehicleCount: (data) =>
      dispatch(action.increamentVehicleCount(data)),
    decreamentVehicleCount: (data) =>
      dispatch(action.decreamentVehicleCount(data)),

    //marks the selected planets as true so that it not appears in other dropdowns
    markPlanetSelected: (data) => dispatch(action.markPlanetSelected(data)),

    //updates the journey objects withe the selected planets and vehicles
    updateJourney: (data) => dispatch(action.updateJourney(data)),

    //validates if the user has selected all the planets and its vehicles
    validateJourney: () => dispatch(action.validateJourney()),

    //updates the total time taken by the vehicles to reach the planets
    updateJourneyTimeOnVehicleSelect: (data) =>
      dispatch(action.updateJourneyTimeOnVehicleSelect(data)),
    updateJourneyTimeOnPlanetSelect: (data) =>
      dispatch(action.updateJourneyTimeOnPlanetSelect(data)),

    //find the falcons by hititng the api
    findFalcon: () => dispatch(action.findFalcon()),

    reset: () => dispatch(action.reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FalconFinder);
