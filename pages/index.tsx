import React from "react";
import Link from "next/link";
import { Header } from "../components";

const Index = () => {
  return (
    <main className="container mx-auto">
      <Header />
      <h1>I'm a H1</h1>
      <h2>I'm a H2</h2>
      <code>I'm a piece of code</code>
      <p>
        <Link href="test">
          <button>Test</button>
        </Link>
      </p>
    </main>
  );
};

export default Index;
