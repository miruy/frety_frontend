import NotFound from "@/app/not-found";
import {prefetchSearchTabs} from "@/openapi/api/tab/tab";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {PageRsSearchTabsResponse} from "@/openapi/model";
import Search from "@/components/page/Search";
import {Metadata} from "next";
import SeoHead from "@/components/common/SeoHead";

interface Props {
    params: {
        keyword: string;
    };
}

export async function generateMetadata({params}: Props): Promise<Metadata> {

    const {keyword} = params;
    let decodingKeyword = decodeURIComponent(keyword);

    if (decodingKeyword === "undefined") {
        decodingKeyword = "검색어를 입력하세요"
    }

    return {
        title: '검색 | ' + decodingKeyword,
        description: '검색 | ' + decodingKeyword,
        keywords: '검색 | ' + decodingKeyword,
        openGraph: {
            type: 'article',
            url: `https://www.frety.me/search/${decodingKeyword}`,
            siteName: 'Frety - 프렛티',
            title: 'Frety | ' + decodingKeyword,
            description: 'Frety | ' + decodingKeyword,
            locale: 'ko_KR',
            images: [
                {
                    url: 'https://www.frety.me/image/favicon.png',
                    width: 800,
                    height: 600,
                    alt: 'frety_image',
                },
            ],
        },
        alternates: {
            canonical: `https://www.frety.me/search/${decodingKeyword}`,
            languages: {
                'ko-KR': `https://www.frety.me/search/${decodingKeyword}`
            },
        },
        icons: {
            icon: [
                {url: 'https://www.frety.me/favicon.ico', type: 'image/x-icon'},
                {url: 'https://www.frety.me/favicon.png', sizes: '512x512', type: 'image/png'}
            ]
        }
    }
}

const SearchTabPage = async ({params}: Props) => {

    const {keyword} = params;
    let decodingKeyword = decodeURIComponent(keyword);

    if (decodingKeyword === "undefined") {
        decodingKeyword = "검색어를 입력하세요"
    }

    try {

        const searchTabQueryClient = new QueryClient();
        await prefetchSearchTabs(searchTabQueryClient, {
            sort: "RECENT",
            keyword: decodingKeyword,
            page: 0,
            pageSize: 10
        });
        const searchBySongDehydratedState = dehydrate(searchTabQueryClient);

        const searchTabQueries = searchBySongDehydratedState.queries || [];

        let searchTabData: PageRsSearchTabsResponse = {
            data: [], meta: {
                page: 0,
                pageSize: 0,
                totalCount: 0,
                totalPage: 0,
                hasPreviousPage: false,
                hasNextPage: false
            }
        };

        searchTabQueries.forEach(query => {
            searchTabData = query.state.data as PageRsSearchTabsResponse;
        });

        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'article',
            'name': 'Frety | ' + decodingKeyword,
            'description': 'Frety | ' + decodingKeyword,
            'url': `https://www.frety.me/search/${decodingKeyword}`,
            'image': {
                '@type': `articleImage_search`,
                'url': 'https://www.frety.me/image/favicon.png',
                'width': 800,
                'height': 600,
                'alt': 'frety_search_image',
            },
        };

        return (
            <>
                <SeoHead
                    title={jsonLd.name}
                    description={jsonLd.description}
                    ogTitle={jsonLd.name}
                    ogDescription={jsonLd.description}
                    ogType="website"
                    ogUrl={jsonLd.url}
                    ogImage={jsonLd.image.url}
                    ogImageAlt={jsonLd.image.alt}
                    jsonLd={jsonLd}
                />

                <HydrationBoundary state={searchTabData}>
                    <Search searchedTabData={searchTabData} keyword={decodingKeyword}/>
                </HydrationBoundary>
            </>
        );
    } catch {
        return <NotFound/>;
    }
};

export default SearchTabPage;