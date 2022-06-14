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
    reservation:
       [
         {
           id: 15,
           total: '52.0',
           reserved_date: '2022-07-26',
           city: 'Somewhere nice',
           created_at: '2022-06-09T15:07:15.493Z',
           updated_at: '2022-06-09T15:07:15.493Z',
           equipment: {
             id: 14,
             title: 'Wireless Printer',
             url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9d122d8fb7af2f04562aa6a26d728ed7d3fe8c64/drone1.jpg',
             duration: 5,
           },
         },
       ],
    equipment: {
      equipments: [
        {
          id: 14,
          title: 'Wireless Printer',
          description: "The Wireless Printer gives you all the essential features you need—easily print, scan and copy, and activate HP+: HP's smart printing system that comes with 6 months of free Instant Ink and a 2 year extended HP warranty.",
          review: 'https://www.youtube.com/watch?v=9Xk39LNg304',
          duration: 5,
          rent_fee: '821.0',
          dates_reserved: [],
          total_amount_payable: '22.0',
          created_at: '2022-06-08T19:42:08.103Z',
          updated_at: '2022-06-08T19:42:08.112Z',
          image: {
            url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2c533787f3499541cdd2bd6da005bace4749ddb7/wireless_printer.jpeg',
          },
        },
        {
          id: 13,
          title: 'Turntable',
          description: 'Whether you\'re just getting into records, rediscovering a record collection long since buried away or simply adding a turntable to complete your system, the AT-LP60X fully automatic belt-drive turntable is an excellent choice. This affordable, easy-to-use turntable plays both 33-1/3 and 45 RPM records and, with its built-in switchable phonon preamp, can be connected directly to your home stereo, powered speakers, computer and other components, whether they have a dedicated phonon input or not. An update of the popular AT-LP60, the ATLP60X features a redesigned tone arm base and head shell to improve tracking and reduce resonance. Noise is further reduced by the inclusion of an AC adapter that moves the AC/DC conVersion outside of the chassis where its impact on the signal chain is limited. Audio-Technical has been a leader in phonon cartridge design for more than 50 years, and that expertise shows in the AT-LP60X\'s Dual Magnet cartridge with replaceable stylus. The cartridge is integrated into the head shell for assured performance and ease of setup. The turntable comes with a detachable RCA output cable (3. 5 mm male to dual RCA male), 45 RPM adapter, and a removable hinged dust cover. It is available in black (AT-LP60X-BK), brown/black (AT-LP60X-BW), gunmetal/black (AT-LP60X-GM), and red/black (AT-LP60X-RD).',
          review: 'https://www.youtube.com/watch?v=Yaj1Mhj8mo4',
          duration: 6,
          rent_fee: '832.0',
          dates_reserved: [],
          total_amount_payable: '26.0',
          created_at: '2022-06-08T19:42:08.067Z',
          updated_at: '2022-06-08T19:42:08.081Z',
          image: {
            url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ee3004a8fe9fce926a806f65e4a87b9aa25c45af/turntable.jpeg',
          },
        }],
      currentTech: {
        id: 13,
        title: 'Turntable',
        description: 'Whether you\'re just getting into records, rediscovering a record collection long since buried away or simply adding a turntable to complete your system, the AT-LP60X fully automatic belt-drive turntable is an excellent choice. This affordable, easy-to-use turntable plays both 33-1/3 and 45 RPM records and, with its built-in switchable phonon preamp, can be connected directly to your home stereo, powered speakers, computer and other components, whether they have a dedicated phonon input or not. An update of the popular AT-LP60, the ATLP60X features a redesigned tone arm base and head shell to improve tracking and reduce resonance. Noise is further reduced by the inclusion of an AC adapter that moves the AC/DC conVersion outside of the chassis where its impact on the signal chain is limited. Audio-Technical has been a leader in phonon cartridge design for more than 50 years, and that expertise shows in the AT-LP60X\'s Dual Magnet cartridge with replaceable stylus. The cartridge is integrated into the head shell for assured performance and ease of setup. The turntable comes with a detachable RCA output cable (3. 5 mm male to dual RCA male), 45 RPM adapter, and a removable hinged dust cover. It is available in black (AT-LP60X-BK), brown/black (AT-LP60X-BW), gunmetal/black (AT-LP60X-GM), and red/black (AT-LP60X-RD).',
        review: 'https://www.youtube.com/watch?v=Yaj1Mhj8mo4',
        duration: 6,
        rent_fee: '832.0',
        dates_reserved: ['2022-12-12'],
        total_amount_payable: '26.0',
        created_at: '2022-06-08T19:42:08.067Z',
        updated_at: '2022-06-08T19:42:08.081Z',
        image: {
          url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBJQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ee3004a8fe9fce926a806f65e4a87b9aa25c45af/turntable.jpeg',
        },

      },
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
  await waitFor(() => screen.getByText('Wireless Printer'));
  fireEvent.click(screen.getByTestId('trashcan'));
  screen.getByText('Wireless Printer');
  await waitFor(() => expect(screen.queryByText('Wireless Printer')).not.toBeInTheDocument());
});
