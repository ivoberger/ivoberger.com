import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div className="container mx-auto">
      <h1>I'm a H1</h1>
      <h2>I'm a H2</h2>
      <code>I'm a piece of code</code>
      <p>
        <Link href="test">
          <button>Test</button>
        </Link>
      </p>
    </div>
  );
};

export default Index;
