import React from 'react'
import Image from "next/image";
import Link from "next/link";

export default function ArtilceItem() {
    return (
        <article className="itemPost">
            <Link href={"/"}>
                <Image
                    src={"https://picsum.photos/500/300.webp"}
                    width={416}
                    height={300}
                    alt="Image"
                    className="rounded-2xl mb-8 hover:opacity-80 transition-opacity ease-in-out"
                />
            </Link>
            <div className="postMeta flex items-center gap-3 mb-4">
                <span className="text-xs text-gray-500">Mar 16, 2020</span>
                <Link
                    href={"/"}
                    className="bg-gray-100 hover:bg-gray-200 text-gray text-xs font-medium px-3 py-1 rounded-full transition-all ease-in-out"
                >
                    Category
                </Link>
            </div>
            <div className="postBody">
                <h3 className="font-semibold text-lg mb-2">
                    <Link href={"/"} className="hover:text-blue-500 transition-all ease-in-out">
                        Lorem ipsum dolor sit amet.
                    </Link>
                </h3>
                <p className="text-sm line-clamp-3 text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Impedit odio suscipit temporibus earum eaque dignissimos nam
                    explicabo possimus dolor harum eveniet, qui vero enim atque
                    molestiae omnis quia ea iusto.
                </p>
            </div>
        </article>
    )
}
