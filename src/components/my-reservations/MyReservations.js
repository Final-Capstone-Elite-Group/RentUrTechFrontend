/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservationsFromAPI } from '../../redux/reservation/reservation';

const MyReservations = () => {
  const reservations = useSelector((state) => state.reservation);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReservationsFromAPI());
  }, []);
  return (
    <div>
      Hello
      {reservations.map((reserve) => <div key={reserve.id}>{reserve.id}</div>)}
    </div>
  );
};

export default MyReservations;
