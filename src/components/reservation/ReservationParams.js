import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReservationBody from './reservation_components/ReservationBody';

const ReservationParams = () => {
  const { id } = useParams();
  const { equipments } = useSelector((state) => state.equipment);
  const currentTech = equipments?.filter((tech) => tech.id.toString() === id)[0];
  return (
    <ReservationBody equipments={equipments} currentTech={currentTech} paramsBool />
  );
};

export default ReservationParams;
