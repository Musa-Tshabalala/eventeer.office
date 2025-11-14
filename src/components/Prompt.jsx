import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import SuccessBadge from './fonts/SuccessBadge';
import ErrorBadge from './fonts/ErrorBadge';

import { motion, AnimatePresence } from 'framer-motion';

export default function Prompt({ text, show = false, error, onClose }) {
  const icon = error ? <ErrorBadge /> : <SuccessBadge />;
  const backgroundColor = error ? 'rgb(255, 0, 0)' : 'rgb(0, 255, 0)';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="prompt"
          style={{ zIndex: 999 }}
          initial={{ opacity: 0, x: '120%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '120%' }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={(def) => {
            if (def === 'exit') onClose?.();
          }}
        >
          <div>{icon}</div>
          <div className="status-block" style={{ backgroundColor }}>
            <div className="status">{text}</div>
          </div>
          <div className="hide-prompt">
            <button onClick={onClose}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Prompt.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  error: PropTypes.bool,
};
