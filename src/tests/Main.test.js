import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store';
import { fireEvent, render, screen } from '../test-utils/testing-library-utils';

// const provider1 = () => {
//   return <Provider store={store}></Provider>;
// };
describe.skip('Render App', () => {
  it.only('App is rendering corectly', () => {
    //render(<App></App>, { wrapper: provider });
    // render(
    //   <Provider store={store}>
    //     <App></App>
    //   </Provider>
    // );
    render(<App></App>);
    screen.debug();
  });

  it('Check Initial ', async () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );
    //render(<App></App>);
    //screen.debug();
    const findButton = await screen.findByRole('button', {
      name: 'Find Falcon',
    });

    const journey_1 = await screen.findByRole('heading', {
      name: 'Journey_1',
    });
    const journey_0 = await screen.findByRole('heading', {
      name: 'Journey_0',
    });
    const journey_2 = await screen.findByRole('heading', {
      name: 'Journey_2',
    });

    const journey_3 = await screen.findByRole('heading', {
      name: 'Journey_3',
    });
    expect(findButton).toBeDisabled();
    expect(journey_1).toBeInTheDocument();
    expect(journey_2).toBeInTheDocument();
    expect(journey_3).toBeInTheDocument();
    expect(journey_0).toBeInTheDocument();

    const totalTime = screen.getByText(/Total time to find falcon/i);
    expect(totalTime).toHaveTextContent(0);

    const allSelect = screen.getAllByRole('combobox');
    expect(allSelect[0]).toHaveValue('Select Planet');
    fireEvent.change(allSelect[0], { target: { value: 'Sapir' } });
    fireEvent.change(allSelect[1], { target: { value: 'Enchai' } });
    //userEvent.click(within(allSelect[0]).getByText('Enchai'));
    expect(allSelect[0]).toHaveValue('Sapir');
    expect(allSelect[1]).toHaveValue('Enchai');

    var sp = screen.getByRole('radio', { name: 'Space rocket' });
    expect(sp).toBeDisabled();
    //screen.debug();
  });
});
