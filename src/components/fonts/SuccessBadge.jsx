import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Status.css';

export default function SuccessBadge() {
  return (
    <div className="flex items-center space-x-2 badge success-badge">
      <FontAwesomeIcon
        color="white"
        icon={faCheck}
        className="text-green-500 text-2xl"
      />
    </div>
  );
}
