import NotFound from "@/app/not-found";
import MyFavoriteAllTabs from "@/components/page/MyFavoriteAllTabs";
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
        title: userName + '님이 즐겨찾는 악보',
        description: userName + '님이 즐겨찾는 악보',
        keywords: userName + '님이 즐겨찾는 악보',
        openGraph: {
            type: 'article',
            url: `https://www.frety.me/${decodingUserName}/favorites`,
            siteName: 'Frety - 프렛티',
            title: userName + '님이 즐겨찾는 악보',
            description: userName + '님이 즐겨찾는 악보',
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
            canonical: `https://www.frety.me/${decodingUserName}/favorites`,
            languages: {
                'ko-KR': `https://www.frety.me/${decodingUserName}/favorites`
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

const MyFavoriteTabsPage = async ({params}: Props) => {

    const {ascii_annotation_username} = params;

    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966
    const userName = decodingUserName.replace("@", "") // dbflarla4966

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'article',
        'name': userName + '님이 즐겨찾는 악보',
        'description': userName + '님이 즐겨찾는 악보',
        'url': `https://www.frety.me/${decodingUserName}/favorites`,
        'image': {
            '@type': `articleImage_favorites`,
            'url': 'https://www.frety.me/image/favicon.png',
            'width': 800,
            'height': 600,
            'alt': 'frety_favorites_image',
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

                <MyFavoriteAllTabs userName={userName}/>
            </>
        )
    } catch {
        return <NotFound/>;
    }
};

export default MyFavoriteTabsPage;