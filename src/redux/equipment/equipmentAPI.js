import axios from 'axios';
import { initEquipment } from './equipment';

const initState = () => async (dispatch) => {
  const response = await axios.get('http://localhost:3000/equipments');
  dispatch(initEquipment(response.data.data));
};

export default initState;
