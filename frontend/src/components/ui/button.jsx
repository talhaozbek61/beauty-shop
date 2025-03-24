import { twMerge } from "tailwind-merge";

export default function Button({ children, className, type, onClick }) {
  return (
    <button
      type={type}
      className={twMerge(
        "px-4 py-2.5 rounded-full text-base/5 font-medium hover:scale-95 duration-300 outline-none cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
