"use client";

import SearchBar from "@/components/search/SearchBar";
import {usePathname} from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <div className="h-24 bg-button w-full">
            {!isHomePage && <SearchBar size="small"/>}
        </div>
    );
}