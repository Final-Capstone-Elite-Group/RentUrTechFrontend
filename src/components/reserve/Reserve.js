/* eslint-disable react/jsx-props-no-spreading */
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useQuery } from 'react-query';
import { addDays } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import logo from '../../images/logo1.svg';
import toastify from '../../logic/toastify';
import apiClient from '../../logic/apiClient';
import { initEquipment, currentEquipment } from '../../redux/equipment/equipment';

import style from './reserve.module.scss';

const Reserve = () => {
  const dispatch = useDispatch();

  const { equipments, currentTech } = useSelector((state) => state.equipment);

  const citiesRef = useRef([
    'Toronto',
    'Montreal',
    'Vancouver',
    'Ottawa',
    'Winnipeg',
    'Alberta',
    'Manitoba',
  ]);

  // Handling tech already selected when id given in params
  // const { id } = useParams();
  // useEffect(() => {
  //   dispatch(currentEquipment(parseInt(id, 10)));
  // }, [currentTech, id]);

  // React form hook for getting values from all inputs and performing error analysis
  const {
    control, handleSubmit, formState: { errors },
  } = useForm();

  // Submit button to handle data by React form hook and send to Api.
  const onSubmit = async (data) => (
    apiClient.post('/reservations', {
      equipment_id: data.equipment_id.value,
      city: data.city.value,
      total: currentTech.duration * currentTech.rent_fee,
      reserved_date: data.reserved_date,
    }).then((res) => {
      toastify('Reservation created successfully', 'success');
      return res.data;
    })
      .catch((err) => {
        toastify(err.response.data.errors, 'error');
      })
  );

  // Make do api call until homepgae is set up
  const fetchEquipments = async () => apiClient.get('/equipments')
    .then((response) => (response.data))
    .then((res) => {
      toastify('Equipment updated successfully', 'success');
      return res.data.map((equipment) => equipment.attributes);
    })
    .catch((err) => {
      toastify(err.message, 'error');
    });

  // React Query to make Api call when page loads
  const {
    isLoading,
  } = useQuery('equipments_list', fetchEquipments, {
    enabled: true,
    retry: 2,
    onSuccess: (res) => {
      dispatch(initEquipment(res));
    },
  });

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

  // What to render when page is loading data using React query
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <section style={{ backgroundImage: `url(${currentTech?.image?.url ? currentTech.image.url : logo})` }} className={style.reserve_section}>
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
        <form className={style.reserve_form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="equipment_id"
            control={control}
            rules={{ required: { value: true, message: 'Please input equipment' } }}
            render={({ field }) => (
              <Select
                onChange={(select) => {
                  dispatch(currentEquipment(select.value));
                  return field.onChange({ label: select.label, value: select.value });
                }}
                styles={customStyles}
                className={style.city}
                // disabled={id}
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
                options={citiesRef.current.map((city) => ({ value: city, label: city }))}
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
            {(errors?.equipment_id || errors?.city || errors?.reserved_date)
         && 'Please make sure you fill in all fields'}
          </span>
        </form>
        <div className={style.expenses}>
          <div className={style.cost}>
            Duration (days) :
            {' '}
            {currentTech?.duration || '0'}
          </div>
          <div className={style.cost}>
            Total Cost:
            {' '}
            {(currentTech?.duration * currentTech?.rent_fee) || '0'}
            {' '}
            $
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reserve;
