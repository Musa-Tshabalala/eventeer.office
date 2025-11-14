import {
  faFacebook,
  faInstagram,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import {
  faComments,
  faEnvelope,
  faLock,
  faSpinner,
  faUpload,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import Input from 'src/components/Input';
import { consoleError } from 'src/utils/error';
import { fetchData, get, queryAll } from 'src/utils/functions';
import Tooltip from 'src/components/Tooltip';

const Form = ({ form = '', onClose, onPrompt }) => {
  let content;
  const [social, setSocial] = useState('facebook');
  const [loading, setLoading] = useState(false);

  const switchSocial = (e) => {
    e.preventDefault();
    const media = e.currentTarget.dataset.media;
    queryAll('fab-button').forEach((el) => el.classList.remove('show'));

    switch (media) {
      case 'instagram': {
        get('instagram').classList.add('show');
        setSocial('instagram');
        break;
      }
      case 'tiktok': {
        get(media).classList.add('show');
        setSocial(media);
        break;
      }
      default: {
        get(media).classList.add('show');
        setSocial(media);
      }
    }
  };

  const saveData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const result = await fetchData('/update_info', 'POST', data, {
        credentials: 'include',
      });
      setLoading(false);
      onPrompt(result);
    } catch (error) {
      consoleError('Save data form', error);
    }
  };
  switch (form) {
    case 'password': {
      content = (
        <>
          <div className="profile-icon">
            <FontAwesomeIcon border="2px" icon={faLock} size="3x" />
          </div>
          <Input
            label="New Password"
            type="password"
            placeholder=""
            name="password"
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder=""
            name="confirmPassword"
          />
        </>
      );
      break;
    }
    case 'email': {
      content = (
        <>
          <div className="profile-icon">
            <FontAwesomeIcon icon={faEnvelope} size="3x" border="2px" />
          </div>
          <Input
            type="email"
            placeholder="janedoe@gmail.com"
            name="email"
            label="New Email"
          />
        </>
      );
      break;
    }
    case 'socials': {
      content = (
        <>
          <div className="profile-icon">
            <FontAwesomeIcon size="3x" border="2px" icon={faComments} />
          </div>
          <div>
            <div className="fab-container">
              <Tooltip text="Instagram">
                <button
                  data-media="instagram"
                  id="instagram"
                  className="fab-button"
                  onClick={switchSocial}
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </button>
              </Tooltip>
              <Tooltip text="Facebook">
                <button
                  data-media="facebook"
                  id="facebook"
                  className="fab-button show"
                  onClick={switchSocial}
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </button>
              </Tooltip>
              <Tooltip text="Tik Tok">
                <button
                  data-media="tiktok"
                  id="tiktok"
                  className="fab-button"
                  onClick={switchSocial}
                >
                  <FontAwesomeIcon icon={faTiktok} />
                </button>
              </Tooltip>
            </div>
            <Input
              name={social}
              label={social.toUpperCase()}
              placeholder="johndoe245"
            />
          </div>
        </>
      );
      break;
    }

    default:
      content = null;
  }

  const show = form ? 'show' : '';
  return (
    <form
      method="POST"
      action="/update_info"
      onSubmit={saveData}
      className={`update-form ${show}`}
    >
      {content}
      {content && (
        <div className="form-buttons">
          <button
            className="close"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            Close
          </button>
          <button disabled={loading} className="save" type="submit">
            {loading ? (
              <div className="row">
                Saving <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
              </div>
            ) : (
              <div className="row">
                Save <FontAwesomeIcon icon={faUpload} />
              </div>
            )}
          </button>
        </div>
      )}
    </form>
  );
};

Form.propTypes = {
  form: PropTypes.string,
  onClose: PropTypes.func,
  me: PropTypes.object,
  onPrompt: PropTypes.func,
};

export default function Settings({ me, onPrompt }) {
  const [showSettings, setShowSettings] = useState(false);
  const [height, setHeight] = useState(0);
  const [form, setForm] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [showSettings]);

  const open = showSettings ? 'open' : '';

  const getForm = async (e) => setForm(e.currentTarget.dataset.text);

  return (
    <div className="settings-container">
      <Form
        onPrompt={(prompt) => onPrompt(prompt)}
        me={me}
        form={form}
        onClose={() => setForm('')}
      />
      <button onClick={() => setShowSettings((e) => !e)}>
        <FontAwesomeIcon icon={faUser} className={open} />
      </button>
      <div
        ref={ref}
        style={{ maxHeight: showSettings ? `${height}px` : '0' }}
        className="settings"
      >
        <button data-text="password" onClick={getForm}>
          Update Password
        </button>
        <button data-text="email" onClick={getForm}>
          Update Email
        </button>
        <button data-text="socials" onClick={getForm}>
          Update Socials
        </button>
      </div>
    </div>
  );
}

Settings.propTypes = {
  me: PropTypes.object,
  onPrompt: PropTypes.func,
};
