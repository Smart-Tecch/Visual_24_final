import Link from "next/link";
import Image from "next/image";
import { schoolData } from "@/lib/school-data";
import { siteImages } from "@/lib/site-content";

/** Static shell while nav settings load — avoids client hooks during prerender. */
export default function NavbarFallback() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 glass-light shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link className="flex items-center gap-2 text-foreground" href="/">
          <span className="flex size-9 items-center justify-center rounded-lg bg-white ring-1 ring-border">
            <Image
              src={siteImages.logo}
              alt="Visual 24 Technical Institute logo"
              width={28}
              height={28}
              className="size-7 object-contain"
            />
          </span>
          <span className="text-lg font-semibold tracking-tight max-sm:hidden">
            Visual 24
          </span>
        </Link>
        <span className="text-xs font-semibold tracking-[0.22em] uppercase text-foreground/70">
          {schoolData.school.motto}
        </span>
      </nav>
    </header>
  );
}
