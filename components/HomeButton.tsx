import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HomeButton = () => (
  <nav className="absolute top-0 left-0 m-4 group">
    <Link href="/">
      <a className="px-5 py-2 transition duration-500 border rounded-full bg-gray-100-t border-gray-100-t group-hover:border-gray-800">
        <span className="font-sans text-gray-700 transition-all duration-500 group-hover:text-black">
          <FontAwesomeIcon
            className="mr-1 transition-all duration-300 group-hover:-ml-1 group-hover:mr-2"
            icon={faArrowLeft}
          />
          Home
        </span>
      </a>
    </Link>
  </nav>
);

export default HomeButton;
