"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { baseNavPages, socials } from "../public/data/navdata";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

type NavbarProps = {
  showProjects?: boolean;
  motto?: string;
};

const Navbar = ({ showProjects = false, motto }: NavbarProps) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const overlay = pathname === "/" && !scrolled;
  const pages = baseNavPages.filter(
    (page) => showProjects || page.to !== "/projects",
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-colors duration-300",
        overlay ? "bg-transparent" : "glass-light shadow-sm",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          className={cn(
            "flex items-center gap-2",
            overlay ? "text-white" : "text-foreground",
          )}
          href="/"
        >
          <Image src="/icons/logo.png" alt="Visual 24" width={28} height={28} />
          <span className="text-lg font-semibold tracking-tight max-sm:hidden">
            Visual 24
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/contact"
            className={cn(
              "hidden text-xs font-semibold tracking-[0.22em] uppercase sm:inline",
              overlay
                ? "text-white/90 hover:text-white"
                : "text-foreground/80 hover:text-foreground",
            )}
          >
            Inquire
          </Link>
          <Link
            href="/admissions"
            className={cn(
              "hidden text-xs font-semibold tracking-[0.22em] uppercase sm:inline",
              overlay
                ? "text-white/90 hover:text-white"
                : "text-foreground/80 hover:text-foreground",
            )}
          >
            Visit
          </Link>
          <Link
            href="/courses"
            className={cn(
              "hidden text-xs font-semibold tracking-[0.22em] uppercase md:inline",
              overlay
                ? "text-white/90 hover:text-white"
                : "text-foreground/80 hover:text-foreground",
            )}
          >
            Courses
          </Link>

          <Sheet>
            <SheetTrigger
              className={cn(
                "inline-flex items-center gap-2 px-2 py-1 text-xs font-semibold tracking-[0.22em] uppercase",
                overlay ? "text-white" : "text-foreground",
              )}
            >
              Menu
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l-0 bg-dark-100 text-white sm:max-w-md"
            >
              <SheetHeader className="px-6 pt-8">
                <SheetTitle className="text-white">Visual 24</SheetTitle>
                <SheetDescription className="text-white/60">
                  {motto || "Your Talent, Our Training"}
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-6 pt-6">
                <Link
                  href="/"
                  className="py-3 text-3xl font-semibold tracking-tight hover:text-primary"
                >
                  Home
                </Link>
                {pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.to}
                    className="py-3 text-3xl font-semibold tracking-tight hover:text-primary"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
              <div className="mt-auto px-6 pb-8">
                <Separator className="mb-6 bg-white/15" />
                <div className="flex gap-3">
                  <Link
                    href="/contact"
                    className={buttonVariants({
                      className: "h-11 flex-1 px-5",
                    })}
                  >
                    Inquire
                  </Link>
                  <Link
                    href="/admissions"
                    className={buttonVariants({
                      variant: "outline",
                      className:
                        "h-11 flex-1 border-white/30 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white",
                    })}
                  >
                    Apply
                  </Link>
                </div>
                <div className="mt-6 flex gap-4">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={social.name}
                        href={social.to}
                        target={social.target}
                        rel={social.rel}
                        className="text-white/70 hover:text-primary"
                        aria-label={social.name}
                      >
                        <Icon className="size-5" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
