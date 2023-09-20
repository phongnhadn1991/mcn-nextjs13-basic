'use client'
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Header() {
    const routerPath = usePathname();

    return (
        <div className="c-header shadow">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="logo">
                    <Link className="flex items-center" href={"/"}>
                        <Image
                            src={
                                "/next.svg"
                            }
                            width={130}
                            height={20}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="listMenu">
                    <ul className="font-medium flex flex-row gap-16">
                        <li className={routerPath === "/" ? 'text-blue-500' : ''}>
                            <Link href={"/"}>
                                Home Page
                            </Link>
                        </li>
                        <li className={routerPath === "/about" ? 'text-blue-500' : ''}>
                            <Link href={"/about"}>About</Link>
                        </li>
                        <li className={routerPath === "/project" ? 'text-blue-500' : ''}>
                            <Link href={"/project"}>Projects</Link>
                        </li>
                        <li className={routerPath === "/blog" ? 'text-blue-500' : ''}>
                            <Link href={"/blog"}>Blog</Link>
                        </li>
                        <li className={routerPath === "/contact" ? 'text-blue-500' : ''}>
                            <Link href={"/contact"}>Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="btnAction">
                    <button type="button" className="cursor-pointer py-3 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md shadow focus:outline-none">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
