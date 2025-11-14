import { GoogleLogin } from '@react-oauth/google';
import PropTypes from 'prop-types';

export default function GoogleSignUpButton({ onResponse, phone, loading }) {
  return (
    <GoogleLogin
      onSuccess={async (res) => {
        loading(true);

        console.log('Res:', res);
        const response = await fetch('/auth/google/sign_up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ credential: res.credential, phone }),
        });

        const signed = await response.json();

        onResponse(signed);

        if (signed.ok) {
          console.log('Data:', signed);
          const { name, email, picture, phone } = signed;
          localStorage.setItem(
            'formData',
            JSON.stringify({ name, email, phone, picture: picture || '' })
          );
        }
      }}
      onError={() => console.log('Failure on google button')}
    />
  );
}

GoogleSignUpButton.propTypes = {
  onResponse: PropTypes.func,
  phone: PropTypes.string,
  loading: PropTypes.func,
};
