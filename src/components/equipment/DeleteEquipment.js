import React from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import style from './delete_equipment.module.scss';

const DeleteEquipment = () => {
  const { equipments } = useSelector((state) => state.equipment);
  const columns = [
    {
      name: 'id',
      selector: (row) => row.id,
    },
    {
      name: 'Title',
      selector: (row) => row.title,
    },
    {
      name: 'Action',
      cell: () => <button type="button" className={style['btn-delete']}>Delete</button>,
    },
  ];
  console.log(equipments);
  return (
    <div className={style.wrapper}>
      <DataTable columns={columns} data={equipments} fixedHeader pagination />
    </div>
  );
};

export default DeleteEquipment;
