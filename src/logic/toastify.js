import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastify = (message, type) => {
  if (type === 'success') {
    toast.success(message, {
      toastId: 1,
    });
  }
  if (type === 'error') {
    toast.error(message, {
      toastId: 1,
    });
  }
  if (type === 'info') {
    toast.info(message, {
      toastId: 1,
    });
  }
  if (type === 'warn') {
    toast.warn(message, {
      toastId: 1,
    });
  }
};

export default toastify;
