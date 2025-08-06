import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';



jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders email, password input, and login button', () => {
    render(<Login />, { wrapper: MemoryRouter });

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error message for invalid credentials', () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('navigates on correct credentials', () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'demo@tracker.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'demo123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/tracker');
  });
});
