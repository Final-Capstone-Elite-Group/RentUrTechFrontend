/* eslint-disable react/jsx-props-no-spreading */
import { useRef } from 'react';
// import { useDispatch } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
// import toastify from '../../logic/toastify';
import axiosInstance from '../../logic/axios_instance';

import style from './reserve.module.scss';

const Reserve = () => {
  // const dispatch = useDispatch();

  const citiesRef = useRef([
    'Toronto',
    'Montreal',
    'Vancouver',
    'Ottawa',
    'Winnipeg',
    'Alberta',
    'Manitoba',
  ]);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      total: 23,
    },
  });

  const onSubmit = async (data) => {
    await axiosInstance.post('/reservations', {
      equipment_id: data.equipment_id.value,
      city: data.city.value,
      total: 20,
      reserved_date: data.reserved_date,
    })
      .then((response) => console.log(response.data))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <section className={style.reserve_section}>
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
                {...field}
                styles={customStyles}
                className={style.city}
                placeholder="Select Tech"
                options={[
                  { value: 1, label: 'Camera' },
                  { value: 2, label: 'Drone' },
                  { value: 3, label: 'Printer' },
                ]}
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
                  popperClassName={style.reserve_calender_popper}
                  calendarClassName={style.reserve_calender}
                  className={style.reserve_date}
                  excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
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
      </div>
    </section>
  );
};

export default Reserve;
