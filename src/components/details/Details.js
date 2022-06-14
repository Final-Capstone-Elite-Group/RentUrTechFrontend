import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { currentEquipment } from '../../redux/equipment/equipment';
import Button from '../button/Button';
import ColorPallete from '../color-pallete/ColorPallete'
import { BiLeftArrow } from 'react-icons/bi';
import { GrCycle } from 'react-icons/gr';
import { FaChevronRight } from 'react-icons/fa';
import { BsGear, BsArrowRightCircle } from 'react-icons/bs';
import styles from './Details.module.scss';

const Details = () => {
  const { 
    detailsContainer,
    imageContainer,
    flex,
    details,
    discover,
    chevron
  } = styles;
  const { currentTech, equipments } = useSelector(state => state.equipment);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(currentEquipment(id.toString()));
  }, []);

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    currentTech ? 
    <div className={detailsContainer}>
      <Link to="/">
        <Button style={{display: 'flex', position: 'absolute', bottom: 0, left: 0}}><BiLeftArrow /></Button>
      </Link>
      <div className={imageContainer}>
        <figure>
          <img src={currentTech.attributes.image.url} alt={currentTech.attributes.title} />
        </figure>
        <span><GrCycle /></span>
        <h6>Rotate<br /></h6>
      </div>
      <div className={`${flex} ${details}`}>
        <h2>{currentTech.attributes.title}</h2>
        <table>
          <tbody>
            <tr>
              <td><h5>Rent fee</h5>
              {formatter.format(currentTech.attributes.rent_fee)}</td>
            </tr>
            <tr>
              <td><h5>Total amount payable</h5>
              {formatter.format(currentTech.attributes.total_amount_payable)}</td>
            </tr>
            <tr>
              <td><h5>Duration</h5>
              {formatter.format(currentTech.attributes.duration)}</td>
            </tr>
          </tbody>
        </table> 
        <Link className={discover} to="#">DISCOVER MORE MODELS <span className={chevron}><FaChevronRight /></span></Link>
        <ColorPallete />
        <button type='button'><BsGear /> Configure <BsArrowRightCircle /></button>
      </div>
    </div> : equipments.length > 0 ? "loading" : <Navigate push to={'/'}/>
  );
}

export default Details;