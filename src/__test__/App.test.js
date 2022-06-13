import React from 'react';
import { setupServer } from 'msw/node';
import {
  waitFor, render, fireEvent, screen, cleanup,
} from './test-utils';
import App from '../App';
import '@testing-library/jest-dom';
import handlers from './mock/handlers';

const server = setupServer(...handlers);

afterEach(() => cleanup(), server.resetHandlers());

beforeAll(() => server.listen({
  onUnhandledRequest: 'error',
}));

afterAll(() => server.close());

it('App Renders Correctly and takes you to Tech page', async () => {
  const { container } = render(<App />);
  await waitFor(() => screen.getByText('Wireless Printer'));
  expect(container).toMatchSnapshot();
});

it('Clicking on reserve takes you to its Login page if not logged in', async () => {
  render(<App />);
  await waitFor(() => screen.getByText('Wireless Printer'));
  fireEvent.click(screen.getByText('Wireless Printer').parentElement);
  expect(screen.getByText('details')).toBeInTheDocument();
});

it('Clicking on a tech takes you to its Login page if not logged in', async () => {
  render(<App />);
  await waitFor(() => screen.getByText('Reservation'));
  fireEvent.click(screen.getByText('Reservation'));
  expect(screen.getByText('password')).toBeInTheDocument();
});
