/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { setupServer } from 'msw/node';
import {
  waitFor, render, screen, cleanup,
} from './test-utils';
import Navigation from '../components/navigation/Navigation';
import '@testing-library/jest-dom';
import handlers from './mock/handlers';

const server = setupServer(...handlers);

afterEach(() => cleanup(), server.resetHandlers());

beforeAll(() => server.listen({
  onUnhandledRequest: 'error',
}));

afterAll(() => server.close());

it('Navigation Renders Correctly', async () => {
  const { container } = render(<Navigation />);
  await waitFor(() => screen.getByText('Techs'));
  expect(container).toMatchSnapshot();
});

it('If user is logged out, he can see Login and SignOut buttons', async () => {
  render(<Navigation />);
  expect(screen.getByText('Techs')).toBeInTheDocument();
  expect(screen.getByText('Reservation')).toBeInTheDocument();
  expect(screen.getByText('My Reservations')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  expect(screen.queryByText('Add Techs')).not.toBeInTheDocument();
});

it('If user is logged in, you can see Techs, Reservation, My Reservations and Logout button', async () => {
  const preloadedState = {
    auth: {
      user: {
        username: 'unique string',
        role: 'user',
      },
      token: '123',
    },
  };
  render(<Navigation />, { preloadedState });
  expect(screen.getByText('Techs')).toBeInTheDocument();
  expect(screen.getByText('Reservation')).toBeInTheDocument();
  expect(screen.getByText('My Reservations')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();
  expect(screen.queryByText('Login')).not.toBeInTheDocument();
  expect(screen.queryByText('Add Techs')).not.toBeInTheDocument();
});

it('If user is admin, he can see Add tech and Remove tech links', async () => {
  const preloadedState = {
    auth: {
      user: {
        username: 'unique string',
        role: 'admin',
      },
      token: '123',
    },
  };
  render(<Navigation />, { preloadedState });
  expect(screen.getByText('Add Techs')).toBeInTheDocument();
  expect(screen.getByText('Remove Techs')).toBeInTheDocument();
});
