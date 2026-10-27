import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link className="hover:text-blue logo" href={`/`}>
          <Image src={`/icons/logo.png`} alt="logo" width={24} height={24} />
          <p>Visual 24</p>
        </Link>

        <ul>
          <Link
            className="hover:text-blue hover:underline underline-offset-4"
            href={`/`}
          >
            Home
          </Link>
          <Link
            className="hover:text-blue hover:underline underline-offset-4"
            href={`/about`}
          >
            About Us
          </Link>
          <Link
            className="hover:text-blue hover:underline underline-offset-4"
            href={`/courses`}
          >
            Courses
          </Link>
          <Link
            className="hover:text-blue hover:underline underline-offset-4"
            href={`/projects`}
          >
            Projects
          </Link>
          <Link
            className="hover:text-blue hover:underline underline-offset-4"
            href={`/admission`}
          >
            Admissions
          </Link>
          <Link
            className="hover:text-blue hover:underline underline-offset-4"
            href={`/contact`}
          >
            Contact
          </Link>
          <Link
            className="hover:text-blue hover:underline underline-offset-4"
            href={`/blog`}
          >
            Blog
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
