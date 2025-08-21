import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Status.css';

export default function ErrorBadge() {
  return (
    <div className="flex items-center space-x-2 badge error-badge">
      <FontAwesomeIcon
        icon={faExclamation}
        size="2x"
        className="text-red-500 text-2xl font"
      />
    </div>
  );
}
