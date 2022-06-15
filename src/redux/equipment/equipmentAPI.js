import axios from 'axios';
import apiClient from '../../logic/apiClient';
import toastify from '../../logic/toastify';
import { initEquipment } from './equipment';

const initState = () => async (dispatch) => {
  const response = await axios.get('https://renturtech.herokuapp.com/equipments');
  dispatch(initEquipment(response.data.data));
};

const postEquipmentToAPI = (formData, config, callback) => async () => {
  axios.post('https://renturtech.herokuapp.com/equipments', formData, config)
    .then((res) => {
      if (res.status === 201) {
        toastify('Equipment Create successfully', 'success');
        callback();
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
