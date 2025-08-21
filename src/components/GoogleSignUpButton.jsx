import { GoogleLogin } from '@react-oauth/google';
import PropTypes from 'prop-types';
import { get } from 'src/utils/functions';

export default function GoogleSignUpButton({ onResponse }) {
  const phone = get('phone');
  return (
    <GoogleLogin
      onSuccess={async (res) => {
        const response = await fetch('/auth/google/sign_up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ credential: res.credential, phone }),
          credentials: 'include',
        });

        const signed = await response.json();

        onResponse(signed);

        const me = await fetch('/api/me', {
          credentials: 'include',
        }).then((r) => r.json());

        console.log('ME', me);
      }}
      onError={() => console.log('Failure on google button')}
    />
  );
}

GoogleSignUpButton.propTypes = {
  onResponse: PropTypes.func,
};
