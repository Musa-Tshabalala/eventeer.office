import { useState } from 'react';
import './FileUpload.css';
import PropTypes from 'prop-types';

export default function FileUpload({ files, ...rest }) {
  const [file, setFile] = useState('No file chosen');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files);
      files(e.target.files);
    } else {
      removeFile();
      files(null);
    }
  };

  const removeFile = () => {
    setFile('No file chosen');
    files(null);
  };

  return (
    <div>
      <div className="file-cont">
        <input
          type="file"
          id="file"
          className="file-input"
          onChange={handleFileChange}
          {...rest}
        />

        <label htmlFor="file" className="file-label">
          Choose File
        </label>

        <button
          className={`rem-file ${typeof file === 'string' ? '' : 'show'}`}
          type="button"
          onClick={removeFile}
        >
          Remove
        </button>
      </div>

      <span style={{ marginLeft: '10px' }}>{file[0].name}</span>
    </div>
  );
}

FileUpload.propTypes = { files: PropTypes.func };
