import { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { PropTypes } from 'prop-types';
import logo from '../../../images/form_logo.svg';
import ReservationsForm from './ReservationForm';
import style from './reserve.module.scss';

const ReservationBody = ({ currentTech, equipments, paramsBool }) => {
  const citiesRef = useRef([
    'Toronto',
    'Montreal',
    'Vancouver',
    'Ottawa',
    'Winnipeg',
    'Alberta',
    'Manitoba',
  ]);

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
          paramsBool={paramsBool}
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

ReservationBody.defaultProps = {
  currentTech: null,
};

ReservationBody.propTypes = {
  equipments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    review: PropTypes.string,
    dates_reserved: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number,
    rent_fee: PropTypes.string,
    total_amount_payable: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
  })).isRequired,
  currentTech: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    review: PropTypes.string,
    dates_reserved: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number,
    rent_fee: PropTypes.string,
    total_amount_payable: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  paramsBool: PropTypes.bool.isRequired,
};

export default ReservationBody;
