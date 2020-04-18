import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="max-w-xl md:max-w-3xl xl:max-w-4xl mx-auto text-center px-6 py-10 md:py-32 border-b border-green-500">
        <h1>Ivo Berger</h1>
        <h5>
          <Link href="about">
            <button className="text-gray-600 hover:text-gray-800 transition duration-500 border-b border-transparent hover:border-gray-400">
              About Me
            </button>
          </Link>
        </h5>
      </div>
    </header>
  );
};

export default Header;
