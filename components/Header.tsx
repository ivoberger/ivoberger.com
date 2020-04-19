import React from "react";
import Link from "next/link";

const Header = () => (
  <header>
    <div className="max-w-xl px-6 py-10 mx-auto text-center border-b border-green-500 md:max-w-3xl xl:max-w-4xl md:py-32">
      <h1 className="text-4xl sm:text-5xl md:text-6xl">Ivo Berger</h1>
      <h5>
        <Link href="about">
          <a className="text-gray-600 transition duration-500 border-b border-transparent hover:text-gray-800 hover:border-gray-400">
            About Me
          </a>
        </Link>
      </h5>
    </div>
  </header>
);

export default Header;
