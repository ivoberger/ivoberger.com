import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HomeButton: React.FC = () => (
  <nav className="fixed top-0 left-0 m-4 group">
    <Link href="/">
      <a className="px-5 py-2 transition border rounded-full bg-gray-100-t border-gray-100-t group-hover:border-gray-800 dark:bg-black dark:group-hover:border-gray-600">
        <span className="font-sans text-gray-700 transition group-hover:text-black dark:text-gray-400 dark:group-hover:text-gray-100">
          <FontAwesomeIcon className="mr-1" icon={faArrowLeft} />
          Home
        </span>
      </a>
    </Link>
  </nav>
);

export default HomeButton;
