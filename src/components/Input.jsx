import PropTypes from 'prop-types';

export default function Input({
  name,
  placeholder,
  type = 'text',
  label,
  required = false,
  ...rest
}) {
  return (
    <div className={`input-container ${name}-container`}>
      <label>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  props: PropTypes.object,
  required: PropTypes.bool,
};
