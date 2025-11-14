import PropTypes from 'prop-types';

export default function NoPicture({ name }) {
  const split = name?.split('_');
  const formatedName =
    split.length === 2 ? split.map((el) => el[0]).join('') : split[0][0];
  return (
    <div className={`no-picture-outer circle`}>
      <div className="initials">{formatedName.toUpperCase()}</div>
    </div>
  );
}

NoPicture.propTypes = { name: PropTypes.string };
