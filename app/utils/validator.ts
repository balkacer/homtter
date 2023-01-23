import { AuthorizationError } from "remix-auth";

type Validation = {
  isValid: Boolean;
  message: string;
}

const validationMethods = {
  isEmail: (inputValue: any, inputName: string): Validation => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = regex.test("" + inputValue);

    return {
      isValid,
      message: isValid ? "" : "It doesn't have a correct email format."
    }
  },
  isString: (inputValue: any, inputName: string): Validation => {
    const isValid = typeof inputValue === "string"

    return {
      isValid,
      message: isValid ? "" : `${inputName} is not a text`
    }
  },
  isRequired: (inputValue: any, inputName: string): Validation => {
    const isValid = !!inputValue || inputValue?.length > 0;

    return {
      isValid,
      message: isValid ? "" : `${inputName} is required`
    }
  },
}

type ValidationType = keyof typeof validationMethods;

export default function validateInput(inputName: string, inputValue: string, validations: ValidationType[], scope?: string): Validation {
  const validation_: Validation = {
    isValid: true,
    message: ""
  }

  validations.every(validation => {
    const { isValid, message } = validationMethods[validation](inputValue, inputName);

    if (!isValid) {
      validation_.isValid = isValid;
      validation_.message = `${scope && scope + ": "}${message}`;

      return false;
    }

    return true;
  })

  return validation_;
}