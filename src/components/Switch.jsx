import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Switch({ switched }) {
  const [on, setOn] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setOn((x) => {
      const next = !x;
      switched(next);
      return next;
    });
  };

  return (
    <div className="switch-container" onClick={handleClick}>
      <motion.div
        className="switch-track"
        animate={{ backgroundColor: on ? '#4ade80' : '#a3a3a3' }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="switch-knob"
          layout
          animate={{ x: on ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
        />
      </motion.div>
    </div>
  );
}

Switch.propTypes = {
  switched: PropTypes.func,
};
