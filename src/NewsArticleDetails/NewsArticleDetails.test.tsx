import { render, screen } from "@testing-library/react";
import { mockArticle1 } from "../utils/mockData";
import { BrowserRouter } from "react-router-dom";
import NewsArticleDetails from "./NewsArticleDetails";

beforeEach(() => {
    fetchMock.resetMocks();
});

describe("NewsArticlesDetails", () => {
    it("renders article title, summary, and image after fetching", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ response: { docs: [mockArticle1] } }));

        render(
            <BrowserRouter>
                <NewsArticleDetails />
            </BrowserRouter >
        );

        // Check that loading skeleton shows initially
        expect(screen.getByTestId("skeleton-details")).toBeInTheDocument();

        //check that article details are rendered
        expect(await screen.findByText(mockArticle1.headline.main)).toBeInTheDocument();
        expect(await screen.findByText(mockArticle1.abstract)).toBeInTheDocument();
        expect(await screen.findByAltText(mockArticle1.headline.main)).toHaveAttribute("src", mockArticle1.multimedia.default.url);
    });

    it("renders error message if fetch fails", async () => {
        fetchMock.mockRejectOnce(new Error("API failure"))

        render(
            <BrowserRouter>
                <NewsArticleDetails />
            </BrowserRouter >
        );

        //Check that error message is displayed
        expect(await screen.findByText(/Error loading article details/i)).toBeInTheDocument();
    });
})