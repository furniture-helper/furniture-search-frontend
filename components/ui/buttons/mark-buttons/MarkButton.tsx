import {Button} from "@/components/ui/buttons/button";
import React from "react";

type MarkProps = {
    url1: string;
    url2: string;
    isMatching: boolean;
}

type Props = {
    text: string
    mark: MarkProps
}

export default function MarkButton(props: Props) {
    const [loading, setLoading] = React.useState(false);

    async function handleClick() {
        setLoading(true);
        const payload = {
            url1: props.mark.url1,
            url2: props.mark.url2,
            is_matching: props.mark.isMatching,
        }
        const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/mark-matching`
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!response.ok) {
                console.log(`Error marking products: ${response.statusText}`);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            className={`p-2 py-6 rounded-full bg-transparent hover:bg-accent transition-all cursor-pointer text-xl ${loading ? "opacity-50" : ""}`}
            onClick={handleClick}
        >
            {props.text}
        </Button>
    )
}
