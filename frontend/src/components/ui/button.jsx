import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className,
  type,
  disabled,
  onClick,
}) {
  return (
    <button
      type={type}
      className={twMerge(
        "px-4 py-2.5 rounded-full text-base/5 font-medium duration-300 outline-none",
        disabled
          ? "hover:scale-none bg-gray-50 cursor-not-allowed"
          : "hover:scale-95 cursor-pointer",
        className
      )}
      disabled={disabled ?? false}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
