/* eslint-disable react/jsx-props-no-spreading */
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getReservations } from '../../redux/reservation/reservation';
import apiClient from '../../logic/apiClient';
import toastify from '../../logic/toastify';
import style from './my_reservations.module.scss';

const MyReservations = () => {
  const reservations = useSelector((state) => state.reservation);
  const dispatch = useDispatch();

  const fetchReservations = async () => apiClient.get('/reservations')
    .then((response) => (response.data))
    .then((res) => {
      toastify('Reservations updated successfully', 'success');
      return res.data.map((reserve) => reserve.attributes);
    })
    .catch((err) => {
      console.log(err);
      toastify(err.message, 'error');
    });

  const {
    isLoading,
    refetch,
  } = useQuery('reservations_list', fetchReservations, {
    enabled: true,
    retry: 2,
    onSuccess: (res) => {
      dispatch(getReservations(res));
    },
  });

  const deleteReservation = async (id) => (
    apiClient.delete(`/reservations/${id}`).then((res) => {
      refetch();
      return res.data;
    })
      .catch((err) => {
        toastify(err.response.data.errors, 'error');
      })
  );

  if (isLoading) {
    return <h1>Loadingcvdvfdsssssssssssssssssdgdfg</h1>;
  }

  return (
    <section className={style.my_reservations}>
      <div className={style.my_reservations_scroll}>
        <h1>Active Reservations</h1>
        {reservations.map((reserve) => (
          <div key={reserve.id} className={style.reserve_container}>
            <div className={style.img_container}>
              <img src={reserve.equipment.url} alt="" />
            </div>
            <div className={style.desc_container}>
              <h2>{reserve.equipment.title}</h2>
              <div className={style.desc_info}>
                <h3>
                  <span>City :</span>
                  {' '}
                  {reserve.city}
                </h3>
                <h3>
                  <span>Reservation Date :</span>
                  {' '}
                  {reserve.reserved_date}
                </h3>
                <h3>
                  <span>Duration :</span>
                  {' '}
                  {reserve.equipment.duration}
                  {' '}
                  Days
                </h3>
                <h3>
                  <span>Expense :</span>
                  {' '}
                  {reserve.total}
                  $
                </h3>
              </div>
            </div>
            <FaRegTrashAlt
              className={style.trash}
              onClick={(e) => {
                e.preventDefault();
                deleteReservation(reserve.id);
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyReservations;
