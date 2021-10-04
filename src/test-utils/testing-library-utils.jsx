import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
const reduxProvider = () => {
  return <Provider store={store}></Provider>;
};
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: reduxProvider });

// re-export everything
export * from '@testing-library/react';
// override render method
export { renderWithContext as render };
