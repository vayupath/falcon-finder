import React, { Component } from 'react';
import RadioButton from '../../../component/ui/RadioButton';
import JourneyBuilder from '../../../model/JourneyBuilder';
import * as ACTION_TYPE from '../../../store/action/ActionType';

class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.onVehicleSelectHandler = this.onVehicleSelectHandler.bind(this);
  }

  onVehicleSelectHandler = (newVehicle) => {
    const journeyObj = new JourneyBuilder();

    journeyObj
      .setJourneyId(this.props.journeyId)
      .setNewVehicle(newVehicle)
      .setNewPlanet(this.props.selectedPlanet)
      .setOldVehicle(this.props.selectedVehicle)
      .setOldPlanet(null)
      .setIsVehicleValid(true)
      .build();

    //update the total vehicle counts for prev and current selected vehicle for journey
    if (this.props.selectedVehicle)
      this.props.callbackHandler(
        ACTION_TYPE.INCREAMENT_VEHICLE_COUNT,
        this.props.selectedVehicle
      );

    this.props.callbackHandler(
      ACTION_TYPE.DECREAMENT_VEHICLE_COUNT,
      newVehicle
    );
    this.props.callbackHandler(ACTION_TYPE.UPDATE_JOURNEY, journeyObj);
    this.props.callbackHandler(ACTION_TYPE.VALIDATE_JOURNEY);
    this.props.callbackHandler(
      ACTION_TYPE.UPDATE_TOTAL_JOURNEY_TIME_ON_VEHICLE_SELECT,
      journeyObj
    );
    this.props.callbackHandler(
      ACTION_TYPE.UPDATE_SELECTED_VEHICLE_STATE,
      newVehicle
    );
  };

  render() {
    const { selectedVehicle, selectedPlanetDistance } = this.props;
    return (
      <React.Fragment>
        {this.props.vehicles &&
          this.props.vehicles.map((vehicle, index) => {
            return (
              <RadioButton
                key={index}
                vehicle={vehicle}
                currSelectedVehicle={selectedVehicle}
                selectedPlanetDistance={selectedPlanetDistance}
                onVehicleSelect={this.onVehicleSelectHandler}
              ></RadioButton>
            );
          })}
      </React.Fragment>
    );
  }
}
export default VehicleList;
