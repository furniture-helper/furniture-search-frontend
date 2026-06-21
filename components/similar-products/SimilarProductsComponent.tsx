"use client"

import {ProductDetails} from "@/types/product";
import SimilarProductsList from "@/components/similar-products/SimilarProductsList";
import {useState} from "react";

type Props = {
    product: ProductDetails
}

export default function SimilarProductsComponent(props: Props) {
    const [titleSimilarityThreshold, setTitleSimilarityThreshold] = useState(0.5);
    const [cosineSimilarityThreshold, setCosineSimilarityThreshold] = useState(0.5);
    const [limitOne, setLimitOne] = useState(false);

    return (
        <div className="flex flex-col space-y-4 w-full">
            <h2 className={`text-3xl mb-2 text-header-text font-bold`}>Similar Products</h2>

            <div className="flex flex-row gap-8">

                <div className="flex flex-col space-y-2">
                    <div>Title Similarity Threshold: <b>{titleSimilarityThreshold.toFixed(2)}</b></div>
                    <input type="range" id="title_similiarity_threshold" name="title_similiarity_threshold" min="0.5"
                           max="1"
                           className={"flex accent-primary"}
                           value={titleSimilarityThreshold}
                           onChange={(e) => setTitleSimilarityThreshold(parseFloat(e.target.value))}
                           step="0.01"></input>
                </div>

                <div className="flex flex-col space-y-2">
                    <div>Cosine Similarity Threshold: <b>{cosineSimilarityThreshold.toFixed(2)}</b></div>
                    <input type="range" id="cosine_similarity_threshold" name="cosine_similarity_threshold" min="0.5"
                           max="1"
                           className={"flex accent-primary"}
                           value={cosineSimilarityThreshold}
                           onChange={(e) => setCosineSimilarityThreshold(parseFloat(e.target.value))}
                           step="0.01"></input>
                </div>

                <div className="flex flex-col space-y-2">
                    <div>Limit 1 per site?</div>
                    <input type="checkbox" id="limit" name="limit"
                           className={"flex accent-primary"}
                           checked={limitOne}
                           onChange={(e) => setLimitOne(e.target.checked)}
                    ></input>
                </div>

            </div>


            <SimilarProductsList product={props.product} title_similarityThreshold={titleSimilarityThreshold}
                                 cosine_similarity_threshold={cosineSimilarityThreshold} limitOne={limitOne}/>
        </div>

    )

}