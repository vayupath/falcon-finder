import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import VehicleList from '../VehicleList';

const vehciles = [
  { name: 'Space pod', total_no: 2, max_distance: 200, speed: 2 },
  { name: 'Space rocket', total_no: 1, max_distance: 300, speed: 4 },
  { name: 'Space shuttle', total_no: 1, max_distance: 400, speed: 5 },
  { name: 'Space ship', total_no: 2, max_distance: 600, speed: 10 },
];

const onVehicleSelectMock = jest.fn();
const callbackHandlerMock = jest.fn();
describe('is vechile List rendering correctly', () => {
  it('show error for disbaled vehcile', () => {
    render(
      <VehicleList
        vehicles={vehciles}
        onVehicleSelect={onVehicleSelectMock}
        callbackHandler={callbackHandlerMock}
        selectedVehicle='Space ship'
        selectedPlanetDistance='400'
      ></VehicleList>
    );
  });
  it('Render Vechile List', async () => {
    render(
      <VehicleList
        vehicles={vehciles}
        onVehicleSelect={onVehicleSelectMock}
        callbackHandler={callbackHandlerMock}
        //selectedVehicle='Space ship'
        selectedPlanetDistance='400'
      ></VehicleList>
    );
    const options = screen.getAllByRole('radio');

    expect(options).toHaveLength(4);
    expect(options[0]).not.toBeChecked();
    expect(options[1]).not.toBeChecked();
    expect(options[2]).not.toBeChecked();
    //expect(options[3]).toBeChecked();

    const spacePod = screen.getByLabelText('Space pod');
    const spacePodCount = screen.getByLabelText('Space pod').closest('div');
    expect(spacePod).toBeInTheDocument();
    expect(spacePodCount).toHaveTextContent(2);

    const spaceRocket = screen.getByLabelText('Space rocket');
    const spaceRocketCount = screen
      .getByLabelText('Space rocket')
      .closest('div');
    expect(spaceRocket).toBeInTheDocument();
    expect(spaceRocketCount).toHaveTextContent(1);

    const spaceShuttle = screen.getByLabelText('Space shuttle');
    const spaceShuttleCount = screen
      .getByLabelText('Space shuttle')
      .closest('div');
    expect(spaceShuttle).toBeInTheDocument();
    expect(spaceShuttleCount).toHaveTextContent(1);

    const spaceShip = screen.getByLabelText('Space ship');
    const spaceShipCount = screen.getByLabelText('Space ship').closest('div');
    expect(spaceShip).toBeInTheDocument();
    expect(spaceShipCount).toHaveTextContent(2);

    // expect(spaceShip).not.toBeChecked();
    //
    userEvent.click(spaceShip);
    fireEvent.change(spaceShip, { target: { checked: true } });
    expect(spaceShip).toBeChecked();

    expect(callbackHandlerMock).toBeCalled();

    //screen.debug();
    const spaceShipCount2 = screen.getByLabelText('Space ship').closest('div');
    expect(spaceShipCount2).toHaveTextContent(2);
  });
});
