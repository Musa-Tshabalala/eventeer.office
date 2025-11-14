import PropTypes from 'prop-types';
import './tooltip.css'; // we’ll put the CSS in here

const Tooltip = ({ text, children, className }) => {
  return (
    <div className={`tooltip ${className}`}>
      {children}
      <span className="tooltip-text">{text}</span>
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Tooltip;
