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

// User Information

const PersonalInfo = () => {
  const form = JSON.parse(localStorage.getItem('formData'))?.data;
  const [name, setName] = useState(form ? form?.name : '');
  const [email, setEmail] = useState(form ? form?.email : '');
  const [phone, setPhone] = useState(form ? form?.phone : '');

  const handleName = () => setName(get('name').value);
  const handleEmail = () => setEmail(get('email').value);
  const handlePhone = () => setPhone(get('phone').value);
  return (
    <>
      <div className="user">
        <FontAwesomeIcon border="1px" icon={faUser} size="3x" />
        <h2>USER INFO</h2>
      </div>
      <form>
        <div>
          <GoogleSignUpButton
            onResponse={(signed) => {
              console.log(signed);
            }}
          />
        </div>
        <div className="input-container">
          <label>Username</label>
          <input
            value={name}
            onChange={handleName}
            required
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
            required
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="input-container">
          <label>Phone No.</label>
          <input
            value={phone}
            onChange={handlePhone}
            required
            id="phone"
            type="tel"
            placeholder="0728766788"
          />
        </div>
      </form>
    </>
  );
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

function Validation() {
  const data = JSON.parse(localStorage.getItem('formData'))?.data;
  return (
    <div className="validation-container items-center">
      <h1>Validate</h1>
      <div>Name: {data.name}</div>
      <div>Phone: {data.phone}</div>
      <div>Email: {data.email}</div>
    </div>
  );
}

const CompleteForm = () => {
  const name =
    JSON.parse(localStorage.getItem('formData'))?.data?.name || 'John Doe';
  return (
    <>
      <div className="user">
        <FontAwesomeIcon border="1px" size="3x" icon={faCheck} />
      </div>
      <div className="input-container">
        <h1>Welcome to eventeer, {name}!</h1>
      </div>
    </>
  );
};

export default function SignUp() {
  const [promptMessage, setPromptMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [isError, setError] = useState(false);

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

        const data = { name, phone, email };

        localStorage.setItem(
          'formData',
          JSON.stringify({ onStep: step, data })
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
        data.data.password = password;
        data.onStep = step;
        localStorage.setItem('formData', JSON.stringify(data));
        return true;
      }
      case 4: {
        const form = JSON.parse(localStorage.getItem('formData'))?.data;

        if (!form) {
          setPromptMessage('Your data was not found, please try again.');
          setError(true);
          setShowPrompt(true);
          return false;
        }

        try {
          const result = await fetchData('/vendor_onboard', 'POST', form);

          setPromptMessage(result.message);
          setShowPrompt(true);

          setError(!result.status);

          return result.status;
        } catch (err) {
          consoleError('Save details function', err);
          setError(true);
          setPromptMessage('Oops something went wrong, try again later.');
          setShowPrompt(true);
          return false;
        }
      }

      default:
        return true;
    }
  };

  return (
    <div id="sign-up">
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
      >
        <Step>
          <PersonalInfo />
        </Step>
        <Step>
          <Security />
        </Step>
        <Step>
          <Validation />
        </Step>
        <Step>
          <CompleteForm />
        </Step>
      </Stepper>
    </div>
  );
}
