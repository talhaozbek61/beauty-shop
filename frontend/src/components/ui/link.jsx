import { twMerge } from "tailwind-merge";
import { Link as RouterLink } from "react-router-dom";

export default function Link({ href, className, children }) {
  return (
    <RouterLink
      to={href}
      className={twMerge(
        "hover:text-gray-600 hover:dark:text-gray-400 duration-300 outline-none",
        className
      )}
    >
      {children}
    </RouterLink>
  );
}
