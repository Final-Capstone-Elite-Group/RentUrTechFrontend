import { useSelector } from 'react-redux';
import ReservationBody from './reservation_components/ReservationBody';

const Reservations = () => {
  const { equipments, currentTech } = useSelector((state) => state.equipment);

  return (
    <ReservationBody equipments={equipments} currentTech={currentTech} paramsBool={false} />
  );
};

export default Reservations;
