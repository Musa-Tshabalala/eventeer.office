import { useEffect, useState } from 'react';
import Prompt from 'src/components/Prompt';
import Aside from './Aside';
import './Profile.css';
import Loading from 'src/components/Loading';
import { Route, Routes } from 'react-router-dom';
import SetupAccount from './SetupAccount';
import VendorTerms from '../Terms/VendorTerms';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/me', {
          method: 'GET',
          credentials: 'include',
          signal,
        });

        const user = await res.json();

        if (!user.ok) {
          setPrompt(true);
          setError(true);
          setPromptMessage(user.message);
        } else {
          user.data.businessTypes = user.businessTypes;
          user.data.banksAllowed = user.banksAllowed;
          setUserData(user.data);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', err);
          setPrompt(true);
          setError(true);
          setPromptMessage('Could not reach server.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // cleanup function runs if component unmounts

    /* return () => {
      controller.abort();
    }; */
  }, []);

  if (loading) return <Loading />;

  return (
    <div id="profile">
      <Prompt
        show={prompt}
        text={promptMessage}
        error={error}
        onClose={() => setPrompt(false)}
      />
      <Aside
        me={userData}
        picture={userData.profile.picture}
        name={userData.profile.name}
        onPrompt={(prompt) => {
          if (prompt.ok) setError(false);
          else setError(true);
          setPrompt(true);
          setPromptMessage(prompt.message);
        }}
      />
      <main>
        <Routes>
          <Route
            path="setup"
            element={
              <SetupAccount
                onPrompt={(prompt) => {
                  prompt.ok ? setError(false) : setError(true);
                  setPrompt(true);
                  setPromptMessage(prompt.message);
                }}
                me={userData}
              />
            }
          />
          <Route path="vendor/terms_and_conditions" element={<VendorTerms />} />
        </Routes>
      </main>
    </div>
  );
}
