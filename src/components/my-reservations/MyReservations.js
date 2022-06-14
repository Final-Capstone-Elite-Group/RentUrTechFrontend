/* eslint-disable react/jsx-props-no-spreading */
// import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegTrashAlt } from 'react-icons/fa';
import { reservationsQuery } from '../../logic/queries';
import { deleteReservation } from '../../logic/apiRequests';
import style from './my_reservations.module.scss';

const MyReservations = () => {
  const reservations = useSelector((state) => state.reservation);
  const dispatch = useDispatch();
  const {
    isLoading,
  } = reservationsQuery();

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
              data-testid="trashcan"
              className={style.trash}
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteReservation(
                  reserve.id, reserve.equipment.id, reserve.reserved_date,
                ));
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyReservations;
