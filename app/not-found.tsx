import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteImages } from "@/lib/site-content";

const NotFound = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-5">
      <div className="max-w-md text-center">
        <div className="mb-7 flex items-center justify-center gap-3">
          <Image
            src={siteImages.logo}
            alt="Visual 24 Technical Institute logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <p className="text-2xl font-semibold">Visual 24</p>
        </div>
        <p className="kicker text-muted-foreground">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className={buttonVariants({ className: "mt-8 h-11 px-6" })}
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
