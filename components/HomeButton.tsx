import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HomeButton = () => (
  <Link href="/">
    <button className="rounded-full transition duration-500 py-2 px-5 bg-gray-100-t border border-gray-100-t group-hover:border-green-500">
      <span className="transition-all duration-500 font-sans text-gray-800 group-hover:text-black">
        <FontAwesomeIcon
          className="transition-all duration-500 group-hover:text-green-500 group-hover:-ml-1 group-hover:mr-1"
          icon={faArrowLeft}
        />{" "}
        Home
      </span>
    </button>
  </Link>
);

export default HomeButton;
