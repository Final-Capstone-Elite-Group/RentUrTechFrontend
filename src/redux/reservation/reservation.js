import axios from 'axios';
// import { useSelector } from 'react-redux';

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

// Axios Instance
// const user = useSelector((state) => state.userReducer);

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { Authorization: 'bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMiwiZXhwIjoxNjU0NzY3NTM5fQ.-wKUwhDlpvS7NWb68imOrm9xM6bey7czvGMzAoT4Iz8' },
});

// thunk action functions
export const getReservationsFromAPI = () => async (dispatch) => {
  await instance.get('/reservations')
    .then((response) => console.log(response.data))
    .then((res) => {
      console.log(res);
      dispatch(getReservations(res));
    })
    .catch((err) => {
      console.log(err);
    });
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS: {
      return [...action.payload];
    }
    default:
      return state;
  }
};

export default reducer;
