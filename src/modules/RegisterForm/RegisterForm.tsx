import { useState } from "react";
import { TUserData, TUserTokens } from "@src/@types/requestTypes";
import { FormInput } from "@src/components/FormInput";
import { spacelessNumber } from "@src/utils/spacelessNumber";
import { spaceReplace } from "@src/utils/spaceReplace";
import { CloseBtnIcon } from "@src/assets/icons/closeBtnIcon";
import { useAuthContext } from "@src/Providers/AuthProvider";
import { publicAxios } from "@src/utils/publicAxios";

interface RegisterFormProps {
  setModal?: (arg: boolean) => void;
}

export function RegisterForm({ setModal }: RegisterFormProps) {
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const [registerValues, setRegisterValues] = useState<TUserData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    "repeat-password": "",
  });

  const { setAuthData } = useAuthContext();

  function inputChange(e: React.ChangeEvent<HTMLFormElement>) {
    spacelessNumber(e.target.value);

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
      const response = await publicAxios.post("/auth/register", values);
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
      console.log(error.message);
    } finally {
      setAuthLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onFinish(registerValues);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-[90%] md:w-[70%] h-[90dvh] gap-y-6 border-solid border border-black flex flex-col items-center justify-between sm:pt-6 pb-6 lg:pb-14 bg-[grey] relative "
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
      <div className="flex w-[80%] h-[75%] lg:h-full flex-col items-center justify-between gap-y-3  sm:gap-y-6 mt-6 sm:mt-9 mb-3 overflow-y-scroll sm:overflow-y-hidden">
        <FormInput
          name="first_name"
          value={registerValues.first_name}
          onChange={inputChange}
          label="NAME"
        />

        <FormInput
          name="last_name"
          value={registerValues.last_name}
          onChange={inputChange}
          label="SURNAME"
        />

        <FormInput
          name="email"
          value={registerValues.email}
          onChange={inputChange}
          label="EMAIL"
        />

        <FormInput
          name="phone_number"
          value={registerValues.phone_number}
          onChange={inputChange}
          label="PHONE NUMBER"
        />

        <FormInput
          isPassword={true}
          name="password"
          value={registerValues.password}
          onChange={inputChange}
          label="PASSWORD"
        />

        <FormInput
          isPassword={true}
          name="repeat-password"
          value={registerValues["repeat-password"]}
          onChange={inputChange}
          label="REPEAT PASSWORD"
        />
      </div>
      <button className="p-[.8rem] text-[.75rem] md:text-[1rem] xl:text-[1.2rem] w-[80%] border-solid border border-[blue] text-[blue] cursor-pointer hover:outline hover:outline-1 hover:outline-[blue] hover:font-semibold  rounded-xl ">
        {authLoading ? "LOADING..." : "REGISTER"}
      </button>
    </form>
  );
}
