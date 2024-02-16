import { useState } from "react";
import { TLogInUser } from "@src/@types/requestTypes";
import { defaultlogInValues } from "@src/mocks/DefaultFormValues";

export function useValidateLogIn() {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<TLogInUser>(defaultlogInValues);

  function validateLogIn(loginUser: TLogInUser) {
    const errors: TLogInUser = { ...formErrors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (loginUser.email === "") {
      errors.email = "EMAIL IS MISSING!";
      setIsValid(false);
    } else if (!emailRegex.test(loginUser.email)) {
      errors.email = "INVALID EMAIL ADDRESS!";
      setIsValid(false);
    } else {
      errors.email = "";
    }

    if (loginUser.password === "") {
      errors.password = "PASSWORD IS MISSING!";
      setIsValid(false);
    } else if (loginUser.password.length < 8) {
      errors.password = "YOUR PASSWORD IS 8 CHARACTERS OR LONGER!";
      setIsValid(false);
    } else {
      errors.password = "";
    }

    setFormErrors(errors);
  }

  return { formErrors, validateLogIn, isValid, setIsValid };
}
