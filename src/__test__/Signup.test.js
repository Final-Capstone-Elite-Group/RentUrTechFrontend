import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Signup from '../components/signup/Signup';
import store from '../redux/configure_store';

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>,
  );
});

test('Should match Login component snapshoot', async () => {
  const container = await waitFor(() => screen.getByText('login'));
  expect(container).toMatchSnapshot();
});

test('Should have a title Signup', () => {
  const loginTitle = screen.getByTestId('signup-title');
  expect(loginTitle).toBeInTheDocument();
});

test('Should have a email label', () => {
  const username = screen.getByTestId('email');
  expect(username).toBeInTheDocument();
});
