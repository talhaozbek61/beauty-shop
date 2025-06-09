import { twMerge } from "tailwind-merge";

import { ChevronDownIcon } from "lucide-react";

export default function SelectMenu({
  name,
  labelClass,
  values,
  defaultValue,
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
      <div className="mt-2 grid grid-cols-1">
        <select
          id={name}
          name={name}
          value={defaultValue ?? ""}
          className={twMerge(
            "col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6",
            className
          )}
          onChange={onChange}
        >
          <option value="" hidden>
            Select {children}
          </option>
          {values.map((value, vIdx) => (
            <option key={vIdx} value={value.value}>
              {value.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </div>
    </div>
  );
}
