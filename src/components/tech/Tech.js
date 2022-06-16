import { useSelector } from 'react-redux';
import Carousel from '../carousel/Carousel';
import style from './tech.module.scss';

const Tech = () => {
  const { equipments } = useSelector((state) => state.equipment);

  return (
    <section className={style.tech_section}>
      <div className={style.tech_desc}>
        <h1>Latest Techs</h1>
        <p>Please Select a device to check it&apos;s details</p>
      </div>
      <div className={style.tech_carousel}>
        {equipments && <Carousel collection={equipments} />}
      </div>
    </section>
  );
};
export default Tech;
