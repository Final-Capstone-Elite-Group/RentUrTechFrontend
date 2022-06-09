import React, { useState } from 'react';
import style from '../../sass/shared/form.module.scss';

const AddEquipment = () => {
  const [equipment, setEquipment] = useState();
  return (
    <>
      <div className={style.wrapper}>
        <form className={style['user-form']}>
          <div>
            <h1>Equipments</h1>
            <div className={style.logo} />
          </div>
          <div className={style['form-group']}>
            <span htmlFor="name">
              Username
            </span>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={style['form-group']}>
            <span htmlFor="username">
              password
            </span>
            <input type="password" id="password" name="password" required />
          </div>
          <input type="submit" value="Log in" className={style.submit} />
        </form>
      </div>
    </>
  );
};

export default AddEquipment