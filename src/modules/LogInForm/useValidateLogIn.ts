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
    }

    if (loginUser.password === "") {
      errors.password = "PASSWORD IS MISSING!";
      setIsValid(false);
    }

    setFormErrors(errors);
  }

  return { formErrors, validateLogIn, isValid, setIsValid };
}
