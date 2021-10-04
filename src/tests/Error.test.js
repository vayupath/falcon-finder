import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import { server } from '../mocks/server';
import store from '../store';

const getJourneyCombo = (v) => {
  return within(v).getByRole('combobox');
};

const getVehicle = (container, matchText) => {
  const vehicle = within(container).getByLabelText(matchText);
  return vehicle;
};

describe('Chck API erorrs', () => {
  test('Find Falcon API Error', async () => {
    screen.debug();
    server.use(
      rest.post('https://findfalcone.herokuapp.com/find', (req, res, ctx) =>
        res(ctx.status(500))
      )
      //   rest.post('https://findfalcone.herokuapp.com/token', (req, res, ctx) => {
      //     return res(ctx.json({ token: 'XelBZzNVinqLmwdnGNnQFDNPPkPiVWyI' }));
      //   }),
      //   rest.get(
      //     'https://findfalcone.herokuapp.com/vehicles',
      //     (req, res, ctx) => {
      //       return res(
      //         ctx.json([
      //           { name: 'Space pod', total_no: 2, max_distance: 200, speed: 2 },
      //           {
      //             name: 'Space rocket',
      //             total_no: 1,
      //             max_distance: 300,
      //             speed: 4,
      //           },
      //           {
      //             name: 'Space shuttle',
      //             total_no: 1,
      //             max_distance: 400,
      //             speed: 5,
      //           },
      //           { name: 'Space ship', total_no: 2, max_distance: 600, speed: 10 },
      //         ])
      //       );
      //     }
      //   ),

      //   rest.get('https://findfalcone.herokuapp.com/planets', (req, res, ctx) => {
      //     return res(
      //       ctx.json([
      //         { name: 'Donlon', distance: 100 },
      //         { name: 'Enchai', distance: 200 },
      //         { name: 'Jebing', distance: 300 },
      //         { name: 'Sapir', distance: 400 },
      //         { name: 'Lerbin', distance: 500 },
      //         { name: 'Pingasor', distance: 600 },
      //       ])
      //     );
      //   })
    );
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

    const apierror = await screen.findByRole('heading', {
      name: 'API Fetch Error',
    });
    expect(apierror).toBeInTheDocument();
  });

  test('Error on getVechicle', async () => {
    server.use(
      rest.get(
        'https://findfalcone.herokuapp.com/vehicles',
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );

    //comment again
    const apierror = await screen.findByRole('heading', {
      name: 'API Fetch Error',
    });
    expect(apierror).toBeInTheDocument();
  });

  test('Error on get planet', async () => {
    server.use(
      rest.get('https://findfalcone.herokuapp.com/planets', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );

    const apierror = await screen.findByRole('heading', {
      name: 'API Fetch Error',
    });
    expect(apierror).toBeInTheDocument();
  });
});
