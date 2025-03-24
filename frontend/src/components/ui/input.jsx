import { twMerge } from "tailwind-merge";

export default function Input({
  name,
  labelClass,
  placeholder,
  type,
  value,
  className,
  onChange,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className={twMerge("block text-sm/6 font-medium", labelClass)}
      >
        {children}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          min={type === "number" ? 0 : ""}
          className={twMerge(
            "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6",
            className
          )}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
