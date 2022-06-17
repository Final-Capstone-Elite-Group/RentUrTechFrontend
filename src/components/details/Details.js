import { useSelector } from 'react-redux';
import { useParams, Navigate, Link } from 'react-router-dom';
import { BiLeftArrow } from 'react-icons/bi';
import { GrCycle } from 'react-icons/gr';
import { FaChevronRight } from 'react-icons/fa';
import { BsGear, BsArrowRightCircle } from 'react-icons/bs';
import ColorPallete from '../color-pallete/ColorPallete';
import Button from '../button/Button';
import styles from './Details.module.scss';

const Details = () => {
  const {
    detailsContainer,
    imageContainer,
    flex,
    details,
    discover,
    chevron,
  } = styles;
  const { id } = useParams();
  const { equipments } = useSelector((state) => state.equipment);
  const currentTech = equipments?.filter((tech) => tech.id.toString() === id)[0];

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0,
    // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0,
    // (causes 2500.99 to be printed as $2,501)
  });
  let render;
  if (currentTech) {
    render = (
      <div className={detailsContainer}>
        <Link to="/">
          <Button style={{
            display: 'flex', position: 'absolute', bottom: '50px', left: 0,
          }}
          >
            <BiLeftArrow />
          </Button>
        </Link>
        <div className={imageContainer}>
          <figure>
            <img src={currentTech.image.url} alt={currentTech.title} />
          </figure>
          <span><GrCycle /></span>
          <h6>
            Rotate
            <br />
          </h6>
        </div>
        <div className={`${flex} ${details}`}>
          <h2>{currentTech.title}</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <h5>Rent fee</h5>
                  {formatter.format(currentTech.rent_fee)}
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Total amount payable</h5>
                  {formatter.format(currentTech.total_amount_payable)}
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Duration</h5>
                  {currentTech.duration}
                  {' '}
                  {currentTech.duration > 1 ? 'Days' : 'Day'}
                </td>
              </tr>
            </tbody>
          </table>
          <button className={discover} type="button">
            DISCOVER MORE MODELS
            <span className={chevron}><FaChevronRight /></span>
          </button>
          <ColorPallete />
          <Link to={`/reservation/${id}`}>
            <BsGear />
            {' '}
            Reserve
            {' '}
            <BsArrowRightCircle />
          </Link>
        </div>
      </div>
    );
  } else {
    render = <Navigate to="/404" />;
  }
  return (
    render
  );
};
export default Details;
