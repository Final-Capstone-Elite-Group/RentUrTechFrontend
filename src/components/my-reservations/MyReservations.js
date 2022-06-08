/* eslint-disable react/jsx-props-no-spreading */
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getReservations } from '../../redux/reservation/reservation';
import apiClient from '../../logic/apiClient';
import toastify from '../../logic/toastify';
import style from './my-reservations.modules.scss';

const MyReservations = () => {
  const reservations = useSelector((state) => state.reservation);
  const dispatch = useDispatch();

  const fetchReservations = async () => apiClient.get('/reservations')
    .then((response) => (response.data))
    .then((res) => {
      toastify('Reservations fetched successfully', 'success');
      return res.data;
    })
    .catch((err) => {
      toastify(err.message, 'error');
    });

  const {
    isLoading,
  } = useQuery('reservations_list', fetchReservations, {
    enabled: true,
    retry: 2,
    onSuccess: (res) => {
      console.log(res);
      dispatch(getReservations(res));
    },
  });

  if (isLoading) {
    return <h1>Loadingcvdvfdsssssssssssssssssdgdfg</h1>;
  }

  return (
    <section className={style.my_reservations}>
      {reservations.map((reserve) => <div key={reserve.id}>{reserve.id}</div>)}
    </section>
  );
};

export default MyReservations;
