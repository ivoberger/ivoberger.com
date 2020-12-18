import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

const Tag = React.forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<{ href?: string }>
>(({ children, href }, ref) => (
  <a
    ref={ref}
    href={href}
    className="inline-block px-4 py-2 mb-2 mr-4 font-sans text-xs font-bold text-teal-400 transition  border border-teal-400 rounded-full hover:text-white hover:bg-teal-400 sm:text-sm"
  >
    <FontAwesomeIcon className="mr-1 text-gray-700 fa-sm" icon={faTag} />
    {children}
  </a>
));

type TagsProps = {
  tagPath?: string;
  tags: string[];
};

const Tags: React.FC<TagsProps> = ({ tags }) => (
  <div className="flex flex-wrap pb-10 sm:pb-16">
    {tags.map((tag) => (
      <Link key={`link_${tag}`} href="/tag/[tag]" as={`/tag/${tag}`} passHref>
        <Tag key={`tag_${tag}`}>{tag}</Tag>
      </Link>
    ))}
  </div>
);

export default Tags;
