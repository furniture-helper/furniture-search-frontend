import {PriceHistoryEntry} from "@/types/product";
import {formatPriceWithCommas} from "@/components/helpers/formatting_helpers";

type Props = {
    productPriceHistory: PriceHistoryEntry[]
}

export default async function PriceHistoryTable(props: Props) {
    return (
        <table className="w-full border border-header-text border-collapse mb-5 bg-[rgba(255,255,255,0.25)]">
            <thead>
            <tr className={`bg-header-text text-white`}>
                <th className="border border-header-text px-4 py-2 text-left">Date</th>
                <th className="border border-header-text px-4 py-2 text-left">Price</th>
            </tr>
            </thead>
            <tbody>
            {props.productPriceHistory.map((entry, index) => (
                <tr key={index}>
                    <td className="border border-header-text px-4 py-2">{formatDate(entry.timestamp)}</td>
                    <td className="border border-header-text px-4 py-2">Rs. {formatPriceWithCommas(entry.price)}</td>
                </tr>
            ))}
            </tbody>
        </table>

    )
}

function formatDate(timestamp: string | Date) {
    return new Date(timestamp).toISOString().slice(0, 10);
}
