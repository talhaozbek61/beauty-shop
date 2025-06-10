import { twMerge } from "tailwind-merge";
import { Link as RouterLink } from "react-router-dom";

export default function Link({ href, className, children }) {
  return (
    <RouterLink
      to={href}
      className={twMerge(
        "text-sm tracking-wide font-medium text-gray-900 dark:text-foreground dark:hover:text-gray-200 hover:text-primary duration-300 outline-none",
        className
      )}
    >
      {children}
    </RouterLink>
  );
}
