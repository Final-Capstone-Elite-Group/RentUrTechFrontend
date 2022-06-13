import React from 'react';
import { useSelector } from 'react-redux';
import style from './delete_equipment.module.scss';

const DeleteEquipment = () => {
  const { equipments } = useSelector((state) => state.equipment);
  return (
    <ul className={style.wrapper}>
      {equipments.map((item) => (
        <li className={style.card} key={item.id}>
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default DeleteEquipment;
