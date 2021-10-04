import { render, screen, within } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store';

//Comment
describe('Testing Initial Setup', () => {
  it('Renders App', async () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );
    const findButton = await screen.findByRole('button', {
      name: 'Find Falcon',
    });

    expect(findButton).toBeInTheDocument();
  });

  it('Find Falcon button should be disabled ', async () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );
    const findButton = await screen.findByRole('button', {
      name: 'Find Falcon',
    });

    expect(findButton).toBeDisabled();
  });

  it('Total Time should be 0 ', async () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );
    const TotalTime = await screen.findByText(/Total time to find falcon/);

    expect(TotalTime).toHaveTextContent(0);
  });

  it('Should have 4 Journey', async () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );
    const journies = await screen.findAllByTestId(/Journey/);
    expect(journies).toHaveLength(4);
  });

  it('All Planet dropdowns have initial value as SELECT PLANET and 6 options', async () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );
    const journies = await screen.findAllByTestId(/Journey/);
    const selectPlanet_1 = within(journies[0]).getByRole('combobox');
    const selectPlanet_1_options =
      within(selectPlanet_1).getAllByRole('option');
    expect(selectPlanet_1).toHaveValue('Select Planet');
    expect(selectPlanet_1_options).toHaveLength(6);

    const selectPlanet_2 = within(journies[1]).getByRole('combobox');
    expect(selectPlanet_2).toHaveValue('Select Planet');

    const selectPlanet_3 = within(journies[2]).getByRole('combobox');
    expect(selectPlanet_3).toHaveValue('Select Planet');

    const selectPlanet_4 = within(journies[3]).getByRole('combobox');
    expect(selectPlanet_4).toHaveValue('Select Planet');
  });
});
