import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import * as STYLE from '../../Style';

const RadioButton = ({
  vehicle,

  currSelectedVehicle,
  onVehicleSelect,
  selectedPlanetDistance,
}) => {
  const onChangeHandler = (event) => {
    onVehicleSelect(event.target.value);
  };

  //disble the vehicle for selection if planet distance is more than the vehicle can travel.
  const isSelectionDisabled = () => {
    return (
      (vehicle.total_no === 0 && currSelectedVehicle !== vehicle.name) ||
      selectedPlanetDistance > vehicle.max_distance
    );
  };

  const infoText = () => {
    return vehicle.total_no === 0 && currSelectedVehicle !== vehicle.name
      ? 'No vehicles left \n to select'
      : selectedPlanetDistance > vehicle.max_distance
      ? 'Vehicle max distance is less \n than Planet distance'
      : '';
  };

  const isChecked = () => currSelectedVehicle === vehicle.name;

  return (
    <div className={STYLE.flex_row_start + ' mb-3'}>
      <label className='text-xl'>
        <input
          type='radio'
          value={vehicle.name}
          checked={isChecked()}
          onChange={onChangeHandler}
          disabled={isSelectionDisabled()}
        />
        {vehicle.name}
      </label>
      <div className={STYLE.badge}>{vehicle.total_no}</div>

      <div className='tooltip'>
        {isSelectionDisabled() && (
          <BiErrorCircle className='text-3xl  align-top text-red-600 cursor-pointer '></BiErrorCircle>
        )}
        <span className='tooltipinfo'>{infoText()}</span>
      </div>
    </div>
  );
};
export default RadioButton;
