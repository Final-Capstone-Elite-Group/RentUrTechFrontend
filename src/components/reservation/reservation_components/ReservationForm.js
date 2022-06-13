/* eslint-disable react/jsx-props-no-spreading */
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { addDays } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { createReservation } from '../../../logic/apiRequests';
import { currentEquipment } from '../../../redux/equipment/equipment';
import style from './reservation_form.module.scss';

const ReservationsForm = ({
  equipments, cities, currentTech, paramsBool,
}) => {
  const dispatch = useDispatch();

  // React hook form to control input fields
  const {
    control, handleSubmit, formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Submit button to handle data by React form hook and send to Api.
  const onSubmit = async (data) => {
    const status = await createReservation(data, currentTech);
    if (status) {
      navigate('/my-reservations', { replace: true });
    }
  };
  // Custom Styles for React select. (Have to do inline since depends on state of React-select )
  const customStyles = {
    option: (provided, { isSelected }) => {
      const backgroundColor = isSelected ? '#98bf0e' : '#646464';
      return {
        ...provided,
        backgroundColor,
      };
    },
  };

  return (
    <form className={style.reserve_form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="equipment_id"
        control={control}
        rules={{ required: { value: !paramsBool, message: 'Please input equipment' } }}
        render={({ field }) => (
          <Select
            {...field}
            onChange={(select) => {
              dispatch(currentEquipment(select.value));
              return field.onChange({ label: select.label, value: select.value });
            }}
            styles={customStyles}
            className={paramsBool ? style.none : style.city}
            placeholder="Select Tech"
            options={equipments.map((item) => ({
              label: item.title,
              value: item.id,
            }))}
          />
        )}
      />

      <Controller
        name="city"
        control={control}
        rules={{ required: { value: true, message: 'Please input city' } }}
        render={({ field }) => (
          <Select
            {...field}
            styles={customStyles}
            className={style.city}
            placeholder="Select City"
            options={cities.map((city) => ({ value: city, label: city }))}
          />
        )}
      />
      <div>
        <Controller
          name="reserved_date"
          rules={{ required: { value: true, message: 'Please input reservation date' } }}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              closeOnScroll
              placeholderText="Reservation Date"
              calendarClassName={style.reserve_calender}
              minDate={new Date()}
              className={style.reserve_date}
              excludeDateIntervals={currentTech?.dates_reserved.map((date) => {
                const utc = date.split('-');
                const current = new Date(Date.UTC(utc[0], utc[1] - 1, utc[2]));
                return { start: current, end: addDays(current, currentTech.duration) };
              })}
            />
          )}
        />
      </div>
      <input
        type="submit"
        value="Book Now"
        className={style.reservation_submit}
      />
      <span className={style.error_message}>
        {' '}
        {((errors?.equipment_id && !paramsBool) || errors?.city || errors?.reserved_date)
&& 'Please make sure you fill in all fields'}
      </span>
    </form>
  );
};

ReservationsForm.defaultProps = {
  currentTech: null,
};

ReservationsForm.propTypes = {
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
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
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

export default ReservationsForm;
