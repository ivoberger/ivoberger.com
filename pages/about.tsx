import React from "react";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { Header, Body, HomeButton } from "components";

type PortfolioEntryData = {
  title: string;
  url?: string;
  repoUrl?: string;
  imageUrl?: string;
  description: string;
};

const portfolioEntries: PortfolioEntryData[] = [
  {
    title: "This Website",
    url: "https://ivoberger.com",
    repoUrl: "https://github.com/ivoberger/ivoberger.com",
    description: `The page you're looking at is made with NextJS, TypeScript and TailwindCSS and deployed on Vercel.
      It's entirely static through the NextJS SSG feature. Posts are written in Markdown and converted to nice-looking HTML at build-time.
      Yes, I could have just used Gatsby instead of doing it all myself but I wanted to try NextJS, so here we are.`,
  },
  {
    title: "timberSentry",
    url: "https://jitpack.io/#com.ivoberger/timberSentry",
    repoUrl: "https://github.com/ivoberger/timberSentry",
    description: `During my time developing native Android apps I found myself building the same setup with Timber and Sentry
    to implement seamless error reporting with contextual logging every time so I built a library to do it.
    It's written in pure Kotlin and simply exposes a SentryTree that can be used with Timber and will automagically
    log everything to Sentry. It is distributed using JitPack.`,
  },
  {
    title: "StatikGMapsAPI",
    url: "https://jitpack.io/#com.ivoberger/StatikGMapsAPI",
    repoUrl: "https://github.com/ivoberger/StatikGMapsAPI",
    description: `The Metsään Tie app needed to display a lot of static maps in a list and simply using the lite mode of
    the native GMaps View didn't work. The solution was to use the Google Maps Static API, which simply returns picture of a map
    base on the URL parameters given.
    Writing these requests by hand is error-prone so I wrote a library that let's you build API requests in a type-safe manner and
    runs some validation before returning a URL so you can be (reasonably) sure to get a valid request.
    The URL can then simply be plugged into an image loading library like Glide or Coil.
    Every commit to master triggers a build & test pipeline on GitHub Actions.`,
  },
  {
    title: "Metsään Tie",
    url: "https://play.google.com/store/apps/details?id=com.roadsml.metsatie",
    description: `Metsään Tie is an app developed by RoadsML for the Finnish Forest Center to track road conditions using
    phone sensors and user feedback. It allows the user to record their driving through GPS for location and the accelerometer
    for road condition. It can then be uploaded to a backend and viewed on a openly accessible map by the Finnish Forest Center.`,
  },
];

const About = () => (
  <>
    <Header title="Stuff I Made" subTitle="You could call it a Portfolio" />

    <HomeButton
      title="Stuff I Made"
      description="A List of projects I have worked on"
    />
    <Body>{portfolioEntries.map(PortfolioEntry)}</Body>
  </>
);

const PortfolioEntry: React.FC<PortfolioEntryData> = ({
  title,
  description,
  url,
  repoUrl,
}) => (
  <div className="mb-10">
    <h5>
      {title}{" "}
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className={`transition duration-300 text-gray-700 px-2 hover:text-brand-github`}
        >
          <FontAwesomeIcon className="text-xl" icon={faGithub} />
        </a>
      )}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={`transition duration-300 text-gray-700 px-2 hover:text-gray-900`}
        >
          <FontAwesomeIcon className="text-xl" icon={faLink} />
        </a>
      )}
    </h5>
    <p>{description}</p>
  </div>
);

export default About;
