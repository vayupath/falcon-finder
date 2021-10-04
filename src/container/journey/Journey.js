import React, { Component } from 'react';
import Card from '../../component/ui/Card';
import PlanetDropDown from '../../component/ui/PlanetDropDown';
import JourneyBuilder from '../../model/JourneyBuilder';
import * as ACTION_TYPE from '../../store/action/ActionType';
import VehicleList from './vehiclelist/VehicleList';

class Journey extends Component {
  state = {
    selectedPlanet: null,
    selectedVehicle: null,
  };

  onPlanetSelectHandler = (planet) => {
    const journeyObj = new JourneyBuilder();

    journeyObj
      .setJourneyId(this.props.journeyId)
      .setNewVehicle(this.state.selectedVehicle)
      .setOldVehicle(null)
      .setNewPlanet(planet)
      .setOldPlanet(this.state.selectedPlanet)
      .setIsVehicleValid(true)
      .build();

    this.setState({ selectedPlanet: planet });

    // if the current selected vehicle is not eligible for the new selected planet then reset the vehicle seelction;
    if (!this.checkVehicleEligiblity(planet, this.state.selectedVehicle)) {
      journeyObj.setIsVehicleValid(false);
      this.props.callbackHandler(
        ACTION_TYPE.INCREAMENT_VEHICLE_COUNT,
        this.state.selectedVehicle
      );
      this.setState({ selectedVehicle: null });
    }

    this.viewCallBackHandler(ACTION_TYPE.MARK_PLANET_SELECTED, journeyObj);
    this.viewCallBackHandler(ACTION_TYPE.UPDATE_JOURNEY, journeyObj);
    this.viewCallBackHandler(ACTION_TYPE.VALIDATE_JOURNEY);
    this.viewCallBackHandler(
      ACTION_TYPE.UPDATE_TOTAL_JOURNEY_TIME_ON_PLANET_SELECT,
      journeyObj
    );
  };

  setSelectedVehicle = (val) => {
    this.setState({ selectedVehicle: val });
  };

  //gets the distance of the planet
  getPlanetDistance = (planet) => {
    if (planet) {
      return this.props.planets.find((item) => item.name === planet).distance;
    }
    return null;
  };

  //gets the max distance the vehicle can travel
  getVehicleMaxDistance = (vehicle) => {
    if (vehicle) {
      return this.props.vehicles.find((item) => item.name === vehicle)
        .max_distance;
    }
    return null;
  };

  //checks if the vehicles selected  can travel to the planets in terms of distance
  checkVehicleEligiblity = (planet, vehicle) => {
    if (vehicle && planet) {
      return (
        this.getPlanetDistance(planet) <= this.getVehicleMaxDistance(vehicle)
      );
    }
    return true;
  };

  viewCallBackHandler = (type, data) => {
    switch (type) {
      case ACTION_TYPE.UPDATE_SELECTED_VEHICLE_STATE:
        this.setSelectedVehicle(data);
        break;

      default:
        this.props.callbackHandler(type, data);
        break;
    }
  };

  render() {
    const { ...journeyProps } = this.props;
    const { ...journeyState } = this.state;
    const journeyChildProps = { ...journeyProps, ...journeyState };

    return (
      <div data-testid={this.props.journeyId}>
        <Card>
          <h1>{this.props.journeyId}</h1>
          <div className='mb-3'>
            <PlanetDropDown
              {...journeyChildProps}
              onPlanetSelectHandler={this.onPlanetSelectHandler}
            ></PlanetDropDown>
          </div>
          {journeyChildProps.selectedPlanet != null && (
            <div>
              <VehicleList
                {...journeyChildProps}
                selectedPlanetDistance={this.getPlanetDistance(
                  journeyChildProps.selectedPlanet
                )}
                callbackHandler={this.viewCallBackHandler}
              ></VehicleList>
            </div>
          )}
        </Card>
      </div>
    );
  }
}
export default Journey;
