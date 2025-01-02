import Api from "@/components/page/Api";
import {Metadata} from "next";
import SeoHead from "@/components/common/SeoHead";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Frety | API 문서',
        description: 'Frety | API 문서',
        keywords: 'Frety | API 문서',
        openGraph: {
            type: 'article',
            url: `https://www.frety.me/api`,
            siteName: 'Frety - 프렛티',
            title: 'Frety | API 문서',
            description: 'Frety | API 문서',
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
            canonical: `https://www.frety.me/api`,
            languages: {
                'ko-KR': `https://www.frety.me/api`
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

export default function APIPage() {

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'article',
        'name': 'Frety | API 문서',
        'description': 'Frety | API 문서',
        'url': `https://www.frety.me/api`,
        'image': {
            '@type': `articleImage_api`,
            'url': 'https://www.frety.me/image/favicon.png',
            'width': 800,
            'height': 600,
            'alt': 'frety_api_image',
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

            <Api/>
        </>
    )
}