import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div className="bg-blue-700">
      hello
      <Link href="test">
        <a>Test</a>
      </Link>
    </div>
  );
};

export default Index;
