import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const options = {
    method: 'GET',
    url: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
};


export const articleApi = createApi({
    reducerPath: "articleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: options.url,
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key", options.headers["X-RapidAPI-Key"]);
            headers.set("X-RapidAPI-Host", options.headers["X-RapidAPI-Host"]);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3&lang=fr`,
        }),
    }),
});

export const { useLazyGetSummaryQuery } = articleApi;