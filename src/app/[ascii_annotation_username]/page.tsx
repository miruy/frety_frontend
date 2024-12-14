import NotFound from "@/app/not-found";
import MyTabs from "@/components/page/MyTabs";
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
        title: userName + '님의 악보리스트',
        description: userName + '님의 악보리스트',
        keywords: userName + '님의 악보리스트',
        openGraph: {
            type: 'article',
            url: `https://www.frety.me/${decodingUserName}`,
            siteName: 'Frety - 프렛티',
            title: userName + '님의 악보리스트',
            description: userName + '님의 악보리스트',
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
            canonical: `https://www.frety.me/${decodingUserName}`,
            languages: {
                'ko-KR': `https://www.frety.me/${decodingUserName}`
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

const MyTabsPage = async ({params}: Props) => {

    const {ascii_annotation_username} = params;
    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966

    if (!decodingUserName.startsWith("@")) {
        return <NotFound/>;
    }

    const userName = decodingUserName.replace("@", "") // dbflarla4966

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'article',
        'name': userName + '님의 악보리스트',
        'description': userName + '님의 악보리스트',
        'url': `https://www.frety.me/${decodingUserName}`,
        'image': {
            '@type': `articleImage_myTabs`,
            'url': 'https://www.frety.me/image/favicon.png',
            'width': 800,
            'height': 600,
            'alt': 'frety_myTabs_image',
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

                <MyTabs userName={userName}/>
            </>
        )
    } catch {
        return <NotFound/>;
    }
};

export default MyTabsPage;