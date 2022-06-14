/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { setupServer } from 'msw/node';
import {
  waitFor, render, fireEvent, screen, cleanup, act,
} from './test-utils';
import App from '../App';
import '@testing-library/jest-dom';
import handlers from './mock/handlers';

const server = setupServer(...handlers);

jest.mock('react-select', () => ({ options = [{ label: 'tech', value: 1 }], value, onChange }) => {
  const handleChange = () => {
    onChange(1);
  };
  return (
    <select data-testid="select" value={value} onChange={handleChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

jest.mock('../logic/apiRequests', () => {
  const originalModule = jest.requireActual('../logic/apiRequests');
  // Mock the default export and named export 'createReservation'
  return {
    __esModule: true,
    ...originalModule,
    createReservation: jest.fn(() => true),
  };
});

afterEach(() => cleanup(), server.resetHandlers());

beforeAll(() => server.listen({
  onUnhandledRequest: 'error',
}));

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

let preloadedState;

beforeEach(() => {
  preloadedState = {
    auth: {
      user: {
        id: 25,
        name: 'string',
        username: 'unique string',
        email: 'test@example.com',
        role: 'admin',
      },
      token: '123',
    },
  };
});

afterAll(() => server.close());

it('App Renders Correctly and takes you to Tech page', async () => {
  const { container } = render(<App />);
  await waitFor(() => screen.getByText('Wireless Printer'));
  expect(container).toMatchSnapshot();
});

it('Clicking on reservation takes you to the reservations page', async () => {
  render(<App />, { preloadedState });
  await waitFor(() => screen.getByText('Wireless Printer'));
  fireEvent.click(screen.getByText('Reservation'));
  await waitFor(() => screen.getByText('Book Now'));
  expect(screen.getByText('Book Now')).toBeInTheDocument();
});

it('Clicking on Add Reservation without values gives error', async () => {
  render(<App />, { preloadedState });
  await waitFor(() => screen.getByText('Book Now'));
  fireEvent.click(screen.getByTestId('submitReservation'));
  await waitFor(() => screen.getByText('Please make sure you fill in all fields'));
  expect(screen.getByText('Please make sure you fill in all fields')).toBeInTheDocument();
});

it('Clicking on Add Reservation with values does not give error', async () => {
  render(<App />, { preloadedState });
  await act(async () => {
    await waitFor(() => screen.getByText('Book Now'));
    fireEvent.change(screen.getAllByTestId('select')[0], { target: { value: 0 } });
    fireEvent.change(screen.getAllByTestId('select')[1], { target: { value: 1 } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '07/08/2022' } });
    fireEvent.click(screen.getByTestId('submitReservation'));
    const error = screen.queryByText('Please make sure you fill in all fields');
    expect(error).not.toBeInTheDocument();
  });
});

it('Clicking on My Reservations takes you to the your Reservations page', async () => {
  render(<App />, { preloadedState });
  fireEvent.click(screen.getByTestId('hamburger'));
  fireEvent.click(screen.getByText('My Reservations'));
  await waitFor(() => screen.getByText('Active Reservations'));
  expect(screen.getByText('Active Reservations')).toBeInTheDocument();
});

it('Clicking on Trashcan deletes the Reservation', async () => {
  render(<App />, { preloadedState });
  await waitFor(() => screen.getByText('GPS Drone'));
  fireEvent.click(screen.getByTestId('trashcan'));
  await waitFor(() => screen.getByText('Reservations updated successfully'));
  expect(screen.getByText('Reservations updated successfully')).toBeInTheDocument();
});
