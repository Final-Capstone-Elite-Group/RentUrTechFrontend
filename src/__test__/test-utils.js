import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from '../redux/reservation/reservation';
import authReducer from '../redux/user/user';
import menuReducer from '../redux/menu/menu';
import equipmentReducer from '../redux/equipment/equipment';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 2,
    },
  },
});

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        auth: authReducer,
        reservation: reservationsReducer,
        equipment: equipmentReducer,
        menu: menuReducer,
      },
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      </BrowserRouter>
    );
  }
  Wrapper.propTypes = {
    children: PropTypes.objectOf(String).isRequired,
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
