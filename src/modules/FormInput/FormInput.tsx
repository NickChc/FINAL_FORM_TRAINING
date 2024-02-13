interface FormInputProps {
  value: string;
  name: string;
  onChange: (e: any) => void;
  onFocus?: (e: any) => void;
  label?: string;
  error?: string;
}

export function FormInput({
  value,
  onChange,
  onFocus,
  label,
  name,
  error,
}: FormInputProps) {
  return (
    <label className="flex flex-col items-center gap-y-[.5rem] ">
      <input
        autoComplete="off"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className={`p-[.8rem] outline-1 focus:outline-2 outline-[blue] text-[1rem] xl:text-[1.2rem] border-solid border border-[blue] rounded-xl `}
      />
      <p>{label}</p>
    </label>
  );
}
