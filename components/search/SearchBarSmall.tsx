import {Input} from "../ui/input";
import {Button} from "@/components/ui/button";
import React from "react";

type Props = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
}

export default function SearchBarSmall(props: Props) {
    return (
        <>
            <Input
                className={"md:text-lg font-bold h-10 max-w-75 m-2 rounded-full bg-input transition-all duration-200 focus:outline-none px-5"}
                value={props.searchQuery}
                onChange={(e) => props.setSearchQuery(e.target.value)}
                onKeyUp={props.handleEnter}
            />

            <Button
                className={"text-md text-header-text font-bold h-10 max-w-50 px-5 rounded-full bg-background transition-all duration-200 hover:bg-accent focus:outline-none cursor-pointer"}
                onClick={props.handleSearch}
            >SEARCH</Button>
        </>
    );
}
