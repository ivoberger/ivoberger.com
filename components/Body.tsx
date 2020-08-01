import React from "react";
import { NextPage } from "next";

const Body: React.FC<{ className?: string }> = ({ children, className }) => (
  <main
    className={`max-w-2xl px-6 pt-16 pb-10 mx-auto mb-16 md:max-w-3xl xl:max-w-4xl sm:px-12 ${className}`}
  >
    {children}
  </main>
);

export default Body;
