import ExternalLink from "@/components/links/ExternalLink";
import {formatPriceWithCommas, getDomainFromUrl} from "@/components/helpers/formatting_helpers";
import InternalLink from "@/components/links/InternalLink";

type Props = {
    url: string;
    title: string;
    price: string;
}

export default function SearchResultCard(props: Props) {
    return (
        <div className="flex flex-col items-start">
            <div className="flex items-center justify-center text-xl font-bold">{props.title}</div>
            <div className="flex items-center justify-center">Rs. {formatPriceWithCommas(props.price)}</div>
            <div className="flex items-center justify-center text-sm italic">{getDomainFromUrl(props.url)}</div>
            <div className="flex flex-row justify-center gap-2">
                <InternalLink text={"See more details"} url={`/product?url=${encodeURIComponent(props.url)}`}/>
                <ExternalLink text={"View on site"} url={props.url}/>
            </div>
        </div>
    )
}