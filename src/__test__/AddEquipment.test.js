import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AddEquipment from '../components/equipment/AddEquipment';
import store from '../redux/configure_store';

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <AddEquipment />
      </BrowserRouter>
    </Provider>,
  );
});

test('Should match Login component snapshoot', async () => {
  const container = await waitFor(() => screen.getByText('Equipments'));
  expect(container).toMatchSnapshot();
});
