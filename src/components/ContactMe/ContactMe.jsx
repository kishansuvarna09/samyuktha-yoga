import React, { useState } from 'react';
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
import Mandala from '@components/Common/Mandala';
import yogaSloth from '../../lotties/yoga-sloth.json';

const classTypes = [
  {
    name: 'BEGINNERS BATCH (8.30am to 9.30am)',
    value: 'level_0',
  },
  {
    name: 'INTERMEDIATE BATCH (8.30am to 9.30am)',
    value: 'level_1',
  },
];

const Error = ({ message }) =>
  message ? <div className="error-text">{message}</div> : null;

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
  const [sendingEmail, setSendingEmail] = useState(false);

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
    if (!nameValidation(_params?.class_type, 50)) {
      errors.class_type = 'Please select one';
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
      <section id="contactMe" className="contact-section">
        <Mandala className="contact-mandala" />
        <div className="container">
          <div className="contact-grid">
            <div className="contact-intro">
              <span className="eyebrow eyebrow-light">
                05 — Book a session
              </span>
              <h2>
                Begin with a class that feels <em>right for your body.</em>
              </h2>
              <p className="contact-note">
                Yoga practices are not just a set of exercises — working
                with the body, we reveal new facets of our consciousness.
                Book a session to receive the full itinerary and fee
                structure.
              </p>
              <a
                href="https://www.instagram.com/samyuktha.acharya"
                className="contact-instagram"
                aria-label="Follow Samyuktha Yoga on Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
                <span>@samyuktha.acharya</span>
              </a>
            </div>
            <div className="email-contact">
              <div
                className={`input ${errors?.user_name ? 'input-error' : ''}`}
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
                className={`input ${errors?.user_email ? 'input-error' : ''}`}
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

              <div
                className={`input ${errors?.class_type ? 'input-error' : ''}`}
              >
                <select
                  name="class_type"
                  onChange={handleChange}
                  value={templateParams.class_type}
                >
                  <option value="" disabled>
                    Select a class
                  </option>
                  {classTypes.map((_class) => (
                    <option key={_class.value} value={_class.name}>
                      {_class.name}
                    </option>
                  ))}
                </select>
                <Error message={errors?.class_type} />
              </div>
              <div
                className={`input ${errors?.message ? 'input-error' : ''}`}
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
                  className="btn btn-light"
                  disabled={sendingEmail}
                  onClick={async (e) => {
                    e.preventDefault();
                    if (!sendingEmail) {
                      setSendingEmail(true);
                      await sendEmail();
                      setSendingEmail(false);
                    }
                  }}
                >
                  {sendingEmail ? 'Please Wait' : 'Book Session'}
                </button>
              </div>
            </div>
          </div>

          <footer className="site-footer">
            <div className="footer-brand">
              Samyuktha<span>yoga</span>
            </div>
            <div className="footer-meta">
              <span>Dubai · Online</span>
              <span>Hatha · Ashtanga</span>
              <span>© {new Date().getFullYear()} Samyuktha Yoga</span>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
};

export default ContactMe;
