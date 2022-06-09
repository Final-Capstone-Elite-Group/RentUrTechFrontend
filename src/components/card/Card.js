import PropTypes from 'prop-types';
import { BsFacebook, BsYoutube } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import style from './Card.module.scss';

/**
* @params {number} id - the equipment id
* @params {string} title - the equipment title
* @params {object} links - the equipments social media
* @params {string} description - the equipments description
* @params {string} imageUrl - the equipments image url
*/
const Card = ({
  id,
  title,
  links,
  description,
  imageUrl,
}) => {
  const {
    linkToEquipment,
    card,
    cardImageWrapper,
    imageBackground,
    image,
    separator,
    cardContent,
    iconContainer,
    iconWrapper,
  } = style;

  return (
    <div className={card}>
      <div className={cardImageWrapper}>
        <div className={imageBackground}>
          <figure>
            <img
              className={image}
              src={imageUrl}
              alt="tool"
            />
          </figure>
        </div>
      </div>
      <Link className={linkToEquipment} to={`/details/${id}`}>
        <h2>{ title }</h2>
        <div className={separator}>....................</div>
        <p className={cardContent}>
          {description}
        </p>
      </Link>
      <ul className={iconContainer}>
        <li className={iconWrapper}><a aria-label="link-to-social" href={links.fa}><BsFacebook /></a></li>
        <li className={iconWrapper}><a aria-label="link-to-social" href={links.tt}><AiFillTwitterCircle /></a></li>
        <li className={iconWrapper}><a aria-label="link-to-social" href={links.yt}><BsYoutube /></a></li>
      </ul>
    </div>
  );
};

Card.defaultProps = {
  links: {
    fa: '#',
    tt: '#',
    yt: '#',
  },
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  links: PropTypes.shape({
    fa: PropTypes.string,
    tt: PropTypes.string,
    yt: PropTypes.string,
  }),
};

export default Card;
