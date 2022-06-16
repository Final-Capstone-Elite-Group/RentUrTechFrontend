import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReservationBody from './reservation_components/ReservationBody';

const ReservationParams = () => {
  const { id } = useParams();
  const { equipments } = useSelector((state) => state.equipment);
  const currentTech = equipments?.filter((tech) => tech.id.toString() === id)[0];
  if (currentTech) {
    return (
      <ReservationBody equipments={equipments} currentTech={currentTech} paramsBool />
    );
  }
  return <Navigate to="/404" />;
};

export default ReservationParams;
