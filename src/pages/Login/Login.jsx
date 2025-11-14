import { useEffect, useState } from 'react';
import { consoleError } from 'src/utils/error';
import './Login.css';
import Prompt from 'src/components/Prompt';
import NoPicture from 'src/components/NoPicture';
import GoogleLoginButton from 'src/components/GoogleLogin';
import { fetchData, get } from 'src/utils/functions';
import Loading from 'src/components/Loading';
import Or from 'src/components/Or';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import logo from 'src/assets/logo.png';

const mobileQuery = window.matchMedia('(max-width: 425px)');

export default function Login() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/auth/profiles`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.ok) {
          setError(true);
          setShowPrompt(true);
          setMessage(result.message);
          return;
        }
        console.log(result);
        setData(result.profiles);
      })
      .catch((err) => {
        consoleError('fetchData on login', err);
        setError(true);
        setMessage(`Unexpected error!`);
        setShowPrompt(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleProfileLogin = async (e) => {
    try {
      const result = await fetchData(
        '/auth/profile/login',
        'POST',
        {
          _id: e.currentTarget.dataset.id,
        },
        { credentials: 'include' }
      );

      if (!result.ok) {
        setError(true);
        setShowPrompt(true);
        setMessage(result.message);
        return;
      }

      window.location.href = result.redirect;
    } catch (error) {
      consoleError('Handle Profile Login', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = get('email').value.trim();
    const password = get('password').value.trim();
    try {
      const response = await fetchData(
        '/auth/login',
        'POST',
        { email, password },
        { credentials: 'include' }
      );

      if (!response.ok) {
        setError(true);
        setMessage(response.message);
        setShowPrompt(true);
        return;
      }

      window.location.href = response.redirect;
    } catch (error) {
      consoleError('Handle Login', error);
    }
  };

  return (
    <>
      {fetchLoading && <Loading />}
      <Prompt
        text={message}
        error={error}
        show={showPrompt}
        onClose={() => setShowPrompt(false)}
      />
      <div id="login">
        {mobileQuery.matches && <img className="background-img" src={logo} />}
        <div id="login-container">
          <div className="profiles center">
            <div className="head">Continue</div>
            {loading ? (
              <h4>Loading profiles...</h4>
            ) : (
              <div id="all-profiles">
                {data.length === 0 ? (
                  <h4>No profiles found.</h4>
                ) : (
                  data.map(({ picture, name, _id }) => {
                    return (
                      <button
                        onClick={handleProfileLogin}
                        className="profile"
                        key={_id}
                        data-id={_id}
                      >
                        {picture ? (
                          <>
                            <img
                              className="profile-img"
                              src={picture}
                              alt={`${name}-photo`}
                              loading="lazy"
                            />
                            <div>{name}</div>
                          </>
                        ) : (
                          <>
                            <NoPicture name={name} />
                            <div>{name}</div>
                          </>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
          <div className="non-profiles">
            <div className="head">Log In To Your Account</div>
            <div className="logins center">
              <div className="continue-with">
                <GoogleLoginButton
                  loading={(bool) => setFetchLoading(bool)}
                  onComplete={(data) => {
                    setFetchLoading(false);
                    if (!data.ok) {
                      setError(true);
                      setShowPrompt(true);
                      setMessage(data.message);
                      return;
                    }

                    window.location.href = data.redirect;
                  }}
                />
              </div>
              <Or />
              <div className="inputs center">
                <div className="input-container">
                  <label>Email</label>
                  <input id="email" name="email" type="email" />
                </div>
                <div className="input-container">
                  <label>Password</label>
                  <input id="password" name="password" type="password" />
                </div>
              </div>
              <button onClick={handleLogin}>
                login
                <FontAwesomeIcon icon={faRightToBracket} />
              </button>
            </div>
          </div>
          <div className="no-account-container">
            <div className="no-account">Dont have an account?</div>
            <a href="/sign_up" className="sign-up">
              Sign Up
            </a>
          </div>
        </div>
        {!mobileQuery.matches && (
          <div className="container-right">
            <img src={logo} alt="logo" />
          </div>
        )}
      </div>
    </>
  );
}
