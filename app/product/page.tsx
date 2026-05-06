"use server"

import {PriceHistoryEntry, ProductDetails} from "@/types/product";
import {formatPriceWithCommas, getDomainFromUrl} from "@/components/helpers/formatting_helpers";
import ExternalLink from "@/components/links/ExternalLink";

type Props = {
    searchParams: Promise<{ url: string }>;
};
export default async function Product({searchParams}: Props) {
    const {url} = await searchParams;

    if (!url) {
        return <div>No URL provided.</div>;
    }

    const productDataResponse = await fetch(`${process.env.API_BASE_URL}/products?url=${url}`, {
        cache: "no-store",
    });
    const productData: ProductDetails = await productDataResponse.json();

    const priceHistoryResponse = await fetch(`${process.env.API_BASE_URL}/products/price-history?url=${url}`, {
        cache: "no-store",
    });
    const productPriceHistory: PriceHistoryEntry[] = await priceHistoryResponse.json();

    return (
        <div className="p-4">
            <h1 className={`text-5xl mb-4 text-header-text`}>
                <b>{productData.title}</b>
            </h1>

            <div
                className="rounded-md bg-white flex font-bold w-32 mb-4 p-4 text-gray-700 flex-row items-center justify-center">
                {getDomainFromUrl(productData.url)}
            </div>


            <table className="w-full max-w-2xl border border-header-text border-collapse mb-5">
                <thead>
                <tr>
                    <th className="border border-header-text px-4 py-2 text-left">Date</th>
                    <th className="border border-header-text px-4 py-2 text-left">Price</th>
                </tr>
                </thead>
                <tbody>
                {productPriceHistory.map((entry, index) => (
                    <tr key={index}>
                        <td className="border border-header-text px-4 py-2">{formatDate(entry.timestamp)}</td>
                        <td className="border border-header-text px-4 py-2">Rs. {formatPriceWithCommas(entry.price)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <ExternalLink text={"Visit Site"} url={productData.url}/>

        </div>
    );
}

function formatDate(timestamp: string | Date) {
    return new Date(timestamp).toISOString().slice(0, 10);
}

