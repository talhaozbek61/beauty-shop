import { twMerge } from "tailwind-merge";

export default function Container({ className, padding, children }) {
  return (
    <div className={twMerge("p-6 lg:p-8", padding)}>
      <div className={twMerge("mx-auto max-w-2xl lg:max-w-7xl", className)}>
        {children}
      </div>
    </div>
  );
}
