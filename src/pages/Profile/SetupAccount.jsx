import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import Input from 'src/components/Input';
import Tooltip from 'src/components/Tooltip';
import FileUpload from 'src/components/Upload/FileUpload';
import './SetupAccount.css';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { consoleError } from 'src/utils/error';
import Switch from 'src/components/Switch';

export default function SetupAccount({ me, onPrompt }) {
  const [selected, setSelected] = useState('Other');
  const [tAndC, setTAndC] = useState(false);
  const [formal, setFormal] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [tax, setTax] = useState('');
  const [account, setAccount] = useState('');
  const [reg, setReg] = useState('');
  const [files, setFiles] = useState(null);
  const ref = useRef(null);
  const refWidth = useRef(null);
  const handleSelected = (e) => {
    setSelected(e.currentTarget.dataset.type);
  };

  const handleReg = (e) => {
    let input = e.target.value.replace(/\D/g, '').slice(0, 12);

    input = input.replace(
      /^(\d{4})(\d{1,6})?(\d{1,2})?.*$/,
      (_, y, mid = '', suf = '') => {
        return `${y}${mid ? '/' + mid : ''}${suf ? '/' + suf : ''}`;
      }
    );

    setReg(input);
  };

  const handleTax = (e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 10);
    setTax(input);
  };

  const handleAccount = (e) => {
    const input = e.target.value.replace(/\D/g, '').slice(0, 25);
    setAccount(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Terms and Conditions:', tAndC);
    if (!tAndC)
      return onPrompt({
        ok: false,
        message: 'Agree to the terms and condtions, to continue.',
      });
    if (!files || files.length === 0)
      return onPrompt({ ok: false, message: 'No files were found' });
    formData.append('tAndC', tAndC);
    formData.append('formal', formal);
    formData.append('businessType', selected);
    formData.append('repPicture', files[0]);
    try {
      const res = await fetch('/setup_account', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const result = await res.json();

      onPrompt(result);
    } catch (err) {
      consoleError('Submit setup account', err);
    }
  };

  useEffect(() => {
    setHeight(ref.current.scrollHeight);
  }, [formal]);

  useEffect(() => {
    if (refWidth.current) {
      setWidth(refWidth.current.offsetWidth);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="bus-form-t-cont">
        <button
          type="button"
          onClick={() => setFormal(false)}
          className={`bus-form ${formal ? '' : 'selected'}`}
        >
          Informal
        </button>
        <button
          type="button"
          onClick={() => setFormal(true)}
          className={`bus-form ${formal ? 'selected' : ''}`}
        >
          Formal
        </button>
      </div>
      <div className="b-types-cont">
        {me.businessTypes.map((type, i) => {
          const text = [
            'Kitchen Stall, Bar, Food Truck etc.',
            'Clothing, Collectibles etc.',
            'Photography, Catering etc.',
            'Perfomances, Plays etc',
            'Unaccounted for',
          ];
          return (
            <Tooltip text={text[i]} key={type}>
              <button
                type="button"
                className={`bus-types ${selected === type ? 'selected' : ''}`}
                data-type={type}
                onClick={handleSelected}
              >
                {type}
              </button>
            </Tooltip>
          );
        })}
      </div>
      <div className="bus-details-cont">
        <Input
          ref={refWidth}
          type="text"
          label="Business Name"
          name="businessName"
          placeholder="J Does"
          required={true}
        />
        <div
          ref={ref}
          style={{ maxHeight: formal ? `${height}px` : '0' }}
          className="bus-form-det-cont"
        >
          <Input
            type="text"
            label="Registration Number"
            name={formal ? 'registrationNumber' : ''}
            placeholder="2025/123456/89"
            onChange={handleReg}
            value={reg}
            required={formal}
          />
          <Input
            type="text"
            label="Tax Number"
            name={formal ? 'taxNumber' : ''}
            value={tax}
            onChange={handleTax}
            placeholder="123456789"
            required={formal}
          />
        </div>
        <select name="bankName" style={{ width: width + 'px' }}>
          <option value="">Select Your Bank</option>
          {me.banksAllowed.map(({ bank, id }) => {
            return (
              <option value={id} key={id}>
                {bank}
              </option>
            );
          })}
        </select>
        <Input
          type="text"
          label="Account Holder Name"
          placeholder="Name on card"
          name="accountHolder"
          required={true}
        />
        <Input
          type="text"
          label="Account Number"
          value={account}
          onChange={handleAccount}
          placeholder="10126783940"
          name="accountNumber"
          required={true}
        />
        <Input
          type="text"
          label="Website (Optional)"
          name="website"
          placeholder="https://www.jdoes.com"
        />
        <div className="out-file-cont" style={{ maxWidth: width + 'px' }}>
          <label>Display Picture</label>
          <h4>
            This picture will act as your main display picture for your business
            to other businesses and customers.
          </h4>
          <FileUpload files={(files) => setFiles(files)} />
        </div>
      </div>
      <div className="tandc-container">
        <p>
          <i>
            I have read, understood and agree to the
            <a href={`/profile/${me._id}/vendor/terms_and_conditions`}>
              {' '}
              Terms and conditions.
            </a>
          </i>
        </p>
        <Switch switched={(on) => setTAndC(on)} />
      </div>
      <button type="submit">
        <div className="row">
          Save <FontAwesomeIcon icon={faUpload} />
        </div>
      </button>
    </form>
  );
}

SetupAccount.propTypes = { me: PropTypes.object, onPrompt: PropTypes.func };
