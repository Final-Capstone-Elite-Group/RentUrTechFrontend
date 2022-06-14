import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { currentEquipment } from '../../redux/equipment/equipment';

const Details = () => {
  const { currentTech } = useSelector(state => state.equipment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentEquipment(1));
    console.log(currentTech)
  }, []);

  return (
    <h1>hello</h1>
  );
}

export default Details;
