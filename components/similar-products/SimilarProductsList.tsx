"use client"

import {formatPriceWithCommas, getDomainFromUrl} from "@/components/helpers/formatting_helpers";
import useSimilarProducts from "@/hooks/useSimilarProductsHook";
import {ProductDetails} from "@/types/product";
import ExternalLink from "@/components/links/ExternalLink";
import InternalLink from "@/components/links/InternalLink";

type Props = {
    product: ProductDetails
    title_similarityThreshold: number
    cosine_similarity_threshold: number
}

export default function SimilarProductsList(props: Props) {
    const {data, loading, error} = useSimilarProducts(props.product.url, 0.5, 0.5);

    if (loading) {
        return (<div>Loading similar products...</div>);
    }

    if (error) {
        return (<div>Error loading similar products: {error}</div>);
    }

    if (data && data.length > 0) {

        return (
            <table className="w-full border border-header-text border-collapse mb-5">
                <thead>
                <tr className={`bg-header-text text-white`}>
                    <th className="border border-primary px-4 py-2 text-left">Site</th>
                    <th className="border border-header-text px-4 py-2 text-left">Title</th>
                    <th className="border border-header-text px-4 py-2 text-left">Price</th>
                    <th className="border border-header-text px-4 py-2 text-left">Price Diff</th>
                    <th className="border border-header-text px-4 py-2 text-left">Title Similarity</th>
                    <th className="border border-header-text px-4 py-2 text-left">Cosine Similarity</th>
                    <th className="border border-header-text px-4 py-2 text-left">Combined Similarity</th>
                    <th className="border border-header-text px-4 py-2 text-left"></th>
                    <th className="border border-header-text px-4 py-2 text-left"></th>
                </tr>
                </thead>
                <tbody>
                {data.map((entry, index) => (
                    entry.title_similarity >= props.title_similarityThreshold &&
                    entry.cosine_similarity >= props.cosine_similarity_threshold &&
                    (
                        <tr key={index}>
                            <td className="border border-header-text px-4 py-2">{getDomainFromUrl(entry.product.url)}</td>
                            <td className="border border-header-text px-4 py-2">{entry.product.title}</td>
                            <td className="border border-header-text px-4 py-2">Rs. {formatPriceWithCommas(entry.product.price)}</td>
                            <td className="border border-header-text px-4 py-2">{formatPriceWithCommas(getPriceDifference(props.product.price, entry.product.price).toString())}</td>
                            <td className="border border-header-text px-4 py-2">{(+entry.title_similarity).toFixed(2)}</td>
                            <td className="border border-header-text px-4 py-2">{(+entry.cosine_similarity).toFixed(2)}</td>
                            <td className="border border-header-text px-4 py-2">{(+entry.combined_similarity).toFixed(2)}</td>
                            <td className="border border-header-text px-4 py-2">
                                <InternalLink text={`More details`}
                                              url={`/product?url=${encodeURIComponent(entry.product.url)}`}/>
                            </td>
                            <td className="border border-header-text px-4 py-2">
                                <ExternalLink text={`View on ${getDomainFromUrl(entry.product.url)}`}
                                              url={entry.product.url}/>
                            </td>
                        </tr>
                    )
                ))}
                </tbody>
            </table>
        )
    }

    return (
        <div>No similar products found</div>
    )

}

function formatDate(timestamp: string | Date) {
    return new Date(timestamp).toISOString().slice(0, 10);
}

function getPriceDifference(product_price: string, comparison_price: string): number {
    const product_price_num = parseFloat(product_price.replace(/[^0-9.-]+/g, ""));
    const comparison_price_num = parseFloat(comparison_price.replace(/[^0-9.-]+/g, ""));
    return comparison_price_num - product_price_num;
}