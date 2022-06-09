import PropTypes from 'prop-types';
import styles from './Button.module.scss';

/**
* Custom button
* @params {boolean} isRight - if true the button's border-radius
*  and text alignment will be opposite.
* @params {object} style - css style.
* @params {node} children - anything that can be rendered.
* @params {function} onClick - a handler for the onClick event.
* @params {boolean} disabled - sets the disabled property for the button.
*/
const Button = ({
  isRight, style, children, onClick, disabled, testId,
}) => {
  const { button, right } = styles;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      style={style}
      className={`${button} ${isRight ? right : ''}`}
      data-testid={testId}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  isRight: false,
  style: null,
  children: null,
  onClick: null,
  disabled: null,
  testId: null,
};

Button.propTypes = {
  isRight: PropTypes.bool,
  style: PropTypes.shape({
    position: PropTypes.string,
    top: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number,
    backgroudColor: PropTypes.string,
    color: PropTypes.string,
  }),
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  testId: PropTypes.string,
};

export default Button;
