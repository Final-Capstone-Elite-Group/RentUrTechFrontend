import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import style from '../../sass/shared/form.module.scss';

const AddEquipment = () => {
  const user = useSelector((state) => state.auth);
  console.log(user);

  const [equipment, setEquipment] = useState({
    image: '',
    title: '',
    description: '',
    review: '',
    duration: 0,
    rent_fee: 0.0,
    total_amount_payable: 0.0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/equipments',
      {
        image: equipment.image,
        title: equipment.title,
        description: equipment.description,
        review: equipment.review,
        duration: equipment.duration,
        rent_fee: equipment.rent_fee,
        total_amount_payable: equipment.total_amount_payable,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    setEquipment({
      image: '',
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
            <h1>Equipments</h1>
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
            <span htmlFor="total_amount">
              Total Amount
            </span>
            <input type="number" id="total_amount" name="total_amount" value={equipment.total_amount_payable} onChange={(e) => setEquipment({ ...equipment, total_amount_payable: e.target.value })} placeholder="Decimal value" required />
          </div>
          <div className={style['form-group']}>
            <label htmlFor="image">
              <input type="file" id="image" value={equipment.image} onChange={(e) => setEquipment({ ...equipment, image: e.target.value })} className={style.file} />
            </label>
          </div>
          <input type="submit" value="Add equipment" className={style.submit} />
        </form>
      </div>
    </>
  );
};

export default AddEquipment;
