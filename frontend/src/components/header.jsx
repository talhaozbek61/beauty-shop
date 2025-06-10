import { User, ShoppingBag } from "lucide-react";

import Link from "./ui/link";

import { categories } from "../../../shared/constants/categories";

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

      {/* Categories */}
      <ul className="mx-auto max-w-2xl lg:max-w-7xl flex items-center max-sm:space-x-8 sm:justify-between py-4 overflow-x-scroll mt-4 border-t border-gray-200">
        <li className="shrink-0">
          <Link href={`/?category=all`}>All Products</Link>
        </li>
        {categories.map((category) => (
          <li key={category.name} className="shrink-0">
            <Link href={`/?category=${category.value}`}>{category.name}</Link>
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
    name: "Cart",
    href: "/cart",
    icon: ShoppingBag,
  },
];
