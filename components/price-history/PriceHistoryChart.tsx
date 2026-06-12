"use client"

import {PriceHistoryEntry} from "@/types/product";
import {Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

type Props = {
    productPriceHistory: PriceHistoryEntry[]
}

export default function PriceHistoryChart(props: Props) {
    const data = []
    const reversed = props.productPriceHistory.toReversed()
    for (const productPriceEntry of reversed) {
        data.push({
            "date": new Date(productPriceEntry.timestamp),
            "price": parseFloat(productPriceEntry.price)
        })
    }
    console.log(data)

    return (
        <LineChart style={{width: '100%', aspectRatio: 2}} responsive data={data}>
            <Line dataKey="price" strokeWidth={2} stroke="brown"/>
            <YAxis width="auto" label={{value: 'Price', position: 'insideLeft', angle: -90}}
                   tickFormatter={(price) => `Rs. ${price.toLocaleString()}`}
            />
            <XAxis dataKey="date" type="number" scale="time"
                   domain={['dataMin', 'dataMax']}
                   tickFormatter={(unixTime) => new Date(unixTime).toISOString().split('T')[0]}
            />
            <Tooltip labelFormatter={(label) => new Date(label).toISOString().split('T')[0]}/>
        </LineChart>
    );
}
