"use server"

import {PriceHistoryEntry, ProductDetails} from "@/types/product";
import {formatPriceWithCommas, getDomainFromUrl} from "@/components/helpers/formatting_helpers";
import PriceHistoryTable from "@/components/price-history/PriceHistoryTable";
import ExternalLink from "@/components/links/ExternalLink";
import SimilarProductsComponent from "@/components/similar-products/SimilarProductsComponent";
import PriceHistoryChart from "@/components/price-history/PriceHistoryChart";
import Image from "next/image";
import {sanitizeProductImageUrl} from "@/components/helpers/product_helpers";

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
    const realPriceHistory: PriceHistoryEntry[] = []
    const seenDates: string[] = []
    const today = new Date();
    const thirty_days_ago: Date = new Date(new Date().setDate(today.getDate() - 30));

    for (const priceHistoryEntry of productPriceHistory) {
        const dateObj = new Date(priceHistoryEntry.timestamp)
        const date = dateObj.toISOString().slice(0, 10);
        if (!seenDates.includes(date) && dateObj >= thirty_days_ago) {
            realPriceHistory.push(priceHistoryEntry);
            seenDates.push(date);
        }
    }

    return (
        <div className="p-4 flex flex-col space-y-10 items-start w-full">

            <div className={`flex flex-row items-center space-x-4`}>
                <Image
                    src={sanitizeProductImageUrl(productData.image_url) || '/assets/no_image_available.png'}
                    alt={productData.title}
                    width={300} height={300}
                    className="object-contain mb-4 rounded-lg"
                />

                <div className={`flex flex-col w-full p-4`}>
                    <h1 className={`text-5xl mb-4 text-header-text max-w-[500px] leading-tight`}>
                        <b>{productData.title}</b>
                    </h1>

                    <div className={"flex flex-col items-start space-y-4"}>
                        <div className={`text-3xl flex font-bold mb-4`}>
                            Rs. {formatPriceWithCommas(productData.price)}
                        </div>

                        <ExternalLink text={`View on ${getDomainFromUrl(productData.url)}`} url={productData.url}/>
                    </div>
                </div>
            </div>


            <div className="flex flex-col space-y-10 w-full">
                <h2 className={`text-3xl mb-4 text-header-text font-bold`}>Price History (last 30 days)</h2>
                <div className={"flex flex-row items-start gap-8"}>
                    <div className={`flex max-w-sm w-full`}>
                        <PriceHistoryTable productPriceHistory={realPriceHistory}/>
                    </div>
                    <PriceHistoryChart productPriceHistory={productPriceHistory}/>
                </div>
            </div>


            <SimilarProductsComponent product={productData}/>

        </div>
    );
}


