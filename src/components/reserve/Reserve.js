import { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import style from './reserve.module.scss';

const Reserve = () => {
  const [city, setCity] = useState('City');
  const citiesRef = useRef(['Toronto', 'Montreal', 'Vancouver', 'Ottawa', 'Winnipeg', 'Alberta', 'Manitoba']);
  const handleCityChange = (e) => {
    setCity(e.target.value);
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
            Get the tech you want whenever you need it. Simply, flexibly, sustainably.
            The first month of rent is paid at checkout, then we’ll bill you monthly on
            the anniversary of when you received your product.
          </p>
        </div>
        <form className={style.reserve_form}>
          {/* %i[total reserved_date city equipment_id] */}
          <select className={style.city} value={city} onChange={handleCityChange}>
            {citiesRef.current.map((city) => (
              <option value={city} key={city}>{city}</option>
            ))}
          </select>
          <select className={style.city}>
            {citiesRef.current.map((city) => (
              <option value={city} key={city}>{city}</option>
            ))}
          </select>
        </form>

      </div>
    </section>
  );
};

export default Reserve;
