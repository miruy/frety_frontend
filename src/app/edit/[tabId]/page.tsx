import EditTab from "@/components/page/EditTab";
import {getTabById} from "@/openapi/api/tab/tab";
import NotFound from "@/app/not-found";
import {Metadata} from "next";
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
        title: 'Frety | 악보 수정',
        description: 'Frety | 악보 수정',
        keywords: 'Frety | 악보 수정',
        openGraph: {
            type: 'article',
            url: `https://www.frety.me/edit/${tab.id}`,
            siteName: 'Frety - 프렛티',
            title: 'Frety | 악보 수정',
            description: 'Frety | 악보 수정',
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
            canonical: `https://www.frety.me/edit/${tab.id}`,
            languages: {
                'ko-KR': `https://www.frety.me/edit`
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

const EditTabPage = async ({params}: Props) => {

    const {tabId} = params;

    try {
        const tab = await getTabById(Number(tabId));

        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'article',
            'name': 'Frety | 악보 수정',
            'description': 'Frety | 악보 수정',
            'url': `https://www.frety.me/edit/${tab.id}`,
            'image': {
                '@type': `articleImage_edit`,
                'url': 'https://www.frety.me/image/favicon.png',
                'width': 800,
                'height': 600,
                'alt': 'frety_edit_image',
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

                <EditTab tab={tab}/>
            </>
        )
    } catch {
        return <NotFound/>;
    }
}

export default EditTabPage;