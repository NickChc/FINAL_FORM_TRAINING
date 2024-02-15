import { useEffect, useState } from "react";
import { CloseBtnIcon } from "@src/assets/icons/closeBtnIcon";
import { FormInput } from "@src/components/FormInput";
import { TLogInUser, TUserTokens } from "@src/@types/requestTypes";
import { publicAxios } from "@src/utils/publicAxios";
import { useAuthContext } from "@src/Providers/AuthProvider";
import { useValidateLogIn } from ".";

interface LogInFormProps {
  setModal?: (arg: boolean) => void;
}

export function LogInForm({ setModal }: LogInFormProps) {
  const [logInLoading, setLogInLoading] = useState<boolean>(false);

  const [logInValues, setLogInValues] = useState<TLogInUser>({
    email: "",
    password: "",
  });

  const { setAuthData } = useAuthContext();

  const { formErrors, validateLogIn, isValid, setIsValid } = useValidateLogIn();

  function inputChange(e: React.ChangeEvent<HTMLFormElement>) {
    setLogInValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setIsValid(true);
  }

  async function onFinish(values: TLogInUser) {
    try {
      setLogInLoading(true);
      const response = await publicAxios.post("/auth/login", values);
      setAuthData(response.data as TUserTokens);
      if (setModal) setModal(false);
      setLogInValues({
        email: "",
        password: "",
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLogInLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    validateLogIn(logInValues);
    if (!isValid) return;

    console.table(formErrors);

    onFinish(logInValues);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-[90%] md:w-[50%] h-[50dvh] gap-y-6 border-solid border border-black flex flex-col items-center justify-between sm:pt-6 pb-6 lg:pb-14 bg-[grey] relative  "
      onMouseDown={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
    >
      {setModal && (
        <span className="absolute top-1 right-1  ">
          <CloseBtnIcon
            className="text-[1.5rem] cursor-pointer hover:text-[blue] duration-100 "
            onClick={() => setModal(false)}
          />
        </span>
      )}
      <div className="flex w-[80%] h-[75%] lg:h-full flex-col items-center  gap-y-3  sm:gap-y-6 mt-6 sm:mt-9 mb-3 overflow-y-scroll sm:overflow-y-hidden pt-1 ">
        <FormInput
          onFocus={() => (formErrors.email = "")}
          error={formErrors.email}
          label="EMAIL"
          name="email"
          value={logInValues.email}
          onChange={inputChange}
        />
        <FormInput
          isPassword={true}
          onFocus={() => (formErrors.password = "")}
          error={formErrors.password}
          onChange={inputChange}
          label="PASSWORD"
          name="password"
          value={logInValues.password}
        />
      </div>
      <button
        type="submit"
        className="p-[.8rem] text-[.75rem] md:text-[1rem] xl:text-[1.2rem] w-[80%] border-solid border border-[blue] text-[blue] cursor-pointer hover:outline hover:outline-1 hover:outline-[blue] hover:font-semibold  rounded-xl "
        onClick={() => validateLogIn(logInValues)}
      >
        {logInLoading ? "LOGGING IN..." : "LOG IN"}
      </button>
    </form>
  );
}
