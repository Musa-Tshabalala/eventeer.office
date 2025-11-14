import { faCheck, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Stepper, { Step } from 'src/components/animations/Stepper';
import 'src/styles/variables.css';
import './SignUp.css';
import Prompt from 'src/components/Prompt';
import { useState } from 'react';
import { fetchData, get } from 'src/utils/functions';
import { consoleError } from 'src/utils/error';
import GoogleSignUpButton from 'src/components/GoogleSignUpButton';
import PropTypes from 'prop-types';
import Loading from 'src/components/Loading';
import Or from 'src/components/Or';
import logo from 'src/assets/logo.png';

// User Information

const PersonalInfo = ({ onGoogleSuccess, googleLoading }) => {
  const form = JSON.parse(localStorage.getItem('formData'));
  const [name, setName] = useState(form ? form?.name : '');
  const [email, setEmail] = useState(form ? form?.email : '');
  const [phone, setPhone] = useState(form ? form?.phone : '');
  const [borderColor, setBorderColor] = useState('rgb(255, 0, 0)');

  const handleName = () => setName(get('name').value);
  const handleEmail = () => setEmail(get('email').value);
  const handlePhone = () => {
    const cell = get('phone').value;
    setPhone(cell);
    const regex = /^0[6-8][0-9]{8}$/;

    const validCell = regex.test(cell);
    setBorderColor(validCell ? 'rgb(0, 255, 0)' : 'rgb(255, 0, 0)');
  };
  return (
    <>
      <div className="user">
        <FontAwesomeIcon border="1px" icon={faUser} size="3x" />
        <h2>USER INFO</h2>
      </div>
      <form>
        <div className="input-container">
          <label>Phone No.</label>
          <input
            value={phone}
            style={{ borderColor }}
            onChange={handlePhone}
            required
            id="phone"
            type="tel"
            placeholder="0728766788"
          />
        </div>
        <div className="sign-in-choice">
          <div className="continue-with-container">
            <div className="continue-with">
              <GoogleSignUpButton
                onResponse={(signed) => {
                  onGoogleSuccess(signed);
                }}
                loading={(bool) => googleLoading(bool)}
                phone={phone}
              />
            </div>
          </div>
          <Or />
          <div className="input-container">
            <label>Username</label>
            <input
              value={name}
              onChange={handleName}
              id="name"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div className="input-container">
            <label>Email Address</label>
            <input
              value={email}
              onChange={handleEmail}
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>
      </form>
    </>
  );
};

PersonalInfo.propTypes = {
  onGoogleSuccess: PropTypes.func,
  googleLoading: PropTypes.func,
};

// Password Inputs

const Security = () => {
  return (
    <>
      <div className="user">
        <FontAwesomeIcon border="1px" size="3x" icon={faLock} />
        <h2>Security</h2>
      </div>
      <form>
        <div className="input-container">
          <label>Password</label>
          <input id="password" required type="password" />
        </div>
        <div className="input-container">
          <label>Confirm Password</label>
          <input id="confirm-password" required type="password" />
        </div>
      </form>
    </>
  );
};

const CompleteForm = () => {
  const name = JSON.parse(localStorage.getItem('formData'))?.name || 'John Doe';
  return (
    <>
      <div className="user">
        <FontAwesomeIcon border="1px" size="3x" icon={faCheck} />
      </div>
      <div className="input-container">
        <h1>Welcome to eventeer, {name}!</h1>
        <h2>Click on Complete to submit form.</h2>
      </div>
    </>
  );
};

export default function SignUp() {
  const [promptMessage, setPromptMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [isError, setError] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setloading] = useState(false);

  const submitForm = async () => {
    const form = JSON.parse(localStorage.getItem('formData'));

    if (!form) {
      setPromptMessage('Your data was not found, please try again.');
      setError(true);
      setShowPrompt(true);
      return false;
    }

    try {
      const result = await fetchData('/vendor_onboard', 'POST', form, {
        credentials: 'include',
      });

      setPromptMessage(result.message);
      setShowPrompt(true);
      setError(!result.ok);

      const response = await fetch('/api/me', { method: 'GET' });
      const me = await response.json();

      console.log('Current me:', me);
      localStorage.clear();
      return result.ok;
    } catch (err) {
      consoleError('Save details function', err);
      setError(true);
      setPromptMessage('Oops something went wrong, try again later.');
      setShowPrompt(true);
      return false;
    }
  };

  const saveDetails = async (step) => {
    switch (step) {
      case 2: {
        const name = get('name').value.trim();
        const phone = get('phone').value.trim();
        const email = get('email').value.trim();

        if (!name || !phone || !email) {
          setPromptMessage('All Fields are required!');
          setError(true);
          setShowPrompt(true);

          return false;
        }

        localStorage.setItem(
          'formData',
          JSON.stringify({ name, phone, email })
        );

        return true;
      }
      case 3: {
        const password = get('password').value.trim();
        const confirmPassword = get('confirm-password').value.trim();

        if (!password || !confirmPassword || password !== confirmPassword) {
          setError(true);
          setShowPrompt(true);
          setPromptMessage('Both passwords are required, and they must match.');
          return false;
        }
        const data = JSON.parse(localStorage.getItem('formData'));
        data.password = password;
        data.onStep = step;
        localStorage.setItem('formData', JSON.stringify(data));
        return true;
      }
      default:
        return true;
    }
  };

  return (
    <div id="sign-up">
      <img className="background-img" src={logo} />
      {loading && <Loading />}
      <Prompt
        text={promptMessage}
        show={showPrompt}
        error={isError}
        onClose={() => setShowPrompt(false)}
      />
      <Stepper
        stepCircleContainerClassName="step-circle-container"
        stepContainerClassName="steps"
        nextButtonProps={'Next'}
        key={step}
        nextButtonText="Next"
        initialStep={step}
        onBeforeStepChange={async (from, to) => {
          if (to > from) {
            try {
              const result = await saveDetails(to);
              return result;
            } catch (err) {
              consoleError('On before step change callback', err);
            }
          }
        }}
        onFinalStepCompleted={submitForm}
      >
        <Step>
          <PersonalInfo
            onGoogleSuccess={(result) => {
              if (result.ok) {
                setloading(false);
                setStep(2);
              } else {
                setloading(false);
                setPromptMessage(result.message);
                setError(true);
                setShowPrompt(true);
              }
            }}
            googleLoading={(bool) => {
              if (bool) setloading(bool);
            }}
          />
        </Step>
        <Step>
          <Security />
        </Step>
        <Step>
          <CompleteForm />
        </Step>
      </Stepper>
    </div>
  );
}
