import { useState } from 'react';
import './MultiFileUpload.css';

export default function MultiFileUpload() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        id="file"
        className="file-input"
        multiple
        onChange={handleFileChange}
      />

      {/* Custom label */}
      <label htmlFor="file" className="file-label">
        Choose Files
      </label>

      {/* Preview list */}
      {files.length > 0 && (
        <ul className="file-list">
          {files.map((file, index) => (
            <li key={index} className="file-item">
              <span>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </span>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeFile(index)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
