import {SimilarProductEntry} from "@/types/product";
import {useEffect, useState} from "react";

export default function useSimilarProducts(productUrl: string) {
    const [data, setData] = useState<SimilarProductEntry[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            try {
                console.log(process.env.API_BASE_URL);
                console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
                const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/similar?url=${productUrl}`);

                const response = await fetch(url.toString());
                if (!response.ok) {
                    setError(`Error fetching similar products: ${response.statusText}`);
                    return;
                }
                const result: SimilarProductEntry[] = await response.json();
                setData(result);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSimilarProducts();
    }, [productUrl]);

    return {data, loading, error};
}