import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faUser,
  faCog,
  faCalendar,
  faHome,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

library.add(faCalendar, faCog, faHome, faUser);

export default function LoginOrSign() {
  return (
    <div id="login-sign">
      <div className="anchors">
        <a href="/get_login">
          <FontAwesomeIcon icon={faUser} />
          Login
        </a>
        <a href="/Sign_Up">
          <FontAwesomeIcon icon={faPen} />
          Sign Up
        </a>
      </div>
    </div>
  );
}
