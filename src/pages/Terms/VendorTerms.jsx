import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function VendorTerms() {
  return (
    <>
      <iframe
        src="http://localhost:3000/businessTerms/vendor_terms.pdf"
        height="92%"
        width="100%"
      ></iframe>
      <a
        className="download-pdf"
        href="http://localhost:3000/download/vendor_terms"
        download="Eventeer_terms"
      >
        Download PDF
        <FontAwesomeIcon size="1x" icon={faDownload} />
      </a>
    </>
  );
}
