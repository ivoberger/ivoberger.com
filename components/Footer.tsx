import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faStackOverflow,
  faDev,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const NavItem = ({
  text,
  link = `/${text.toLowerCase()}`,
}: {
  text: string;
  link?: string;
}) => (
  <li className="px-2">
    <Link href={link}>
      <a className="transition duration-500 border-b border-transparent hover:border-gray-400 transition-border-color active--exact active">
        {text}
      </a>
    </Link>
  </li>
);

const SocialLink = ({
  title,
  link,
  className = "hover:text-black",
  icon,
}: {
  title: string;
  link: string;
  className?: string;
  icon: IconDefinition;
}) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer"
    className={`transition duration-300 p-3 ${className}`}
  >
    <span className="visible-hidden">{title}</span>
    <FontAwesomeIcon icon={icon} />
  </a>
);

const Footer = () => (
  <footer className="flex flex-wrap justify-between max-w-2xl px-6 py-8 mx-auto text-sm leading-normal text-gray-700 md:max-w-3xl xl:max-w-4xl sm:px-12 sm:pb-10">
    <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
      <p>
        <SocialLink
          title="GitHub"
          link="https://github.com/ivoberger"
          icon={faGithub}
          className="pl-0 hover:text-brand-github"
        />
        <SocialLink
          title="StackOverflow"
          link="https://stackoverflow.com/users/8568922/ivo"
          icon={faStackOverflow}
          className="hover:text-brand-stackOverflow"
        />
        <SocialLink
          title="DEV.to"
          link="https://dev.to/ivoberger"
          icon={faDev}
          className="hover:text-brand-dev"
        />
        <SocialLink
          title="Twitter"
          link="https://twitter.com/__I__V__O__"
          icon={faTwitter}
          className="hover:text-brand-twitter"
        />
        <SocialLink
          title="LinkedIn"
          link="https://www.linkedin.com/in/ivo-berger-00089b15b/"
          icon={faLinkedin}
          className="hover:text-brand-linkedIn"
        />
      </p>
      <p>
        <FontAwesomeIcon icon={faCopyright} className="mt-1 mr-2" />
        2019 - present, Ivo Berger{" "}
      </p>
    </div>
    <div className="w-full sm:w-1/2">
      <ul className="flex -mx-2 sm:justify-end">
        <NavItem text="Home" link="/" />
        <NavItem text="About" />
        <NavItem text="Sitemap" link="/sitemap.xml" />
        {/* <NavItem text="RSS Feed" link="/feed.xml" /> */}
      </ul>
    </div>
  </footer>
);

export default Footer;
