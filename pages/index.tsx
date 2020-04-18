import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div>
      <h1>I'm a H1</h1>
      <h2>I'm a H2</h2>
      <Link href="test">
        <a>Test</a>
      </Link>
    </div>
  );
};

export default Index;
