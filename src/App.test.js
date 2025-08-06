import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders login header', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});
