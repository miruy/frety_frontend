import CreateTab from "@/components/page/CreateTab";
import {Metadata} from "next";
import SeoHead from "@/components/common/SeoHead";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Frety | 악보 제작',
        description: 'Frety | 악보 제작',
        keywords: 'Frety | 악보 제작',
        openGraph: {
            type: 'article',
            url: `https://www.frety.me/create`,
            siteName: 'Frety - 프렛티',
            title: 'Frety | 악보 제작',
            description: 'Frety | 악보 제작',
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
            canonical: `https://www.frety.me/create`,
            languages: {
                'ko-KR': `https://www.frety.me/create`
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

export default function CreateTabPage() {

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'article',
        'name': 'Frety | 악보 제작',
        'description': 'Frety | 악보 제작',
        'url': `https://www.frety.me/cretae`,
        'image': {
            '@type': `articleImage_create}`,
            'url': 'https://www.frety.me/image/favicon.png',
            'width': 800,
            'height': 600,
            'alt': 'frety_create_image',
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

            <CreateTab/>
        </>
    );
}