import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Status.css';

export default function SuccessBadge() {
  return (
    <div className="flex items-center space-x-2 badge">
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="text-green-500 text-2xl"
      />
      <span className="text-green-600 font-medium">Success</span>
    </div>
  );
}
