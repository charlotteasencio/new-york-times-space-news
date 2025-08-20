import { useCallback, useEffect, useRef, useState } from "react";
import { NewsArticle } from "../utils/types";
import NewsArticlesCard from "../NewsArticleCard/NewsArticlesCard";
import SkeletonCard from "../Components/Skeleton/SkeletonCard";
import GridLayout from "../Components/GridLayout";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function NewsArticlesGrid() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [page, setPage] = useState(1)
    const targetRef = useRef<HTMLDivElement>(null);

    const apiKey = process.env.REACT_APP_NYT_API_KEY;

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                // articles are being fetched from the Space Flight news API: https://www.spaceflightnewsapi.net/
                // the first 10 articles are fetched and the remaining articles are fetched on scroll
                const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=space&page=1&api-key=${apiKey}`);
                const data = await response.json();
                setArticles(data.response.docs);
                setPage((prev) => prev + 1)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, [apiKey]);

    //if this fetch pattern is going to be used in other places, we could extract into the custom hook
    const fetchMoreArticles = useCallback(async () => {
        setLoadingMore(true);
        try {
            const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=space&page=${page}&api-key=${apiKey}`);
            const data = await response.json();
            setArticles((prevArticles) => [...prevArticles, ...data.response.docs]);
            setPage((prev) => prev + 1)
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoadingMore(false);
        }
    }, [page, apiKey]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && articles.length > 0) {
                fetchMoreArticles();
            }
        });

        const currentTarget = targetRef.current;

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            };
            observer.disconnect();
        };
    }, [fetchMoreArticles, articles.length]);

    if (error) {
        return <div className="text-center w-full h-screen">Error loading articles: {error.message}</div>;
    }

    if (loading) {
        return (
            <GridLayout>
                {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </GridLayout>
        )
    }

    return (
        <GridLayout>
            {articles.map((article) => {
                return (
                    <NewsArticlesCard article={article} key={article._id} />
                );
            })}
            <div ref={targetRef}></div>
            {loadingMore && <LoadingSpinner />}
        </GridLayout>
    );
};