import React from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import style from './delete_equipment.module.scss';
import { equipmentsQuery } from '../../logic/queries';
import { destroyEquipmentFromAPI } from '../../redux/equipment/equipmentAPI';

const DeleteEquipment = () => {
  const { equipments } = useSelector((state) => state.equipment);
  const { refetch } = equipmentsQuery();
  const columns = [
    {
      name: 'id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Title',
      selector: (row) => row.title,
    },
    {
      name: 'Action',
      cell: (row) => (
        <button
          type="button"
          className={style['btn-delete']}
          onClick={((e) => {
            e.preventDefault();
            destroyEquipmentFromAPI(row.id, refetch);
          })}
        >
          Delete
        </button>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: 600,
        fontSize: '1rem',
      },
    },
  };

  return (
    <div className={style.wrapper}>
      <h1> Remove Equipment </h1>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={equipments}
        fixedHeader
        pagination
      />
    </div>
  );
};

export default DeleteEquipment;
