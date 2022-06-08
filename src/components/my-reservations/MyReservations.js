/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getReservationsFromAPI } from '../../redux/reservation/reservation';

const MyReservations = () => {
  // const reservations = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReservationsFromAPI());
  }, []);
  return (
    <div>
      Hello
      {/* {reservations.map((reserve) => <div>{reserve}</div>)} */}
    </div>
  );
};

export default MyReservations;
