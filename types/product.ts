export type ProductDetails = {
    url: string;
    title: string;
    price: string;
}

export type PriceHistoryEntry = {
    timestamp: Date;
    price: string;
}

export type SimilarProductEntry = {
    product: ProductDetails;
    title_similarity: number;
    cosine_similarity: number;
    combined_similarity: number;
}