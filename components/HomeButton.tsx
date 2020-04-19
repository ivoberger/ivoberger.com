import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HomeButton = () => (
  <Link href="/">
    <a className="px-5 py-2 transition duration-500 border rounded-full bg-gray-100-t border-gray-100-t group-hover:border-gray-800">
      <span className="font-sans text-gray-700 transition-all duration-500 group-hover:text-black">
        <FontAwesomeIcon
          className="transition-all duration-500 group-hover:-ml-1 group-hover:mr-1"
          icon={faArrowLeft}
        />{" "}
        Home
      </span>
    </a>
  </Link>
);

export default HomeButton;
