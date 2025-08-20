import { NewsArticle } from "../utils/types";
import LinkButton from "../Components/LinkButton";
import imageNotFound from "../images/image-not-found.png";

type Props = {
    article: NewsArticle;
};

export default function NewsArticlesCard({ article }: Props) {
    return (
        <div className="block rounded-lg bg-neutral-800 h-[460px] flex flex-col overflow-hidden">
            <div className="mb-2 h-48 w-full overflow-hidden rounded-lg flex-shrink-0">
                <img className="w-full h-full object-cover" src={article.multimedia.default.url} alt={article.headline.main} onError={(e) => (e.currentTarget.src = imageNotFound)} loading="lazy" />
            </div>
            <div className="p-4 flex justify-between flex-col flex-1">
                <div>
                    <h2 className="mb-2 text-lg font-semibold overflow-hidden line-clamp-3">{article.headline.main}</h2>
                    <p className="overflow-hidden text-medium line-clamp-3 font-light">{article.abstract}</p>
                </div>
                <div className="flex justify-end flex-shrink-0">
                    <LinkButton path={`/details/${encodeURIComponent(article._id)}`}>View More</LinkButton>
                </div>
            </div>
        </div>
    );
};