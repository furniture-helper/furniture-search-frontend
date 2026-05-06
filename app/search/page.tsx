"use server"

import {SearchResult} from "@/types/search";
import SearchResultCard from "@/components/search/SearchResultCard";

type Props = {
    searchParams: Promise<{ q: string }>;
};
export default async function SearchResults({searchParams}: Props) {
    const {q} = await searchParams;
    const query = q?.trim() ?? "";

    if (!query) {
        return <div>No query provided.</div>;
    }

    const res = await fetch(`${process.env.API_BASE_URL}/products/search?query=${q}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return <div>Failed to fetch results.</div>;
    }

    const results: SearchResult[] = await res.json();

    return (
        <div className="p-4">
            <h1 className={`text-5xl mb-4 text-header-text`}>
                Search results for <b>{q}</b>
            </h1>

            {results.length > 0 ? (
                <div className="space-y-5">
                    {results.map((result, index) => (
                        <div key={result.url ?? index}>
                            <SearchResultCard url={result.url} title={result.title} price={result.price}/>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No results found.</div>
            )}
        </div>
    );
}