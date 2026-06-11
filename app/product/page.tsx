"use server"

import {PriceHistoryEntry, ProductDetails} from "@/types/product";
import {formatPriceWithCommas, getDomainFromUrl} from "@/components/helpers/formatting_helpers";
import PriceHistoryTable from "@/components/price-history/PriceHistoryTable";
import ExternalLink from "@/components/links/ExternalLink";
import SimilarProductsComponent from "@/components/similar-products/SimilarProductsComponent";

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
        <div className="p-4 flex flex-col space-y-10 items-start w-full">
            <h1 className={`text-5xl mb-4 text-header-text`}>
                <b>{productData.title}</b>
            </h1>

            <div className={"flex flex-col items-start space-y-4"}>
                <div className={`text-3xl flex font-bold mb-4`}>
                    Rs. {formatPriceWithCommas(productData.price)}
                </div>

                <ExternalLink text={`View on ${getDomainFromUrl(productData.url)}`} url={productData.url}/>
            </div>


            <div className="flex flex-col space-y-10">
                <h2 className={`text-3xl mb-4 text-header-text font-bold`}>Price History</h2>
                <PriceHistoryTable productPriceHistory={productPriceHistory}/>
            </div>


            <SimilarProductsComponent product={productData}/>

        </div>
    );
}


