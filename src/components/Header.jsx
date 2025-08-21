import PropTypes from 'prop-types';
import TextType from './animations/TextType';
import logo from 'src/assets/logo.png';

const Company = () => {
  return (
    <div id="com-container">
      <img src={logo} id="logo" alt="logo" />
      <TextType
        text={['e.vee', 'eventeer']}
        typingSpeed={75}
        as={'div'}
        deletingSpeed={50}
        className="com"
      />
    </div>
  );
};

export default function Header({ nav }) {
  return (
    <div id="navbar">
      <Company />
      {nav}
    </div>
  );
}

Header.propTypes = {
  nav: PropTypes.node,
};
