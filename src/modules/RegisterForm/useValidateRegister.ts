import { useState } from "react";
import { TUserData } from "@src/@types/requestTypes";
import { defaultRegisterValues } from "@src/mocks/DefaultFormValues";
import { spaceReplace } from "@src/utils/spaceReplace";

export function useValidateRegister() {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<TUserData>(
    defaultRegisterValues
  );

  function validateRegister(registervalues: TUserData) {
    const errors: TUserData = { ...formErrors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(registervalues.email)) {
      errors.email = "INVALID EMAIL ADDRESS!";
      setIsValid(false);
    } else if (registervalues.email === "") {
      errors.email = "EMAIL ADDRESS IS MISSING!";
      setIsValid(false);
    } else {
      errors.email = "";
    }

    if (registervalues.first_name === "") {
      errors.first_name = "FIRST NAME IS MISSING!";
      setIsValid(false);
    } else {
      errors.first_name = "";
    }

    if (registervalues.last_name === "") {
      errors.last_name = "LAST NAME IS MISSING!";
      setIsValid(false);
    } else {
      errors.last_name = "";
    }

    if (registervalues.phone_number === "") {
      errors.phone_number = "PHONE NUMBER IS MISSING!";
      setIsValid(false);
    } else if (spaceReplace(registervalues.phone_number).length < 9) {
      errors.phone_number = "PHONE NUMBER MUST BE 9 NUMBERS LONG!";
      setIsValid(false);
    } else {
      errors.phone_number = "";
    }

    if (registervalues.password === "") {
      errors.password = "PASSWORD IS MISSING!";
      setIsValid(false);
    } else if (registervalues.password.length < 8) {
      errors.password = "PASSWORD MUST BE 8 CHARACTERS OR LONGER!";
      setIsValid(false);
    } else {
      errors.password = "";
    }

    if (registervalues["repeat-password"] === "") {
      errors["repeat-password"] = "REPEAT PASSWORD IS MISSING!";
      setIsValid(false);
    } else if (registervalues["repeat-password"] !== registervalues.password) {
      errors["repeat-password"] = "PASSWORD AND REPEAT PASSWORD \nDON'T MATCH!";
      setIsValid(false);
    } else {
      errors["repeat-password"] = "";
    }

    setFormErrors(errors);
  }

  return { validateRegister, isValid, setIsValid, formErrors };
}
