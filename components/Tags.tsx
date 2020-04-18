import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

const Tag: React.FC = ({ children }) => (
  <button className="inline-block text-teal-400 hover:text-white hover:bg-teal-400 border border-teal-400 font-sans font-bold text-xs sm:text-sm px-4 py-2 mr-4 mb-2 rounded-full transition duration-300">
    <FontAwesomeIcon className="fa-sm text-gray-700 mr-1" icon={faTag} />
    {children}
  </button>
);

type TagsProps = {
  tagPath?: string;
  tags: string[];
};

const Tags: React.FC<TagsProps> = ({ tagPath = "tag", tags }) => (
  <div className="flex flex-wrap pb-10 sm:pb-16">
    {tags.map((tag) => (
      <Link href={`/${tagPath}/${tag}`}>
        <Tag key={tag}>{tag}</Tag>
      </Link>
    ))}
  </div>
);

export default Tags;
