"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

const pages = [
  { name: "Home", to: "/" },
  { name: "About Us", to: "/about" },
  { name: "Courses", to: "/courses" },
  { name: "Projects", to: "/projects" },
  { name: "Contact Us", to: "/contact" },
];

const socials = [
  {
    name: "Tiktok",
    icon: FaTiktok,
    to: "https://www.tiktok.com/@visual.techinical24?is_from_webapp=1&sender_device=pc",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "Youtube",
    icon: FaYoutube,
    to: "https://youtube.com/@pixelmanagement-z1h?si=-Vx80ZqeChYrlxAm",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    to: "https://www.tiktok.com/@smarttechug29?is_from_webapp=1&sender_device=pc",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <header>
      <nav>
        {/* Logo */}
        <Link className="hover:text-blue logo" href={`/`}>
          <Image src={`/icons/logo.png`} alt="logo" width={24} height={24} />
          <p>Visual 24</p>
        </Link>

        {/* Desktop Links (Hidden on small screens, shown on large screens) */}
        <ul className="max-lg:hidden">
          {pages.map((page) => (
            <Link
              key={page.name}
              className="hover:text-blue hover:underline underline-offset-4"
              href={page.to}
            >
              {page.name}
            </Link>
          ))}
        </ul>

        {/* Mobile Hamburger / Toggle Button */}
        <button
          onClick={() => setIsActive(!isActive)}
          className={`lg:hidden p-2 text-foreground cursor-pointer z-50 ${isActive ? `hidden` : ``}`}
          aria-label="Toggle Menu"
        >
          <Menu className="size-12 border border-primary p-2 rounded-[5px]" />
        </button>

        {/* Mobile Slide-out Sidebar (Controlled by isActive state) */}
        <aside
          className={`absolute top-0 right-0 w-72 min-h-screen bg-dark-100 border-l border-border-dark flex flex-col p-6 transition-transform duration-300 lg:hidden z-40 overflow-hidden ${
            isActive ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Hamburger / Toggle Button */}
          <button
            onClick={() => setIsActive(!isActive)}
            className="lg:hidden p-2 text-foreground cursor-pointer z-50 border-b border-blue"
            aria-label="Toggle Menu"
          >
            <X className="size-12 border border-primary p-2 rounded-[5px]" />
          </button>

          <section className="flex flex-col gap-6 mt-5">
            {pages.map((page) => (
              <Link
                key={page.name}
                onClick={() => setIsActive(false)}
                className="hover:text-blue text-lg font-medium"
                href={page.to}
              >
                {page.name}
              </Link>
            ))}
          </section>

          <section className="absolute bottom-0 left-0 right-0 h-[30%] flex flex-col p-6">
            <div className="socials flex flex-col">
              <p className="paragraph mb-3 tracking-widest">Find Us </p>
              <div className="flex items-center gap-3">
                {socials.map((social) => {
                  const IconComponent = social.icon;

                  return (
                    <span key={social.name}>
                      <Link
                        href={social.to}
                        target={social.target}
                        rel={social.rel}
                      >
                        {IconComponent === FaTiktok ? (
                          <IconComponent className="social-icon text-black" />
                        ) : IconComponent === FaYoutube ? (
                          <IconComponent className="social-icon text-red-600" />
                        ) : (
                          <IconComponent className="social-icon text-pink-700" />
                        )}
                      </Link>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="contacts mt-3">
              <p className="paragraph mb-3 tracking-widest">Contacts</p>
            </div>
          </section>
        </aside>
      </nav>
    </header>
  );
};

export default Navbar;
