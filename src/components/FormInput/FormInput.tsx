import { useState } from "react";
import { OpenEyeIcon, ClosedEyeIcon } from "@src/assets/icons/eyeIcon";

interface FormInputProps {
  value: string;
  name: string;
  onChange: (e: any) => void;
  onFocus?: (e: any) => void;
  label?: string;
  error?: string;
  type?: string;
  isPassword?: boolean;
}

export function FormInput({
  value,
  onChange,
  onFocus,
  label,
  name,
  isPassword,
  error,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <label className="flex flex-col items-center gap-y-[.5rem] select-none text-[.9rem] md:text-[1rem] lg:text-[1.1rem]  ">
      <span className="relative w-full flex flex-col items-stretch">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : "text"}
          autoComplete="off"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className={`p-[.6rem] outline-1 focus:outline-2 outline-[blue] text-[.8rem] sm:text-[1rem] lg:text-[1.4rem] border-solid border border-[blue] rounded-xl `}
        />
        {isPassword && (
          <span
            className="absolute top-[50%] translate-y-[-50%] right-3 cursor-pointer text-[1rem] lg:text-[1.5rem] flex items-center justify-center"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <ClosedEyeIcon /> : <OpenEyeIcon />}
          </span>
        )}
      </span>
      <p>{label}</p>
    </label>
  );
}
