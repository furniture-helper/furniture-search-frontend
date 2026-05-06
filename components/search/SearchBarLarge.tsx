import {Input} from "../ui/input";
import {Button} from "@/components/ui/button";
import React from "react";

type Props = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
}

export default function SearchBarLarge(props: Props) {
    return (
        <>
            <Input
                className={"md:text-2xl font-bold h-full max-w-150 m-5 rounded-full bg-input transition-all duration-200 focus:outline-none px-5"}
                placeholder="Search..."
                value={props.searchQuery}
                onChange={(e) => props.setSearchQuery(e.target.value)}
                onKeyUp={props.handleEnter}
            />

            <Button
                className={"text-xl font-bold h-full max-w-200 px-10 rounded-full bg-button transition-all duration-200 hover:bg-button-hover focus:outline-none cursor-pointer"}
                onClick={props.handleSearch}
            >GO</Button>
        </>
    );
}
