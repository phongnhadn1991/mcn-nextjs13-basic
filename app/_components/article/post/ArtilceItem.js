import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ArtilceItem(props) {
  const { post } = props;
  const { id, title, featuredImage, excerpt, date, slug, categories } = post;
  const cateogryName = categories?.nodes[0]?.name;
  const cateogrySlug = `/blog/${categories?.nodes[0]?.slug}`;
  const urlPost = `/post/${slug}`;
  const thumbnail = featuredImage?.node?.mediaDetails?.sizes[0]?.sourceUrl;
  const thumbnailSrc = featuredImage?.node?.sourceUrl

  return (
    <article className="itemPost">
      <Link href={urlPost} className="flex h-60 mb-8">
        <Image
          src={thumbnailSrc}
          width={400}
          height={400}
          alt="Image"
          className="rounded-2xl hover:opacity-80 transition-opacity ease-in-out"
        />
      </Link>
      <div className="postMeta flex items-center gap-3 mb-4">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <svg
            className="w-3.5 h-3.5 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          {new Date(date).toLocaleDateString()}
        </span>
        <Link
          href={cateogrySlug}
          className="bg-gray-100 hover:bg-gray-200 text-gray text-xs font-medium px-3 py-1 rounded-full transition-all ease-in-out"
        >
          {cateogryName}
        </Link>
      </div>
      <div className="postBody">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          <Link
            href={urlPost}
            className="hover:text-blue-500 transition-all ease-in-out"
          >
            {title}
          </Link>
        </h3>
        <div
          className="text-sm line-clamp-3 text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        ></div>
      </div>
    </article>
  );
}
