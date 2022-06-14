import toastify from './toastify';
import apiClient from './apiClient';
import { currentEquipment, updateReservedDate, removeReservedDate } from '../redux/equipment/equipment';
import { makeReservation, removeReservation } from '../redux/reservation/reservation';

// Fetch Equipments from API
export const fetchEquipments = async () => apiClient.get('/equipments')
  .then((response) => (response.data))
  .then((res) => res.data.map((equipment) => equipment.attributes))
  .catch((err) => {
    toastify(err.message, 'error');
  });

// Fetch Reservations from API
export const fetchReservations = async () => apiClient.get('/reservations')
  .then((response) => (response.data))
  .then((res) => res.data.map((reserve) => reserve.attributes))
  .catch((err) => {
    toastify(err.message, 'error');
  });

// Delete a Reservation given the id
export const deleteReservation = (id, equipmentId, date) => async (dispatch) => (
  apiClient.delete(`/reservations/${id}`).then((res) => {
    dispatch(removeReservation(id));
    dispatch(currentEquipment(equipmentId));
    dispatch(removeReservedDate(date));
    return res.data;
  })
    .catch((err) => {
      toastify(err.message, 'error');
    })
);

// Create a Reservation giving the form data and the current equipment
export const createReservation = (data, currentTech) => async (dispatch) => (apiClient.post('/reservations', {
  equipment_id: currentTech.id,
  city: data.city.value,
  total: currentTech.duration * currentTech.rent_fee,
  reserved_date: data.reserved_date,
}).then((res) => {
  dispatch(currentEquipment(currentTech.id));
  toastify('Reservation created successfully', 'success');
  const d = data.reserved_date.getDate() - 1;
  const m = data.reserved_date.getMonth() + 1;
  const y = data.reserved_date.getFullYear();

  const dateString = `${y}-${m <= 9 ? `0${m}` : m}-${d <= 9 ? `0${d}` : d}`;
  dispatch(updateReservedDate(dateString));
  const send = {
    id: res.data.id,
    total: res.data.total,
    reserved_date: dateString,
    city: res.data.city,
    equipment: {
      id: currentTech.id,
      title: currentTech.title,
      url: currentTech.image.url,
      duration: currentTech.duration,
    },
  };
  dispatch(makeReservation(send));
  return res.data;
})
  .catch((err) => {
    toastify(err.response.data.errors, 'error');
    return false;
  })
);
