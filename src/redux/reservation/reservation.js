// constants
const GET_RESERVATIONS = '/reservation/GET_RESERVATIONS';
const MAKE_RESERVATION = '/reservation/MAKE_RESERVATION';
const REMOVE_RESERVATION = '/reservation/REMOVE_RESERVATION';

// initial state
const initialState = [];

// action creators
export const getReservations = (payload) => ({
  type: GET_RESERVATIONS,
  payload,
});

export const makeReservation = (payload) => ({
  type: MAKE_RESERVATION,
  payload,
});

export const removeReservation = (payload) => ({
  type: REMOVE_RESERVATION,
  payload,
});

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS: {
      return [...action.payload];
    }
    case MAKE_RESERVATION: {
      return [action.payload, ...state];
    }
    case REMOVE_RESERVATION: {
      const newState = state.filter((reservations) => reservations.id !== action.payload);
      return [...newState];
    }
    default:
      return state;
  }
};

export default reducer;
