import { useState } from "react";
import { TUserData } from "@src/@types/requestTypes";
import { FormInput } from "@src/modules/FormInput";
import { spacelessNumber } from "@src/utils/spacelessNumber";
import { spaceReplace } from "@src/utils/spaceReplace";

export function RegisterForm() {
  const [registerValues, setRegisterValues] = useState<TUserData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    "repeat-password": "",
  });

  function inputChange(e: React.ChangeEvent<HTMLFormElement>) {
    console.log(spacelessNumber(e.target.value));

    setRegisterValues((prev) => {
      if (
        e.target.name === "phone_number" &&
        spaceReplace(e.target.value).length <= 9 &&

        
        spacelessNumber(e.target.value)
      ) {
        return { ...prev, [e.target.name]: e.target.value };
      } else {
        return { ...prev };
      }
    });
  }

  // ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   })

  function onFinish(values: TUserData) {
    console.log(values);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onFinish(registerValues);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-[90%] md:w-[50%] h-dvh sm:h-[90dvh] bg-white border-solid border border-black flex flex-col items-center justify-between sm:pt-6 pb-6 md:pb-20 "
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
    >
      <div className="flex flex-col items-center gap-y-2 sm:gap-y-6 mt-3 sm:mt-9 overflow-y-scroll sm:overflow-y-hidden">
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
          name="password"
          value={registerValues.password}
          onChange={inputChange}
          label="PASSWORD"
        />

        <FormInput
          name="repeat-password"
          value={registerValues["repeat-password"]}
          onChange={inputChange}
          label="REPEAT PASSWORD"
        />
      </div>
      <button className="p-[.5rem] w-[80%] border-solid border border-[blue] text-[blue] cursor-pointer hover:outline hover:outline-1 hover:outline-[blue] hover:font-semibold  rounded-xl ">
        REGISTER
      </button>
    </form>
  );
}
