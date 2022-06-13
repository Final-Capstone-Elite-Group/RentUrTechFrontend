import toastify from './toastify';
import apiClient from './apiClient';
import { updateEquipmentDates } from '../redux/equipment/equipment';

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

// Delete a Reservation
export const deleteReservation = async (id, callBack) => (
  apiClient.delete(`/reservations/${id}`).then((res) => {
    callBack();
    return res.data;
  })
    .catch((err) => {
      toastify(err.response.data.errors, 'error');
    })
);

// Create a Reservation giving the form data and the current equipment
export const createReservation = (data, currentTech) => async (dispatch) => (apiClient.post('/reservations', {
  equipment_id: currentTech.id,
  city: data.city.value,
  total: currentTech.duration * currentTech.rent_fee,
  reserved_date: data.reserved_date,
}).then((res) => {
  toastify('Reservation created successfully', 'success');
  const d = data.reserved_date.getDate() - 1;
  const m = data.reserved_date.getMonth() + 1;
  const y = data.reserved_date.getFullYear();

  const dateString = `${y}-${m <= 9 ? `0${m}` : m}-${d <= 9 ? `0${d}` : d}`;
  dispatch(updateEquipmentDates({ id: currentTech.id, dates_reserved: dateString }));
  return res.data;
})
  .catch((err) => {
    toastify(err.response.data.errors, 'error');
  })
);
