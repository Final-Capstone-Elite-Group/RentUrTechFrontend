/* eslint-disable react/jsx-props-no-spreading */
import { useRef, useState } from 'react';
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
import { initEquipment } from '../../redux/equipment/equipment';

import style from './reserve.module.scss';

const Reserve = () => {
  const equipments = useSelector((state) => state.equipment.equipments);
  const citiesRef = useRef([
    'Toronto',
    'Montreal',
    'Vancouver',
    'Ottawa',
    'Winnipeg',
    'Alberta',
    'Manitoba',
  ]);
  const [bgImg, setbgImg] = useState(logo);
  const [duration, setDuration] = useState();
  const [cost, setCost] = useState(0);
  const [datesReserved, setDatesReserved] = useState([]);
  const dispatch = useDispatch();

  const {
    control, handleSubmit, formState: { errors },
  } = useForm();

  const fetchReservations = async () => apiClient.get('/equipments')
    .then((response) => (response.data))
    .then((res) => {
      toastify('Equipment updated successfully', 'success');
      return res.data.map((equipment) => equipment.attributes);
    })
    .catch((err) => {
      toastify(err.message, 'error');
    });

  const {
    isLoading,
  } = useQuery('reservations_list', fetchReservations, {
    enabled: true,
    retry: 2,
    onSuccess: (res) => {
      dispatch(initEquipment(res));
    },
  });

  const onSubmit = async (data) => (
    apiClient.post('/reservations', {
      equipment_id: data.equipment_id.value,
      city: data.city.value,
      total: cost,
      reserved_date: data.reserved_date,
    }).then((res) => {
      toastify('Reservation created successfully', 'success');
      return res.data;
    })
      .catch((err) => {
        toastify(err.response.data.errors, 'error');
      })
  );

  const customStyles = {
    option: (provided, { isSelected }) => {
      const backgroundColor = isSelected ? '#98bf0e' : '#646464';
      return {
        ...provided,
        backgroundColor,
      };
    },
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <section style={{ backgroundImage: `url(${bgImg})` }} className={style.reserve_section}>
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
          {/* %i[total reserved_date city equipment_id] */}
          <Controller
            name="equipment_id"
            control={control}
            rules={{ required: { value: true, message: 'Please input equipment' } }}
            render={({ field }) => (
              <Select
                onChange={(select) => {
                  setbgImg(select.image.url);
                  setCost(select.duration * select.rent_fee);
                  setDuration(select.duration);
                  setDatesReserved(select.dates_reserved);
                  return field.onChange({ label: select.label, value: select.value });
                }}
                styles={customStyles}
                className={style.city}
                placeholder="Select Tech"
                options={equipments.map((item) => ({
                  label: item.title,
                  value: item.id,
                  image: item.image,
                  duration: item.duration,
                  dates_reserved: item.dates_reserved,
                  rent_fee: item.rent_fee,
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
                  excludeDateIntervals={datesReserved.map((date) => {
                    const utc = date.split('-');
                    const current = new Date(Date.UTC(utc[0], utc[1] - 1, utc[2]));
                    return { start: current, end: addDays(current, duration) };
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
            {duration}
          </div>
          <div className={style.cost}>
            Total Cost:
            {' '}
            {cost}
            {' '}
            $
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reserve;
