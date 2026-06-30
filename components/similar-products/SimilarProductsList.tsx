"use client"

import {formatPriceWithCommas, getDomainFromUrl} from "@/components/helpers/formatting_helpers";
import useSimilarProducts from "@/hooks/useSimilarProductsHook";
import {ProductDetails, SimilarProductEntry} from "@/types/product";
import ExternalLink from "@/components/links/ExternalLink";
import InternalLink from "@/components/links/InternalLink";
import MarkTrueButton from "@/components/ui/buttons/mark-buttons/MarkTrueButton";
import MarkFalseButton from "@/components/ui/buttons/mark-buttons/MarkFalseButton";
import Image from "next/image";
import {sanitizeProductImageUrl} from "@/components/helpers/product_helpers";

type Props = {
    product: ProductDetails
    title_similarityThreshold: number
    cosine_similarity_threshold: number
    limitOne: boolean
}

export default function SimilarProductsList(props: Props) {
    const {data, loading, error} = useSimilarProducts(props.product.url, 0.3, 0.3);

    if (loading) {
        return (<div>Loading similar products...</div>);
    }

    if (error) {
        return (<div>Error loading similar products: {error}</div>);
    }

    if (data && data.length > 0) {

        const filteredProducts: SimilarProductEntry[] = [];
        const collectedDomains: Set<string> = new Set();
        for (const product of data) {
            if (product.title_similarity < props.title_similarityThreshold) continue;
            if (product.cosine_similarity_finetuned_768 < props.cosine_similarity_threshold) continue;
            if (props.limitOne && collectedDomains.has(getDomainFromUrl(product.product.url)) && props.limitOne) continue;
            filteredProducts.push(product);
            collectedDomains.add(getDomainFromUrl(product.product.url));
        }

        return (
            <table className="w-full border border-header-text border-collapse mb-5 bg-[rgba(255,255,255,0.25)]">
                <thead>
                <tr className={`bg-header-text text-white`}>
                    <th className="border border-header-text px-4 py-2 text-left">Site</th>
                    <th className="border border-header-text px-4 py-2 text-left">Title</th>
                    <th className="border border-header-text px-4 py-2 text-left">Price</th>
                    <th className="border border-header-text px-4 py-2 text-left">Price Diff</th>
                    <th className="border border-header-text px-4 py-2 text-left">Title Similarity</th>
                    <th className="border border-header-text px-4 py-2 text-left">768</th>
                    <th className="border border-header-text px-4 py-2 text-left">Finetuned 768</th>
                    <th className="border border-header-text px-4 py-2 text-left">Combined Similarity</th>
                    <th className="border border-header-text px-4 py-2 text-left"></th>
                    <th className="border border-header-text px-4 py-2 text-left"></th>
                    <th className="border border-header-text px-4 py-2 text-left"></th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map((entry, index) => (
                        <tr key={index}>
                            <td className="border border-header-text px-4 py-2">{getDomainFromUrl(entry.product.url)}</td>
                            <td className="border border-header-text px-4 py-2">
                                <div className="flex flex-row items-center gap-4">
                                    <Image
                                        src={sanitizeProductImageUrl(entry.product.image_url) || '/assets/no_image_available.jpg'}
                                        alt={entry.product.title}
                                        width={100} height={100}
                                        className="object-contain mb-4 rounded-lg"
                                    />
                                    <div className="p-4">
                                        {entry.product.title}
                                    </div>
                                </div>

                            </td>
                            <td className="border border-header-text px-4 py-2">Rs. {formatPriceWithCommas(entry.product.price)}</td>
                            <td className="border border-header-text px-4 py-2">{formatPriceWithCommas(getPriceDifference(props.product.price, entry.product.price).toString())}</td>
                            <td className="border border-header-text px-4 py-2">{(+entry.title_similarity).toFixed(2)}</td>
                            <td className="border border-header-text px-4 py-2">{(+entry.cosine_similarity).toFixed(2)}</td>
                            <td className="border border-header-text px-4 py-2">{(+entry.cosine_similarity_finetuned_768).toFixed(2)}</td>
                            <td className="border border-header-text px-4 py-2">{(+entry.combined_similarity).toFixed(2)}</td>
                            <td className="border border-header-text px-4 py-2">
                                <InternalLink text={`More details`}
                                              url={`/product?url=${encodeURIComponent(entry.product.url)}`}/>
                            </td>
                            <td className="border border-header-text px-4 py-2">
                                <ExternalLink text={`View on ${getDomainFromUrl(entry.product.url)}`}
                                              url={entry.product.url}/>
                            </td>
                            <td className="border border-header-text px-4 py-2">
                                <div className={"flex flex-row gap-2"}>
                                    <MarkTrueButton url1={props.product.url} url2={entry.product.url}/>
                                    <MarkFalseButton url1={props.product.url} url2={entry.product.url}/>
                                </div>
                            </td>
                        </tr>
                    )
                )}
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