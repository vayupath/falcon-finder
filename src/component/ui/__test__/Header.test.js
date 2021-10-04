import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

describe('Test Header component', () => {
  it('Header should contain find Falcon', async () => {
    render(<Header></Header>, { wrapper: BrowserRouter });
    const headerText = await screen.findByRole('banner');
    expect(headerText).toHaveTextContent('Falcon Finder');
  });

  it('Header should contain find Reset Link', () => {
    render(<Header></Header>, { wrapper: BrowserRouter });
    const headerText = screen.getByRole('link', { name: 'Reset' });
    fireEvent.click(headerText);
    expect(headerText).toBeInTheDocument();
  });

  it('Header should contain find Reset Link', () => {
    render(<Header></Header>, { wrapper: BrowserRouter });
    const headerText = screen.getByText('Geek Trust');
    expect(headerText).toBeInTheDocument();
  });
});
