// constants
const GET_RESERVATIONS = '/reservation/GET_RESERVATIONS';
const MAKE_RESERVATION = '/reservation/MAKE_RESERVATION';

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

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS: {
      return [...action.payload];
    }
    case MAKE_RESERVATION: {
      return [action.payload, ...state];
    }
    default:
      return state;
  }
};

export default reducer;
