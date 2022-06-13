import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import logo from '../../images/logo1.svg';
import ReservationsForm from './ReservationForm';
import { equipmentsQuery } from '../../logic/queries';
import style from './reserve.module.scss';

const ReserveParams = () => {
  const { id } = useParams();
  const { equipments } = useSelector((state) => state.equipment);
  const currentTech = equipments?.filter((tech) => tech.id.toString() === id)[0];
  const citiesRef = useRef([
    'Toronto',
    'Montreal',
    'Vancouver',
    'Ottawa',
    'Winnipeg',
    'Alberta',
    'Manitoba',
  ]);

  const { isLoading } = equipmentsQuery();

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <section
      style={{ backgroundImage: `url(${currentTech?.image?.url ? currentTech.image.url : logo})` }}
      className={style.reserve_section}
    >
      <div className={style.reserve_container}>
        <div className={style.search_container}>
          <FaSearch />
        </div>
        <div className={style.reserve_content}>
          <h1>Book your Tech. Choose, Use, & Recirculate! </h1>
          <p>
            Get the tech you want whenever you need it. Simply, flexibly, sustainably. The first
            month of rent is paid at checkout, then we’ll bill you monthly on the anniversary of
            when you received your product.
          </p>
        </div>
        <ReservationsForm
          equipments={equipments}
          cities={citiesRef.current}
          currentTech={currentTech}
          paramsBool
        />
        <div className={style.expenses}>
          <div className={style.cost}>
            Duration (days) :
            {' '}
            {currentTech?.duration || '0'}
          </div>
          <div className={style.cost}>
            Total Cost:
            {' '}
            {currentTech?.duration * currentTech?.rent_fee || '0'}
            {' '}
            $
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReserveParams;
