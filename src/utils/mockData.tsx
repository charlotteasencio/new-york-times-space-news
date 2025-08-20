import { NewsArticle } from "./types"

const mockByline = {
    original: "By Test"
}

const mockByline2 = {
    original: "By Test 2"
}

const mockHeadline = {
    kicker: "",
    main: "Test Headline",
    print_headline: "",
}

const mockHeadline2 = {
    kicker: "test",
    main: "Test Headline 2",
    print_headline: "",
}

const mockDefault = {
    height: 300,
    url: "testimageurl",
    width: 300
}

const mockThumbnail = {
    height: 100,
    url: "testimageurlthumbnail",
    width: 100
}

const mockMultiMedia = {
    caption: "test caption",
    credit: "test credit",
    default: mockDefault,
    thumbnail: mockThumbnail,
}

export const mockArticle1: NewsArticle = {
    abstract: "test abstract",
    byline: mockByline,
    document_type: "article",
    headline: mockHeadline,
    keywords: [],
    multimedia: mockMultiMedia,
    news_desk: "nytimes desk",
    print_page: "print page",
    print_section: "section 1",
    pub_date: "2025-07-24T02:25:40Z",
    section_name: "section 1",
    snippet: "test snippet",
    source: "nytimes",
    subsection_name: "subsection 2",
    type_of_material: "article",
    uri: "testuri",
    web_url: "testurl",
    word_count: 231,
    _id: "nyt://test/12jsdbfkj37skkjdft6"
}

export const mockArticle2: NewsArticle = {
    abstract: "test abstract 2",
    byline: mockByline2,
    document_type: "article 2",
    headline: mockHeadline2,
    keywords: [],
    multimedia: mockMultiMedia,
    news_desk: "nytimes desk",
    print_page: "print page",
    print_section: "section 2",
    pub_date: "2025-07-24T02:25:40Z",
    section_name: "section 1",
    snippet: "test snippet 2",
    source: "nytimes",
    subsection_name: "subsection 4",
    type_of_material: "article",
    uri: "testuri",
    web_url: "testurl",
    word_count: 765,
    _id: "nyt://test/jh298ghl2396sh"
}

export const mockArticles: NewsArticle[] = [
    { ...mockArticle1 },
    { ...mockArticle2 }
];