import { GoogleLogin } from '@react-oauth/google';
import PropTypes from 'prop-types';
import { consoleError } from 'src/utils/error';
import { fetchData } from 'src/utils/functions';

export default function GoogleLoginButton({ loading, onComplete }) {
  return (
    <GoogleLogin
      onSuccess={async (res) => {
        try {
          loading(true);
          const login = await fetchData(
            '/auth/google/login',
            'POST',
            { credential: res.credential },
            { credentials: 'include' }
          );

          onComplete(login);
        } catch (error) {
          consoleError('Google Login Button', error);
        }
      }}
    />
  );
}

GoogleLoginButton.propTypes = {
  loading: PropTypes.func,
  onComplete: PropTypes.func,
};
