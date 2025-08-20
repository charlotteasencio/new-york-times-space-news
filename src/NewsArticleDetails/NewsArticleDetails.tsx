import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkButton from "../Components/LinkButton";
import { NewsArticle } from "../utils/types";
import SkeletonDetails from "../Components/Skeleton/SkeletonDetails";
import { formatDate } from "../utils/formatDate";

export default function NewsArticleDetails() {
    const { id } = useParams();

    const articleId = id && decodeURIComponent(id);

    const [articleData, setArticleData] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchArticleDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id:"${articleId}"&api-key=jXZ0xRtYFkpoqJGuaf1vzBamjMh5ZW4B`);
                const data = await response.json();
                //since the api doesn't have a get by id query, we are using articleId in params and getting the first and only returned
                setArticleData(data.response.docs[0]);
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        };
        fetchArticleDetails();
    }, [articleId]);

    if (error) {
        return <div className="text-center w-full h-screen">Error loading article details: {error.message}</div>;
    }

    if (loading) {
        return (
            <div className="text-center w-full h-screen">
                <SkeletonDetails />
            </div>
        );
    }

    const formattedDate = articleData && formatDate(articleData?.pub_date);

    return (
        <div className="p-12 w-screen h-full">
            <LinkButton path="/">Back</LinkButton>
            {articleData && (
                <div className="max-w-3xl mx-auto border border-neutral-700 p-6 mt-4 rounded-lg bg-neutral-800">
                    <h1 className="text-2xl font-bold mb-4">{articleData.headline.main}</h1>
                    <p className="text-sm mb-4">{formattedDate}</p>
                    <div className="mb-4 w-60 overflow-hidden rounded-lg">
                        <img src={articleData.multimedia.default.url} alt={articleData.headline.main} />
                    </div>
                    <p className="mb-4 text-xs italic">{articleData.multimedia.credit}</p>
                    <p className="mb-2">{articleData.abstract}</p>
                    <p className="mb-8 text-sm">{articleData.byline.original}</p>
                    <a href={articleData.web_url} target="_blank" rel="noopener noreferrer" className="bg-blue-700 py-2 px-4 rounded">View Article</a>
                </div>
            )}
        </div>
    );
}