import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../components/login/Login';
import store from '../redux/configure_store';

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>,
  );
});

test('Should match Login component snapshoot', async () => {
  const container = await waitFor(() => screen.getByText('signup'));
  expect(container).toMatchSnapshot();
});
