import React from 'react';

const PlanetDropDown = ({
  planets,

  selectedPlanet,
  journeyId,
  onPlanetSelectHandler,
}) => {
  const onPlanetSelect = (event) => {
    onPlanetSelectHandler(event.target.value);
  };

  return (
    <div>
      <label htmlFor={journeyId}>{journeyId}</label>
      <select value={selectedPlanet} onChange={onPlanetSelect} name={journeyId}>
        <option hidden>Select Planet</option>
        {planets.map((planet, index) => {
          if (!planet.selected || planet.name === selectedPlanet)
            return (
              <option key={index} value={planet.name}>
                {planet.name}
              </option>
            );
        })}
      </select>
    </div>
  );
};
export default PlanetDropDown;
