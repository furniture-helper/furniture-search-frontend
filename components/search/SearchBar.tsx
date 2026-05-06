"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import SearchBarLarge from "@/components/search/SearchBarLarge";
import SearchBarSmall from "@/components/search/SearchBarSmall";

type Props = {
    size: "small" | "large";
}

export default function SearchBar(props: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    function handleSearch() {
        const query = searchQuery.trim();
        if (!query) return;
        router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    return (
        <div className="h-full flex flex-row items-center justify-center w-full">
            <div className="flex flex-row h-16 items-center justify-center w-full">
                {props.size === "small" && (
                    <SearchBarSmall searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleEnter={handleEnter}
                                    handleSearch={handleSearch}/>
                )}
                {props.size === "large" && (
                    <SearchBarLarge searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleEnter={handleEnter}
                                    handleSearch={handleSearch}/>
                )}
            </div>

        </div>
    );
}
