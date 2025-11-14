import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Loading() {
  return (
    <div className="spinner-container">
      <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
    </div>
  );
}
