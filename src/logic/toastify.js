import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastify = (message, type) => {
  if (type === 'success') {
    toast.success(message);
  }
  if (type === 'error') {
    toast.error(message);
  }
  if (type === 'info') {
    toast.info(message);
  }
  if (type === 'warn') {
    toast.warn(message);
  }
};

export default toastify;
