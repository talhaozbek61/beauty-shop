import { useEffect, useState } from "react";

import { MoonStar, Sun } from "lucide-react";

import Link from "./ui/link";
import Button from "./ui/button";

export default function Header() {
  const savedMode = localStorage.getItem("mode") || "light";
  const [mode, setMode] = useState(savedMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const modeToggle = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    // console.log(newMode);

    localStorage.setItem("mode", newMode);
  };

  return (
    <nav className="bg-transparent p-6 lg:p-8 border-b border-gray-200">
      <ul className="mx-auto max-w-2xl lg:max-w-7xl flex items-center justify-between">
        <Link href="/">Beauty Shop</Link>
        <div className="flex item-center gap-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/create">Create</Link>
          </li>
          <Button onClick={modeToggle} className="rounded-none p-0">
            {mode === "light" ? <MoonStar size={18} /> : <Sun size={18} />}
          </Button>
        </div>
      </ul>
    </nav>
  );
}
