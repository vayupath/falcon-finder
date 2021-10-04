import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import PlanetDropDown from '../../../component/ui/PlanetDropDown';

const planets = [
  { name: 'Donlon', distance: 100 },
  { name: 'Enchai', distance: 200 },
  { name: 'Jebing', distance: 300 },
  { name: 'Sapir', distance: 400 },
  { name: 'Lerbin', distance: 500 },
  { name: 'Pingasor', distance: 600 },
];

describe('Testing Planet Drop down', () => {
  it('App is rendering corectly', () => {
    render(
      <PlanetDropDown
        planets={planets}
        selectedPlanet=''
        onPlanetSelectHandler={jest.fn()}
      ></PlanetDropDown>
    );
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(6);

    expect(options[0]).toHaveValue('Donlon');
    expect(options[1]).toHaveValue('Enchai');
    expect(options[2]).toHaveValue('Jebing');
    expect(options[3]).toHaveValue('Sapir');
    expect(options[4]).toHaveValue('Lerbin');
    expect(options[5]).toHaveValue('Pingasor');
  });
});
