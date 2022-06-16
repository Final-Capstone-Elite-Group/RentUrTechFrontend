import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadState } from '../../logic/localStorage';
import { postEquipmentToAPI } from '../../redux/equipment/equipmentAPI';
import style from '../../sass/shared/form.module.scss';
import { equipmentsQuery } from '../../logic/queries';

const AddEquipment = () => {
  const dispatch = useDispatch();
  const { refetch } = equipmentsQuery();

  const [equipment, setEquipment] = useState({
    title: '',
    description: '',
    review: '',
    duration: 0,
    rent_fee: 0.0,
    total_amount_payable: 0.0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const auth = loadState('auth');
    const img = document.querySelector('input[type="file"]');
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    formData.append('image', img.files[0]);
    formData.append('title', equipment.title);
    formData.append('description', equipment.description);
    formData.append('review', equipment.review);
    formData.append('duration', equipment.duration);
    formData.append('rent_fee', equipment.rent_fee);
    formData.append('total_amount_payable', equipment.total_amount_payable);

    dispatch(postEquipmentToAPI(formData, config, refetch));
    setEquipment({
      title: '',
      description: '',
      review: '',
      duration: 0,
      rent_fee: 0.0,
      total_amount_payable: 0.0,
    });
  };

  return (
    <>
      <div className={style.wrapper}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div>
            <h1 data-testid="equipment-title">Equipments</h1>
            <div className={style.logo} />
          </div>
          <div className={style['form-group']}>
            <span htmlFor="title">
              Title
            </span>
            <input type="text" id="title" name="title" value={equipment.title} onChange={(e) => setEquipment({ ...equipment, title: e.target.value })} placeholder="Unique title" required />
          </div>
          <div className={style['form-group']}>
            <span htmlFor="description">
              Description
            </span>
            <textarea id="description" name="description" rows={3} value={equipment.description} onChange={(e) => setEquipment({ ...equipment, description: e.target.value })} placeholder="Description" required />
          </div>
          <div className={style['form-group']}>
            <span htmlFor="review">
              Review
            </span>
            <input type="text" id="review" name="review" value={equipment.review} onChange={(e) => setEquipment({ ...equipment, review: e.target.value })} placeholder="Link to a video" required />
          </div>
          <div className={style['form-group']}>
            <span htmlFor="duration">
              Duration
            </span>
            <input type="number" id="duration" name="duration" value={equipment.duration} onChange={(e) => setEquipment({ ...equipment, duration: e.target.value })} placeholder="Integer value" required />
          </div>
          <div className={style['form-group']}>
            <span htmlFor="rent_fee">
              Rent Fee
            </span>
            <input type="number" id="rent_fee" name="rent_fee" value={equipment.rent_fee} onChange={(e) => setEquipment({ ...equipment, rent_fee: e.target.value })} placeholder="Decimal value" required />
          </div>
          <div className={style['form-group']}>
            <span data-testid="total-amount" htmlFor="total_amount">
              Total Amount
            </span>
            <input type="number" id="total_amount" name="total_amount" value={equipment.total_amount_payable} onChange={(e) => setEquipment({ ...equipment, total_amount_payable: e.target.value })} placeholder="Decimal value" required />
          </div>
          <div className={style['form-group']}>
            <label htmlFor="image">
              <input type="file" id="image" className={style.file} />
            </label>
          </div>
          <input data-testid="equipment-submit" type="submit" value="Add equipment" className={style.submit} />
        </form>
      </div>
    </>
  );
};

export default AddEquipment;
