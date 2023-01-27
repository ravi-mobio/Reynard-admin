import Constants from "../Constants";
import Patterns from "../Patterns";

const isEmailValid = (val, minVal, maxVal, isRequired) => {
  if (isRequired && (val === "" || !val)) {
    return Constants.FIELD_REQUIRED;
  }

  if (val !== "" && val !== null) {
    if (val.match(Patterns.EMAIL_PATTERN) === null) {
      return Constants.EMAIL_NOT_VALID;
    }
  }

  if (minVal && val.length < minVal) {
    return Constants.VALUE_TOO_SHORT;
  }

  if (maxVal && val.length > maxVal) {
    return Constants.VALUE_TOO_LONG;
  }

  return "";
};

const isPasswordValid = (val, minVal, maxVal, isRequired) => {
  if (isRequired && (val === "" || !val)) {
    return Constants.FIELD_REQUIRED;
  }

  if (minVal && val.length < minVal) {
    return Constants.VALUE_TOO_SHORT;
  }

  if (maxVal && val.length > maxVal) {
    return Constants.VALUE_TOO_LONG;
  }

  return "";
};

const Validator = {
  validate: (fieldType, fieldValue, minVal = null, maxVal = null, isRequired = true) => {
    switch (fieldType) {
      case "email":
        return isEmailValid(fieldValue, minVal, maxVal, isRequired);
      case "password":
        return isPasswordValid(fieldValue, minVal, maxVal, isRequired);
      default:
        return "";
    }
  },
};

export default Validator;
