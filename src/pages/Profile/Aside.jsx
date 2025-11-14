import PropTypes from 'prop-types';
import NoPicture from 'src/components/NoPicture';
import { formatName } from 'src/utils/functions';
import './Aside.css';
import Settings from './Settings';
import { Link } from 'react-router-dom';

export default function Aside({ picture, name, me, onPrompt }) {
  name = formatName(name, -1);

  return (
    <div className="sidebar">
      <div className="user-container">
        <div className="user-name">{name}</div>
        {picture ? (
          <img src={picture} className="profile-picture" />
        ) : (
          <NoPicture name={name} />
        )}
      </div>
      <Settings
        me={me}
        onPrompt={(prompt) => {
          onPrompt(prompt);
        }}
      />
      <hr />
      <Link to={`/profile/${me._id}/overview`}>Overview</Link>
      <hr />
      <Link to={`/profile/${me._id}/setup`}>Setup Business Account</Link>
      <hr />
      <Link to={`/profile/${me._id}/insurance`}>Insurance</Link>
      <hr />
    </div>
  );
}

Aside.propTypes = {
  picture: PropTypes.string,
  name: PropTypes.string,
  me: PropTypes.object,
  onPrompt: PropTypes.func,
};
