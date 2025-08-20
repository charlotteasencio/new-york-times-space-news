import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { mockArticle1 } from "../utils/mockData";
import NewsArticlesCard from "./NewsArticlesCard";


describe("NewsArticlesCard", () => {
    it("renders article title and summary", () => {
        render(
            <BrowserRouter>
                <NewsArticlesCard article={mockArticle1} />
            </BrowserRouter>);
        expect(screen.getByText(mockArticle1.headline.main)).toBeInTheDocument();
        expect(screen.getByText(mockArticle1.abstract)).toBeInTheDocument();
    });

    it("renders article image", () => {
        render(
            <BrowserRouter>
                <NewsArticlesCard article={mockArticle1} />
            </BrowserRouter>);
        expect(screen.getByAltText(mockArticle1.headline.main)).toHaveAttribute("src", mockArticle1.multimedia.default.url);
    });

    it("renders View More button with correct link", () => {
        render(
            <BrowserRouter>
                <NewsArticlesCard article={mockArticle1} />
            </BrowserRouter>);
        const button = screen.getByRole("link");
        expect(button).toHaveAttribute("href", `/details/${encodeURIComponent(mockArticle1._id)}`);
        expect(button).toHaveTextContent("View More");
    });
});