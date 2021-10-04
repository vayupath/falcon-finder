import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store';

const getJourneyCombo = (v) => {
  return within(v).getByRole('combobox');
};

const checkVehiclesSelection = (vehicle) => {
  expect(vehicle).not.toBeChecked();
};

const getVehicle = (container, matchText) => {
  const vehicle = within(container).getByLabelText(matchText);
  return vehicle;
};

const checkVehicleCount = (container, matchText, matchCount, isDisable) => {
  const vehicle = within(container).getByLabelText(matchText);
  const vehicleCount = within(container)
    .getByLabelText(matchText)
    .closest('div');

  expect(vehicle).toBeInTheDocument();
  isDisable ? expect(vehicle).toBeDisabled() : expect(vehicle).toBeEnabled();
  expect(vehicleCount).toHaveTextContent(matchCount);
};

describe('Testing user interaction for Falcon Finder', () => {
  it('Load Vehicles on Planet Select', async () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );
    /**
     * GETTING ALL JOURNEY
     */
    const journies = await screen.findAllByTestId(/Journey/);
    const Planet_combo_1 = getJourneyCombo(journies[0]);
    const Planet_combo_2 = getJourneyCombo(journies[1]);
    const Planet_combo_3 = getJourneyCombo(journies[2]);
    const Planet_combo_4 = getJourneyCombo(journies[3]);

    /***
     * SEELCTION FOR FIRST JOURNEY
     */
    //selects Sapir from journey 1 combo
    //fireEvent.change(Planet_combo_1, { target: { value: 'Sapir' } });
    userEvent.selectOptions(Planet_combo_1, 'Sapir');
    expect(Planet_combo_1).toHaveValue('Sapir');

    // checks the options available for journey 1
    const journey_1_options = within(journies[0]).getAllByRole('radio');
    expect(journey_1_options).toHaveLength(4);

    journey_1_options.forEach((vehicle) => {
      checkVehiclesSelection(vehicle);
    });

    expect(journey_1_options[0]).toBeDisabled();
    expect(journey_1_options[1]).toBeDisabled();

    //check each option total count & enablity

    //option = SPACE POD
    checkVehicleCount(journies[0], 'Space pod', 2, true);

    //option = SPACE ROCKET
    checkVehicleCount(journies[0], 'Space rocket', 1, true);

    //option = SPACE SHUTTLE
    checkVehicleCount(journies[0], 'Space shuttle', 1, false);

    //option = SPACE SHUTTLE
    checkVehicleCount(journies[0], 'Space ship', 2, false);

    // check tooltip for planet selection as 'SAPIR'
    const ErrorTooltip = within(journies[0]).getAllByText(
      'Vehicle max distance is less than Planet distance'
    );
    expect(ErrorTooltip).toHaveLength(2);

    /**
     * SEELCTION FOR SECOND JOURNEY
     */
    // check other journeys combo select to not have Sapir
    const selectPlanet_2_options =
      within(Planet_combo_2).getAllByRole('option');
    expect(selectPlanet_2_options).toHaveLength(5);

    // second journey should not have planet SAPIR
    const selectedOption = within(Planet_combo_2).queryByRole('option', {
      name: 'Sapir',
    });
    expect(selectedOption).not.toBeInTheDocument();

    //chosse Donlon
    userEvent.selectOptions(Planet_combo_2, 'Donlon');
    expect(Planet_combo_2).toHaveValue('Donlon');

    // checks the options available for journey 1
    const journey_2_options = within(journies[1]).getAllByRole('radio');
    expect(journey_2_options).toHaveLength(4);

    journey_2_options.forEach((vehicle) => {
      checkVehiclesSelection(vehicle);
    });

    //check each option total count & enablity

    //option = SPACE POD
    checkVehicleCount(journies[1], 'Space pod', 2, false);

    //option = SPACE ROCKET
    checkVehicleCount(journies[1], 'Space rocket', 1, false);

    //option = SPACE SHUTTLE
    checkVehicleCount(journies[1], 'Space shuttle', 1, false);

    //option = SPACE SHUTTLE
    checkVehicleCount(journies[1], 'Space ship', 2, false);

    // check tooltip for planet selection as 'SAPIR'
    const ErrorTooltip_2 = within(journies[1]).queryAllByText(
      'Vehicle max distance is less than Planet distance'
    );
    expect(ErrorTooltip_2).toHaveLength(0);

    /**
     * SEELCTION FOR THIRD JOURNEY
     */
    // check other journeys combo select to not have Sapir
    const selectPlanet_3_options =
      within(Planet_combo_3).getAllByRole('option');
    expect(selectPlanet_3_options).toHaveLength(4);

    // third journey should not have planet SAPIR , Donlon
    const optionSapir = within(Planet_combo_3).queryByRole('option', {
      name: 'Sapir',
    });
    const optionDonlon = within(Planet_combo_3).queryByRole('option', {
      name: 'Donlon',
    });
    expect(optionSapir).not.toBeInTheDocument();
    expect(optionDonlon).not.toBeInTheDocument();

    //chosse Donlon
    userEvent.selectOptions(Planet_combo_3, 'Enchai');
    expect(Planet_combo_3).toHaveValue('Enchai');

    // checks the options available for journey 1
    const journey_3_options = within(journies[2]).getAllByRole('radio');
    expect(journey_3_options).toHaveLength(4);

    journey_3_options.forEach((vehicle) => {
      checkVehiclesSelection(vehicle);
    });

    //check each option total count & enablity

    //option = SPACE POD
    checkVehicleCount(journies[2], 'Space pod', 2, false);

    //option = SPACE ROCKET
    checkVehicleCount(journies[2], 'Space rocket', 1, false);

    //option = SPACE SHUTTLE
    checkVehicleCount(journies[2], 'Space shuttle', 1, false);

    //option = SPACE SHUTTLE
    checkVehicleCount(journies[2], 'Space ship', 2, false);

    // check tooltip for planet selection as 'SAPIR'
    const ErrorTooltip_3 = within(journies[2]).queryAllByText(
      'Vehicle max distance is less than Planet distance'
    );
    expect(ErrorTooltip_3).toHaveLength(0);

    /**
     * SEELCTION FOR Fourth JOURNEY
     */
    // check other journeys combo select to not have Sapir
    const selectPlanet_4_options =
      within(Planet_combo_4).getAllByRole('option');
    expect(selectPlanet_4_options).toHaveLength(3);

    // Fourth journey should not have planet SAPIR , Donlon , Enchai
    const optionSapirP4 = within(Planet_combo_4).queryByRole('option', {
      name: 'Sapir',
    });
    const optionDonlonP4 = within(Planet_combo_4).queryByRole('option', {
      name: 'Donlon',
    });

    const optionEnchaiP4 = within(Planet_combo_4).queryByRole('option', {
      name: 'Enchai',
    });
    expect(optionSapirP4).not.toBeInTheDocument();
    expect(optionDonlonP4).not.toBeInTheDocument();
    expect(optionEnchaiP4).not.toBeInTheDocument();

    //chosse Donlon
    userEvent.selectOptions(Planet_combo_4, 'Pingasor');
    expect(Planet_combo_4).toHaveValue('Pingasor');

    // checks the options available for journey 4
    const journey_4_options = within(journies[3]).getAllByRole('radio');
    expect(journey_4_options).toHaveLength(4);

    journey_4_options.forEach((vehicle) => {
      checkVehiclesSelection(vehicle);
    });

    //check each option total count & enablity

    //option = SPACE POD
    checkVehicleCount(journies[3], 'Space pod', 2, true);

    //option = SPACE ROCKET
    checkVehicleCount(journies[3], 'Space rocket', 1, true);

    //option = SPACE SHUTTLE
    checkVehicleCount(journies[3], 'Space shuttle', 1, true);

    //option = SPACE SHUTTLE
    checkVehicleCount(journies[3], 'Space ship', 2, false);

    // check tooltip for planet selection as 'SAPIR'
    const ErrorTooltip_4 = within(journies[3]).queryAllByText(
      'Vehicle max distance is less than Planet distance'
    );
    expect(ErrorTooltip_4).toHaveLength(3);
  });

  it('Choose Vechiles and record total Timming', async () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );
    /**
     * GETTING ALL JOURNEY
     */
    const journies = await screen.findAllByTestId(/Journey/);
    const Planet_combo_1 = getJourneyCombo(journies[0]);
    const Planet_combo_2 = getJourneyCombo(journies[1]);
    const Planet_combo_3 = getJourneyCombo(journies[2]);
    const Planet_combo_4 = getJourneyCombo(journies[3]);

    userEvent.selectOptions(Planet_combo_1, 'Sapir');
    expect(Planet_combo_1).toHaveValue('Sapir');

    userEvent.selectOptions(Planet_combo_1, 'Donlon');
    expect(Planet_combo_1).toHaveValue('Donlon');

    userEvent.selectOptions(Planet_combo_1, 'Sapir');
    expect(Planet_combo_1).toHaveValue('Sapir');

    userEvent.selectOptions(Planet_combo_2, 'Donlon');
    expect(Planet_combo_2).toHaveValue('Donlon');

    userEvent.selectOptions(Planet_combo_3, 'Enchai');
    expect(Planet_combo_3).toHaveValue('Enchai');

    userEvent.selectOptions(Planet_combo_4, 'Pingasor');
    expect(Planet_combo_4).toHaveValue('Pingasor');

    /**
     * USER SEELCTS SPACE SHUTTLE FOR JOURNEY 1
     */
    expect(getVehicle(journies[0], 'Space shuttle')).not.toBeChecked();
    userEvent.click(getVehicle(journies[0], 'Space shuttle'));
    // check if selected
    expect(getVehicle(journies[0], 'Space shuttle')).toBeChecked();
    //check count after selection should descresase
    checkVehicleCount(journies[0], 'Space shuttle', 0, false);

    userEvent.click(getVehicle(journies[0], 'Space ship'));
    // check if selected
    expect(getVehicle(journies[0], 'Space ship')).toBeChecked();

    userEvent.click(getVehicle(journies[0], 'Space shuttle'));
    // check if selected
    expect(getVehicle(journies[0], 'Space shuttle')).toBeChecked();
    //check count after selection should descresase
    checkVehicleCount(journies[0], 'Space shuttle', 0, false);

    /**
     * USER SHOULD NOT SEELCT SPACE SHUTLLE FOR ANY JOURNEY NOW
     */
    //for journey 2
    checkVehicleCount(journies[1], 'Space shuttle', 0, true);
    //for journey 3
    checkVehicleCount(journies[2], 'Space shuttle', 0, true);
    //for journey 4
    checkVehicleCount(journies[3], 'Space shuttle', 0, true);

    /**
     * CHECKS ERROR OR VALIDATION MESSAGE
     */
    /**
     * CHECKS TOTAL TIME AND FIND FALCON ENABLES
     */
    //assertsFindFalconDisabled(true);
    //assertsTotalJourneyTime(80);
    expect(
      await screen.findByText(/Total time to find falcon/)
    ).toHaveTextContent(80);

    expect(
      await screen.findByRole('button', {
        name: 'Find Falcon',
      })
    ).toBeDisabled();

    /**
     * USER SEELCTS SPACE SHUTTLE FOR JOURNEY 2
     */
    expect(getVehicle(journies[1], 'Space rocket')).not.toBeChecked();
    userEvent.click(getVehicle(journies[1], 'Space rocket'));
    // check if selected
    expect(getVehicle(journies[1], 'Space rocket')).toBeChecked();
    //check count after selection should descresase
    checkVehicleCount(journies[1], 'Space rocket', 0, false);

    /**
     * USER SHOULD NOT SEELCT SPACE SHUTLLE FOR ANY JOURNEY NOW
     */
    //for journey 1
    checkVehicleCount(journies[0], 'Space rocket', 0, true);
    //for journey 3
    checkVehicleCount(journies[2], 'Space rocket', 0, true);
    //for journey 4
    checkVehicleCount(journies[3], 'Space rocket', 0, true);

    /**
     * CHECKS ERROR OR VALIDATION MESSAGE
     */
    /**
     * CHECKS TOTAL TIME
     */
    expect(
      await screen.findByText(/Total time to find falcon/)
    ).toHaveTextContent(105);

    expect(
      await screen.findByRole('button', {
        name: 'Find Falcon',
      })
    ).toBeDisabled();

    /**
     * USER SEELCTS SPACE SHUTTLE FOR JOURNEY 1
     */
    expect(getVehicle(journies[2], 'Space pod')).not.toBeChecked();
    userEvent.click(getVehicle(journies[2], 'Space pod'));
    // check if selected
    expect(getVehicle(journies[2], 'Space pod')).toBeChecked();
    //check count after selection should descresase
    checkVehicleCount(journies[2], 'Space pod', 1, false);

    /**
     * USER SHOULD NOT SEELCT SPACE POD FOR ANY JOURNEY NOW
     */
    //for journey 1
    checkVehicleCount(journies[0], 'Space pod', 1, true);
    //for journey 2
    checkVehicleCount(journies[1], 'Space pod', 1, false);
    //for journey 4
    checkVehicleCount(journies[3], 'Space pod', 1, true);

    /**
     * CHECKS ERROR OR VALIDATION MESSAGE
     */
    /**
     * CHECKS TOTAL TIME
     */
    expect(
      await screen.findByText(/Total time to find falcon/)
    ).toHaveTextContent(205);

    expect(
      await screen.findByRole('button', {
        name: 'Find Falcon',
      })
    ).toBeDisabled();

    /**
     * USER SEELCTS SPACE SHIP FOR JOURNEY 4
     */
    expect(getVehicle(journies[3], 'Space ship')).not.toBeChecked();
    userEvent.click(getVehicle(journies[3], 'Space ship'));
    // check if selected
    expect(getVehicle(journies[3], 'Space ship')).toBeChecked();
    //check count after selection should descresase
    checkVehicleCount(journies[3], 'Space ship', 1, false);

    /**
     * USER SHOULD NOT SEELCT SPACE POD FOR ANY JOURNEY NOW
     */
    //for journey 1
    checkVehicleCount(journies[0], 'Space ship', 1, false);
    //for journey 2
    checkVehicleCount(journies[1], 'Space ship', 1, false);
    //for journey 3
    checkVehicleCount(journies[2], 'Space ship', 1, false);

    /**
     * CHECKS ERROR OR VALIDATION MESSAGE
     */
    /**
     * CHECKS TOTAL TIME
     */
    expect(
      await screen.findByText(/Total time to find falcon/)
    ).toHaveTextContent(265);

    expect(
      await screen.findByRole('button', {
        name: 'Find Falcon',
      })
    ).toBeEnabled();
  });

  it('Find Falcon', async () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );
    /**
     * GETTING ALL JOURNEY
     */
    const journies = await screen.findAllByTestId(/Journey/);
    const Planet_combo_1 = getJourneyCombo(journies[0]);
    const Planet_combo_2 = getJourneyCombo(journies[1]);
    const Planet_combo_3 = getJourneyCombo(journies[2]);
    const Planet_combo_4 = getJourneyCombo(journies[3]);

    userEvent.selectOptions(Planet_combo_1, 'Sapir');
    expect(Planet_combo_1).toHaveValue('Sapir');

    userEvent.selectOptions(Planet_combo_2, 'Donlon');
    expect(Planet_combo_2).toHaveValue('Donlon');

    userEvent.selectOptions(Planet_combo_3, 'Enchai');
    expect(Planet_combo_3).toHaveValue('Enchai');

    userEvent.selectOptions(Planet_combo_4, 'Pingasor');
    expect(Planet_combo_4).toHaveValue('Pingasor');

    userEvent.click(getVehicle(journies[0], 'Space shuttle'));
    userEvent.click(getVehicle(journies[1], 'Space rocket'));
    userEvent.click(getVehicle(journies[2], 'Space pod'));
    userEvent.click(getVehicle(journies[3], 'Space ship'));
    const FindFalconBtn = screen.getByRole('button', {
      name: 'Find Falcon',
    });
    userEvent.click(FindFalconBtn);

    const planetFound = await screen.findByText(/Planet Found/i);
    expect(planetFound).toHaveTextContent('Pingasor');

    const startAgain = await screen.findByRole('button', {
      name: /start again/i,
    });
    userEvent.click(startAgain);

    const findFalcon = await screen.findByRole('button', {
      name: /find falcon/i,
    });
    expect(findFalcon).toBeInTheDocument();
  });
});
