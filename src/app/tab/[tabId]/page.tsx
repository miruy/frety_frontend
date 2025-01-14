import NotFound from "@/app/not-found";
import {getTabById, prefetchGetTabById} from "@/openapi/api/tab/tab";
import {Metadata} from "next";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import DetailTab from "@/components/page/DetailTab";
import {GetTabByIdResponse} from "@/openapi/model";
import SeoHead from "@/components/common/SeoHead";

interface TabProps {
    params: {
        tabId: number;
    };
}

export async function generateMetadata({params}: TabProps): Promise<Metadata> {

    const {tabId} = params;
    const tab = await getTabById(tabId);

    return {
        title: tab.artist && tab.song ? tab.artist + " - " + tab.song : 'Frety | 기타 악보',
        description: '프렛 위에서 완성되는 당신의 기타 코드',
        keywords: tab.artist || tab.song ? tab.artist + ", " + tab.song + ", " + tab.authorName : 'Frety | 기타 악보',
        openGraph: {
            type: 'article',
            url: `https://www.frety.me/tab/${tab.id}`,
            siteName: 'Frety - 프렛티',
            title: tab.artist && tab.song ? tab.artist + " - " + tab.song : 'Frety | 기타 악보',
            description: '프렛 위에서 완성되는 당신의 기타 코드',
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
            canonical: `https://www.frety.me/tab/${tab.id}`,
            languages: {
                'ko-KR': `https://www.frety.me/tab/${tab.id}`
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

interface Props {
    params: {
        tabId: string;
    };
}

const DetailTabPage = async ({params}: Props) => {

    const tabId = Number(params?.tabId) || 0;

    try {

        const detailQueryClient = new QueryClient();
        await prefetchGetTabById(detailQueryClient, tabId);
        const detailDehydratedState = dehydrate(detailQueryClient);

        const detailTab = detailDehydratedState.queries.map(data => data.state.data) as GetTabByIdResponse;

        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'article',
            'name': detailTab.artist && detailTab.song ? detailTab.artist + " - " + detailTab.song : 'Frety | 기타 악보',
            'description': '프렛 위에서 완성되는 당신의 기타 코드',
            'url': `https://www.frety.me/tab/${detailTab.id}`,
            'image': {
                '@type': `articleImage_${detailTab.id}`,
                'url': 'https://www.frety.me/image/favicon.png',
                'width': 800,
                'height': 600,
                'alt': `${detailTab.id}` ? `${detailTab.id}_image` : 'frety_image',
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

                <HydrationBoundary state={detailTab}>
                    <DetailTab detailTab={detailTab} tabId={tabId}/>
                </HydrationBoundary>
            </>
        )
    } catch {
        return <NotFound/>;
    }
}

export default DetailTabPage;