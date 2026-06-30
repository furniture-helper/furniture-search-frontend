import ExternalLink from "@/components/links/ExternalLink";
import {formatPriceWithCommas, getDomainFromUrl} from "@/components/helpers/formatting_helpers";
import InternalLink from "@/components/links/InternalLink";
import {sanitizeProductImageUrl} from "@/components/helpers/product_helpers";
import Image from "next/image";

type Props = {
    url: string;
    title: string;
    price: string;
    image_url: string | null;
}

export default function SearchResultCard(props: Props) {
    return (
        <div className="flex flex-row items-start">
            <div>
                <Image
                    src={sanitizeProductImageUrl(props.image_url) || '/assets/no_image_available.png'}
                    alt={props.title}
                    width={150} height={150}
                    className="object-contain mb-4 rounded-lg"
                />
            </div>

            <div className="flex flex-col p-4 items-start">
                <div className="flex items-center justify-center text-xl font-bold">{props.title}</div>
                <div className="flex items-center justify-center">Rs. {formatPriceWithCommas(props.price)}</div>
                <div className="flex items-center justify-center text-sm italic">{getDomainFromUrl(props.url)}</div>
                <div className="flex flex-row justify-center gap-2">
                    <InternalLink text={"See more details"} url={`/product?url=${encodeURIComponent(props.url)}`}/>
                    <ExternalLink text={`View on ${getDomainFromUrl(props.url)}`} url={props.url}/>
                </div>
            </div>

        </div>
    )
}