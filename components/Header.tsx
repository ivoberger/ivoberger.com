import React, { useCallback } from "react";
import Link from "next/link";

const Header: React.FC<{
  title: string;
  subTitle?: string;
  subTitleLink?: string;
}> = ({ title, subTitle, subTitleLink }) => {
  const SubTitleWrapper: React.FC = useCallback(
    subTitleLink
      ? ({ children }) => (
          <Link href={subTitleLink}>
            <a className="text-gray-600 transition duration-500 border-b border-transparent hover:text-gray-800 hover:border-gray-400">
              {children}
            </a>
          </Link>
        )
      : ({ children }) => <span className="text-gray-800">{children}</span>,
    [subTitleLink]
  );
  return (
    <header className="mb-10">
      <div className="max-w-xl px-6 py-10 mx-auto text-center border-b border-green-500 md:max-w-3xl xl:max-w-4xl md:py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl">{title}</h1>
        <h2>
          <SubTitleWrapper>{subTitle}</SubTitleWrapper>
        </h2>
      </div>
    </header>
  );
};

export default Header;
