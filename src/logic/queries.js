import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import toastify from './toastify';
import { initEquipment } from '../redux/equipment/equipment';
import { fetchEquipments, fetchReservations } from './apiRequests';
import { getReservations } from '../redux/reservation/reservation';

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
      retry: 2,
      refetchOnMount: false,
      onSuccess: (res) => {
        dispatch(getReservations(res));
      },
      onSettled: () => {
        toastify('Reservations updated successfully', 'success');
      },
    }));
};
