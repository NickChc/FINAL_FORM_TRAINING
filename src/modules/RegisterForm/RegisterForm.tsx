import { useState } from "react";
import { TUserData, TUserTokens } from "@src/@types/requestTypes";
import { FormInput } from "@src/components/FormInput";
import { spacelessNumber } from "@src/utils/spacelessNumber";
import { spaceReplace } from "@src/utils/spaceReplace";
import { CloseBtnIcon } from "@src/assets/icons/closeBtnIcon";
import { useAuthContext } from "@src/Providers/AuthProvider";
import { publicAxios } from "@src/utils/publicAxios";
import { useValidateRegister } from "./useValidateRegister";

interface RegisterFormProps {
  setModal?: (arg: boolean) => void;
}

export function RegisterForm({ setModal }: RegisterFormProps) {
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [requestFail, setRequestFail] = useState<string>("");

  const [registerValues, setRegisterValues] = useState<TUserData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    "repeat-password": "",
  });

  const { setAuthData } = useAuthContext();

  const { validateRegister, isValid, setIsValid, formErrors } =
    useValidateRegister();

  function inputChange(e: React.ChangeEvent<HTMLFormElement>) {
    spacelessNumber(e.target.value);
    setIsValid(true);
    console.log("CHANGED");

    setRegisterValues((prev) => {
      if (
        e.target.name === "phone_number" &&
        spaceReplace(e.target.value).length <= 9 &&
        spacelessNumber(e.target.value)
      ) {
        return { ...prev, [e.target.name]: e.target.value };
      } else if (e.target.name !== "phone_number") {
        return { ...prev, [e.target.name]: e.target.value };
      } else {
        return { ...prev };
      }
    });
  }

  async function onFinish(values: TUserData) {
    try {
      setAuthLoading(true);
      const response = await publicAxios.post("/auth/register", {
        ...values,
        phone_number: spaceReplace(values.phone_number),
      });
      console.log(response);
      setAuthData(response.data as TUserTokens);
      if (setModal) setModal(false);
      setRegisterValues({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        "repeat-password": "",
      });
    } catch (error: any) {
      console.log(error);
      if (
        error.response.data.message ===
        'duplicate key value violates unique constraint "UQ_17d1817f241f10a3dbafb169fd2"'
      ) {
        setRequestFail("THE EMAIL OR PHONE NUMBER IS ALREADY USED!");
      } else {
        setRequestFail("");
      }
    } finally {
      setAuthLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValid) return;

    onFinish(registerValues);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full md:w-[70%] h-dvh sm:h-[90dvh] gap-y-4 border-solid border border-black flex flex-col items-center justify-between sm:pt-3 pb-3 lg:pb-14 bg-[grey] relative "
      onMouseDown={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
    >
      {setModal && (
        <span className="absolute top-1 right-1 ">
          <CloseBtnIcon
            className="text-[1.5rem] cursor-pointer hover:text-[blue] duration-100 "
            onClick={() => setModal(false)}
          />
        </span>
      )}
      <div className="flex w-[80%] h-full flex-col items-center justify-between gap-y-[1dvh]  sm:gap-y-6 mt-3 pt-1 mb-[3dvh] overflow-y-scroll sm:overflow-y-hidden">
        <h2 className="text-[1rem] md:text-[1.4rem] xl:text-[1.75rem] text-slate-600 text-center ">
          REGISTER FOR REACT SHOP
        </h2>

        <FormInput
          onFocus={() => (formErrors.first_name = "")}
          error={formErrors.first_name}
          name="first_name"
          value={registerValues.first_name}
          onChange={inputChange}
          label="NAME"
        />

        <FormInput
          onFocus={() => (formErrors.last_name = "")}
          error={formErrors.last_name}
          name="last_name"
          value={registerValues.last_name}
          onChange={inputChange}
          label="SURNAME"
        />

        <FormInput
          onFocus={() => (formErrors.email = "")}
          error={formErrors.email}
          name="email"
          value={registerValues.email}
          onChange={inputChange}
          label="EMAIL"
        />

        <FormInput
          onFocus={() => (formErrors.phone_number = "")}
          error={formErrors.phone_number}
          name="phone_number"
          value={registerValues.phone_number}
          onChange={inputChange}
          label="PHONE NUMBER"
        />

        <FormInput
          onFocus={() => (formErrors.password = "")}
          error={formErrors.password}
          isPassword={true}
          name="password"
          value={registerValues.password}
          onChange={inputChange}
          label="PASSWORD"
        />

        <FormInput
          onFocus={() => (formErrors["repeat-password"] = "")}
          error={formErrors["repeat-password"]}
          isPassword={true}
          name="repeat-password"
          value={registerValues["repeat-password"]}
          onChange={inputChange}
          label="REPEAT PASSWORD"
        />
      </div>
      <span className="w-full flex justify-center relative">
        {requestFail !== "" && (
          <span className="mx-3 border border-solid border-[blue] min-h-[4rem] rounded-md absolute top-[-200%] bg-slate-500 p-2 flex flex-col items-center justify-center pop-up ">
            <CloseBtnIcon
              className="absolute top-[-18%] right-[-2.5%] text-[1.2rem] gradient-slate500-grey cursor-pointer "
              onClick={() => setRequestFail("")}
            />
            <h2 className="text-red-700 text-[1rem] text-center ">
              {requestFail}
            </h2>
          </span>
        )}
        <button
          type="submit"
          className="p-[.8rem] text-[.7rem] md:text-[1rem] xl:text-[1.2rem] w-[80%] border-solid border border-[blue] text-[blue] cursor-pointer hover:outline hover:outline-1 hover:outline-[blue] hover:font-semibold  rounded-xl "
          onClick={() => validateRegister(registerValues)}
        >
          {authLoading ? "LOADING..." : "REGISTER"}
        </button>
      </span>
    </form>
  );
}
