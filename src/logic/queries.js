import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import toastify from './toastify';
import { initEquipment } from '../redux/equipment/equipment';
import { fetchEquipments, fetchReservations } from './apiRequests';
import { getReservations } from '../redux/reservation/reservation';
import { logOut } from '../redux/user/user';

export const equipmentsQuery = () => {
  const dispatch = useDispatch();
  return (
    useQuery('equipments_list', fetchEquipments, {
      enabled: true,
      retry: 2,
      refetchOnMount: false,
      onSuccess: (res) => {
        dispatch(initEquipment(res));
      },
    }));
};

export const reservationsQuery = () => {
  const dispatch = useDispatch();
  return (
    useQuery('reservations_list', fetchReservations, {
      enabled: true,
      retry: false,
      refetchOnMount: false,
      onSuccess: (res) => {
        dispatch(getReservations(res));
      },
      onError: (res) => {
        if (res.response.status === 500) {
          toastify('Session expired, please login again', 'info');
          dispatch(logOut);
        } else {
          toastify(res.message, 'error');
        }
      },
      onSettled: () => {
        toastify('Reservations updated successfully', 'success');
      },
    }));
};
