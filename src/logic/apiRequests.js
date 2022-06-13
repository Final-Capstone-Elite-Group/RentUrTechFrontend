import toastify from './toastify';
import apiClient from './apiClient';

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
export const createReservation = async (data, currentTech) => (apiClient.post('/reservations', {
  equipment_id: currentTech.id,
  city: data.city.value,
  total: currentTech.duration * currentTech.rent_fee,
  reserved_date: data.reserved_date,
}).then((res) => {
  toastify('Reservation created successfully', 'success');
  return res.data;
})
  .catch((err) => {
    toastify(err.response.data.errors, 'error');
    return false;
  })
);
