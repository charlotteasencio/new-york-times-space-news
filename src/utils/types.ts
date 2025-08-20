type Keywords = {
    name: string;
    rank: number;
    value: string;
}

type Byline = {
    original: string,
}

type Headline = {
    kicker: string;
    main: string;
    print_headline: string;
}

type MultiMediaImages = {
    height: number;
    url: string;
    width: number;
}

type MultiMedia = {
    caption: string;
    credit: string;
    default: MultiMediaImages;
    thumbnail: MultiMediaImages;
}

export type NewsArticle = {
    abstract: string;
    byline: Byline;
    document_type: string,
    headline: Headline;
    keywords: Keywords[];
    multimedia: MultiMedia;
    news_desk: string;
    print_page: string;
    print_section: string;
    pub_date: string;
    section_name: string;
    snippet: string;
    source: string;
    subsection_name: string;
    type_of_material: string;
    uri: string;
    web_url: string;
    word_count: number;
    _id: string
};