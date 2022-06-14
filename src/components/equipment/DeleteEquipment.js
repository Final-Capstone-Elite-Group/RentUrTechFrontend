import React from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import style from './delete_equipment.module.scss';
import { equipmentsQuery } from '../../logic/queries';
import { destroyEquipmentFromAPI } from '../../redux/equipment/equipmentAPI';

const DeleteEquipment = () => {
  const { equipments } = useSelector((state) => state.equipment);
  const { isLoading, refetch } = equipmentsQuery();
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

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className={style.wrapper}>
      <DataTable columns={columns} data={equipments} fixedHeader pagination />
    </div>
  );
};

export default DeleteEquipment;
