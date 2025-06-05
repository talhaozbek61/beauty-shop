import { User, Heart, ShoppingBag, Search } from "lucide-react";

import Link from "./ui/link";

export default function Header() {
  return (
    <nav className="bg-transparent pt-6 pb-4 px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-7xl flex items-center justify-between">
        {/* Icon */}
        <Link
          href="/"
          className="text-primary tracking-wide font-medium text-2xl flex flex-col group"
        >
          beauty
          <span className="text-xs ml-auto translate-x-6 bg-primary text-foreground py-0.5 px-1.5 rounded-full group-hover:translate-x-8 duration-300">
            shop
          </span>
        </Link>

        {/* Search */}
        <div className="max-lg:hidden flex items-center rounded-md bg-gray-50/50 pl-3 outline-none ring-1 ring-gray-200 focus:ring-primary focus-within:ring-primary">
          <Search className="size-4 stroke-primary" />
          <input
            type="text"
            name="search"
            id="search"
            className="block min-w-96 grow py-1.5 pr-3 pl-1 text-base text-gray-700 placeholder:text-primary focus-within:placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            placeholder="Find beauty"
            required=""
          />
        </div>

        {/* Page Links */}
        <ul className="flex item-center md:gap-8 gap-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="flex items-center gap-1">
                <link.icon className="size-4" />
                <span className="max-md:hidden">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden mx-auto max-w-2xl flex items-center rounded-md bg-gray-50/50 pl-3 outline-none ring-1 ring-gray-200 focus:ring-primary focus-within:ring-primary mt-4">
        <Search className="size-4 stroke-primary" />
        <input
          type="text"
          name="search"
          id="mobile-search"
          className="block grow py-1.5 pr-3 pl-1 text-base text-gray-700 placeholder:text-primary focus-within:placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          placeholder="Find beauty"
          required=""
        />
      </div>

      {/* Categories */}
      <ul className="mx-auto max-w-2xl lg:max-w-7xl flex items-center max-lg:space-x-8 lg:justify-between py-4 overflow-x-scroll mt-4 border-t border-gray-200">
        {categories.map((category) => (
          <li key={category.name} className="shrink-0">
            <Link href={category.href}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const links = [
  {
    name: "My Account",
    href: "/account",
    icon: User,
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: Heart,
  },
  {
    name: "Cart",
    href: "/cart",
    icon: ShoppingBag,
  },
];

const categories = [
  {
    name: "Face",
    href: "/account",
  },
  {
    name: "Eye",
    href: "/favorites",
  },
  {
    name: "Lips",
    href: "/cart",
  },
  {
    name: "Nails",
    href: "/cart",
  },
  {
    name: "Skin Care",
    href: "/cart",
  },
  {
    name: "Accessories",
    href: "/cart",
  },
  {
    name: "Vegan",
    href: "/cart",
  },
];
