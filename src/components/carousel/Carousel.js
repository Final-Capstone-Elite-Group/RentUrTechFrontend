import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import style from './Carousel.module.scss';
import Card from '../card/Card';
import Button from '../button/Button';
import useWindowDimention from '../../custom-hooks/useWindowDimention';

/**
* Displays a collection of equipment items
* @params {props}  collection - an array of equipments to be displayed
*/
const Carousel = ({ collection }) => {
  const menuState = useSelector((state) => (state.menu));
  const { container, cardContainer } = style;
  const [size, setSize] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [first, setFirst] = useState(0);
  const { width } = useWindowDimention();

  let touchStart = null;

  useEffect(() => {
    let newSize;
    if (width <= 572) {
      newSize = 1;
    } else if (width <= 768) {
      if (!menuState) {
        newSize = 2;
      } else {
        newSize = 1;
      }
    } else if (width <= 1400) {
      if (!menuState) {
        newSize = 3;
      } else {
        newSize = 2;
      }
    } else {
      newSize = 4;
    }

    setSize(newSize);
    /**
     * if the list is empty or the size has changed or the {filteredList}
     * does not matches the collection of equipments
     * filters a new list of length {size} starting from {first}
    */
    if (filteredList.length
      || newSize !== filteredList.length
      || collection[first] !== filteredList[0]) {
      setFilteredList(collection.filter((_item, i) => i >= first && i < first + newSize));
    }

    return () => setSize(null);
  }, [width, first, collection, menuState]);

  const touchStartHandler = (e) => {
    touchStart = e.targetTouches[0].clientY;
  };

  /**
  * returns an object containing the number of steps the
  * carousel will spin and also determines whether the carousel
  * has reached the edges.
  * @params {number} spinSize - the size of the carousel
  * @return {object} {disabled: boolean, move: number}
  */
  const spin = (spinSize) => {
    const movement = first + spinSize;

    if (movement < 0) {
      return { disabled: true, move: 0 };
    } if (movement >= collection.length) {
      return { disabled: true, move: first };
    }

    return { disabled: false, move: movement };
  };

  const touchEndHandler = (e) => {
    if (touchStart - e.changedTouches[0].clientY < 0) {
      setFirst(spin(size * -1).move);
    } else {
      setFirst(spin(size).move);
    }
  };

  const carouselButtonPreviousHandler = () => {
    setFirst(spin(size * -1).move);
  };

  const carouselButtonNextHandler = () => {
    setFirst(spin(size).move);
  };

  return (
    <div data-testid="carousel" className={container}>
      <Button
        disabled={spin(size * -1).disabled}
        style={{
          transform: 'translateY(-50%)',
          position: 'absolute',
        }}
        onClick={carouselButtonPreviousHandler}
        testId="buttonPrevious"
      >
        <BiLeftArrow />
      </Button>
      <div
        onTouchStart={touchStartHandler}
        onTouchEnd={touchEndHandler}
        className={cardContainer}
      >
        {
          filteredList.map((item) => {
            const {
              id,
              title,
              description,
              review,
              image,
            } = item;

            return (
              <Card
                id={id}
                key={title}
                title={title}
                description={description}
                links={{ fb: '#', tt: '#', yt: review }}
                imageUrl={image.url}
              />
            );
          })
        }
      </div>
      <Button
        disabled={spin(size).disabled}
        style={{
          transform: 'translateY(-50%)',
          position: 'absolute',
          right: 0,
        }}
        onClick={carouselButtonNextHandler}
        testId="buttonNext"
        isRight
      >
        <BiRightArrow />
      </Button>
    </div>
  );
};

Carousel.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.shape({

    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    review: PropTypes.string,
    dates_reserved: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number,
    rent_fee: PropTypes.string,
    total_amount_payable: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
    }),

  })).isRequired,
};

export default Carousel;
