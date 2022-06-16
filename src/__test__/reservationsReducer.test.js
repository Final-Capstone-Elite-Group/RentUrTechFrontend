import reservationsReducer from '../redux/reservation/reservation';

let state;

describe('Testing for Get Reservation action ', () => {
  beforeEach(() => {
    state = [{
      id: 39, city: 'Toronto', equipment_id: 1,
    }];
  });

  test('when the action is getReservations, we have a new state equal to the details of the new league added from the payload', () => {
    // arrange
    const GET_RESERVATIONS = '/reservation/GET_RESERVATIONS';
    const action = { type: GET_RESERVATIONS, payload: state };

    // act
    const result = reservationsReducer([], action);
    // assert
    expect(result).toEqual(state);
  });
});

test('when the action is makeReservations, we have a new state equal to the details of the new league added from the payload', () => {
  // arrange
  const MAKE_RESERVATION = '/reservation/MAKE_RESERVATION';
  const action = { type: MAKE_RESERVATION, payload: state[0] };

  // act
  const result = reservationsReducer([{ id: 1, equipment_id: 1 }], action);
  // assert
  expect(result[0]).toEqual(state[0]);
  expect(result[1]).not.toEqual(state[0]);
});

describe('When we give wrong action ', () => {
  test('when the action is wrong, we return the same state with no changes', () => {
    // arrange
    const WRONG_ACTION = 'football-fallback/rockets/WRONG_ROCKETS';
    const action = { type: WRONG_ACTION, payload: state };

    // act
    const result = reservationsReducer([], action);
    // assert
    expect(result).toEqual([]);
  });
});
