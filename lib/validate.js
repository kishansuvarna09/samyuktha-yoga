const PHONE_REGEX = new RegExp(
  /"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"/gim
);

const EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const emailValidation = (_value) => {
  if (!_value || EMAIL_REGEX.test(_value) === false) {
    return false;
  }
  return true;
};

export const nameValidation = (
  _value,
  _maxLength,
  allowBlank = false
) => {
  if (
    (!allowBlank && (!_value || _value.trim().length === 0)) ||
    _value.trim().length > _maxLength
  ) {
    return false;
  }
  return true;
};

export const phoneValidation = (_value) => {
  if (!_value || PHONE_REGEX.test(_value) === false) {
    return false;
  }
  return true;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
