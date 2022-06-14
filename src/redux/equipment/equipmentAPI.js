import axios from 'axios';
import apiClient from '../../logic/apiClient';
import toastify from '../../logic/toastify';
import { initEquipment } from './equipment';

const initState = () => async (dispatch) => {
  const response = await axios.get('http://localhost:3000/equipments');
  dispatch(initEquipment(response.data.data));
};

const postEquipmentToAPI = (formData, config) => async () => {
  axios.post('http://localhost:3000/equipments', formData, config)
    .then((res) => {
      if (res.status === 201) {
        toastify('Equipment Create successfully', 'success');
      }
    })
    .catch((e) => {
      toastify(`ERROR ${e.response.data.errors}`, 'error');
    });
};

const destroyEquipmentFromAPI = async (id, callback) => {
  apiClient.delete(`/equipments/${id}`).then((res) => {
    toastify(res.data.message, 'success');
    callback();
  }).catch((e) => {
    toastify(e.error, 'error');
  });
};
export { initState, postEquipmentToAPI, destroyEquipmentFromAPI };
