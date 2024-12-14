import NotFound from "@/app/not-found";
import MyCreatedAllTabs from "@/components/page/MyCreatedAllTabs";
import {Metadata} from "next";
import SeoHead from "@/components/common/SeoHead";

interface Props {
    params: {
        ascii_annotation_username: string;
    };
}

export async function generateMetadata({params}: Props): Promise<Metadata> {

    const {ascii_annotation_username} = params;
    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966
    const userName = decodingUserName.replace("@", "") // dbflarla4966

    return {
        title: userName + '님이 제작한 악보',
        description: userName + '님이 제작한 악보',
        keywords: userName + '님이 제작한 악보',
        openGraph: {
            type: 'article',
            url: `https://www.frety.me/${decodingUserName}/creations`,
            siteName: 'Frety - 프렛티',
            title: userName + '님이 제작한 악보',
            description: userName + '님이 제작한 악보',
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
            canonical: `https://www.frety.me/${decodingUserName}/creations`,
            languages: {
                'ko-KR': `https://www.frety.me/${decodingUserName}/creations`
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

const MyCreatedTabsPage = async ({params}: Props) => {

    const {ascii_annotation_username} = params;

    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966
    const userName = decodingUserName.replace("@", ""); // dbflarla4966

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'article',
        'name': userName + '님이 제작한 악보',
        'description': userName + '님이 제작한 악보',
        'url': `https://www.frety.me/${decodingUserName}/creations`,
        'image': {
            '@type': `articleImage_creations`,
            'url': 'https://www.frety.me/image/favicon.png',
            'width': 800,
            'height': 600,
            'alt': 'frety_creations_image',
        },
    };

    try {
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

                <MyCreatedAllTabs userName={userName}/>
            </>
        )
    } catch {
        return <NotFound/>;
    }
};

export default MyCreatedTabsPage;
