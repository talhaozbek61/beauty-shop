export default function Modal({ isOpen, setIsOpen, children }) {
  return (
    <>
      <div
        className={
          isOpen
            ? "fixed top-0 w-screen min-h-screen inset-0 bg-gray-900 opacity-10 z-10"
            : "hidden"
        }
        onClick={() => setIsOpen(false)}
      />

      <div
        className={
          isOpen
            ? "lg:max-w-lg md:w-1/2 w-3/4 min-h-min space-y-6 p-6 z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-foreground dark:ring-2 dark:ring-foreground rounded-md"
            : "hidden"
        }
      >
        {children}
      </div>
    </>
  );
}
