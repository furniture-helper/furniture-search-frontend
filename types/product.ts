export type ProductDetails = {
    url: string;
    title: string;
    price: string;
    image_url: string | null;
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
    cosine_similarity_finetuned_768: number;
}