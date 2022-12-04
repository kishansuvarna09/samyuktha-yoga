import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Lottie from 'lottie-react';

import './contactMe.css';
import {
  emailValidation,
  nameValidation,
  isEmptyObject,
} from '@lib/validate';
import yogaSloth from '../../lotties/yoga-sloth.json';

console.log('import.meta.env:', import.meta.env);

const classTypes = [
  {
    name: 'BEGINNERS/INTERMEDIATE YOGA',
    value: 'level_1',
  },
  {
    name: 'VINYASA',
    value: 'level_2',
  },
  {
    name: 'PRIVATE CLASSES & 1-2-1',
    value: 'level_3',
  },
];

const Error = ({ message }) => (
  <div
    style={{ color: 'red', fontStyle: 'italic', fontSize: '12px' }}
  >
    {message}
  </div>
);

const defaultTemplateParams = {
  user_name: '',
  user_email: '',
  message: '',
  class_type: '',
};
const ContactMe = () => {
  const [templateParams, setTemplateParams] = useState({
    ...defaultTemplateParams,
  });
  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState({});

  function handleChange(evt) {
    if (response) setResponse(null);
    const value = evt.target.value;
    setTemplateParams({
      ...templateParams,
      [evt.target.name]: value,
    });
  }

  async function validateInput(_params) {
    const errors = {};
    if (!emailValidation(_params?.user_email)) {
      errors.user_email = 'Invalid input';
    }
    if (!nameValidation(_params?.user_name, 20)) {
      errors.user_name = 'Invalid input';
    }
    if (!nameValidation(_params?.message, 50, true)) {
      errors.message = 'Maximum of 50 characters allowed';
    }
    return errors;
  }

  const sendEmail = async () => {
    setErrors({});
    const validate = await validateInput(templateParams);
    if (!isEmptyObject(validate)) {
      setErrors(validate);
      return false;
    }
    await emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.status, result.text);
          setResponse({
            success:
              'Yusss YOU DID IT! Sam will get back to you soo..oon.',
          });
        },
        (error) => {
          console.log(error.text);
          setResponse({ error: 'OOPS! Failed to send the message' });
        }
      );
  };

  return (
    <>
      {response?.success && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <div className="icon-container">
                <Lottie animationData={yogaSloth} />
              </div>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                {response?.success}
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setResponse(null);
                    setTemplateParams({ ...defaultTemplateParams });
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {response?.error && (
        <div className="alert">
          <div>{response.error}</div>
        </div>
      )}
      <section id="contactMe">
        <div className="container">
          <div className="section">
            <div className="social-container">
              <div className="label">Follow</div>
              <div className="social-items">
                <div className="social-icon">
                  <a
                    href="https://www.instagram.com/samyuktha.acharya"
                    className="instagram social"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                </div>
              </div>
            </div>
            <div className="email-contact">
              <div
                className="input"
                style={{
                  border: errors?.user_name
                    ? '2px solid red'
                    : '1px solid #000000',
                }}
              >
                <input
                  placeholder="Name"
                  type="text"
                  name="user_name"
                  value={templateParams.user_name}
                  onChange={handleChange}
                />
                <Error message={errors?.user_name} />
              </div>
              <div
                className="input"
                style={{
                  border: errors?.user_email
                    ? '2px solid red'
                    : '1px solid #000000',
                }}
              >
                <input
                  placeholder="Email"
                  type="email"
                  name="user_email"
                  value={templateParams.user_email}
                  onChange={handleChange}
                />
                <Error message={errors?.user_email} />
              </div>

              <div className="input">
                <select
                  name="class_type"
                  onChange={handleChange}
                  value={templateParams.class_types}
                >
                  {classTypes.map((_class) => (
                    <option key={_class.value} value={_class.name}>
                      {_class.name}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="input"
                style={{
                  border: errors?.message
                    ? '2px solid red'
                    : '1px solid #000000',
                }}
              >
                <textarea
                  className="text-area"
                  placeholder="Message"
                  name="message"
                  value={templateParams.message}
                  onChange={handleChange}
                />
                <Error message={errors?.message} />
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    sendEmail();
                  }}
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactMe;
