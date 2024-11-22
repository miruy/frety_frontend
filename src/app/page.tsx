import Main from "@/components/page/Main";
import {
    prefetchSearchTabs,
} from "@/openapi/api/tab/tab";
import NotFound from "@/app/not-found";
import {dehydrate, QueryClient, HydrationBoundary} from "@tanstack/react-query";
import {PageRsSearchTabsResponse} from "@/openapi/model";
import SeoHead from "@/components/common/SeoHead";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Frety',
    description: '프렛위에서 완성되는 당신의 기타 코드',
    keywords: ["Frety", "FRETY", "guitar", "chord", "프렛티", "기타", "악보", "코드"],
    openGraph: {
        type: 'website',
        url: `https://www.frety.me`,
        siteName: 'Frety - 프렛티',
        title: 'Frety - 프렛티',
        description: '프렛위에서 완성되는 당신의 기타 코드',
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
        canonical: `https://www.frety.me`,
        languages: {
            'ko-KR': `https://www.frety.me`
        },
    },
    icons: {
        icon: [
            {url: 'https://www.frety.me/favicon.ico', type: 'image/x-icon'},
            {url: 'https://www.frety.me/image/favicon.png', sizes: '512x512', type: 'image/png'},
        ]
    }
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'website',
    'name': 'Frety',
    'description': '프렛위에서 완성되는 당신의 기타 코드',
    'url': 'https://www.frety.me',
    'image': {
        '@type': 'websiteImage',
        'url': 'https://www.frety.me/image/favicon.png',
        'width': 800,
        'height': 600,
        'alt': 'frety_image',
    },
};


const Home = async () => {

    try {
        // 최근 등록 순 악보 전체조회
        const recentQueryClient = new QueryClient();
        await prefetchSearchTabs(recentQueryClient, {sort: "RECENT", page: 0, pageSize: 10});
        const recentDehydratedState = dehydrate(recentQueryClient);

        const recentQueries = recentDehydratedState.queries || [];

        let recentData: PageRsSearchTabsResponse = {
            data: [], meta: {
                page: 0,
                pageSize: 0,
                totalCount: 0,
                totalPage: 0,
                hasPreviousPage: false,
                hasNextPage: false
            }
        };

        recentQueries.forEach(query => {
            recentData = query.state.data as PageRsSearchTabsResponse;
        });


        // 인기 순 악보 전체조회
        const voteQueryClient = new QueryClient();
        await prefetchSearchTabs(voteQueryClient, {sort: "VOTE", page: 0, pageSize: 10});
        const voteDehydratedState = dehydrate(voteQueryClient);

        const voteQueries = voteDehydratedState.queries || [];

        let voteData: PageRsSearchTabsResponse = {
            data: [], meta: {
                page: 0,
                pageSize: 0,
                totalCount: 0,
                totalPage: 0,
                hasPreviousPage: false,
                hasNextPage: false
            }
        };

        voteQueries.forEach(query => {
            voteData = query.state.data as PageRsSearchTabsResponse;
        });

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

                <HydrationBoundary state={recentData}>
                    <Main recentTabsData={recentData} voteTabsData={voteData}/>
                </HydrationBoundary>
            </>
        );
    } catch {
        return <NotFound/>;
    }
}

export default Home;