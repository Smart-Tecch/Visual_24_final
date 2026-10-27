"use client";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="absolute top-5 left-5">
        <button
          type="button"
          id="explore-btn"
          className=" hover:cursor-pointer"
          onClick={() => console.log("Clicked")}
        >
          <Link href={`/`}>Go back home</Link>
        </button>
      </div>
      <div>
        <div className="flex items-center justify-center gap-3 mb-7 ">
          <Image src="/icons/logo.png" alt="logo" width={50} height={50} />
          <p className="text-4xl text-blue-500">Visual 24</p>
        </div>
        <h1 className="text-center text-destructive">404 Not Found</h1>
        <p className="text-center mt-3">
          Sorry The page {`You're `}looking for does not exist.{" "}
          <span className="text-blue-600 underline underline-offset-2">
            Press
          </span>{" "}
          the button to go back to home
        </p>
      </div>
    </div>
  );
};

export default NotFound;
