import Login from "@/components/page/Login";
import {Metadata} from "next";
import SeoHead from "@/components/common/SeoHead";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Frety | 로그인',
        description: 'Frety | 로그인',
        keywords: 'Frety | 로그인',
        openGraph: {
            type: 'article',
            url: `https://www.frety.me/login`,
            siteName: 'Frety - 프렛티',
            title: 'Frety | 로그인',
            description: 'Frety | 로그인',
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
            canonical: `https://www.frety.me/login`,
            languages: {
                'ko-KR': `https://www.frety.me/login`
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

export default function LoginPage() {

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'article',
        'name': 'Frety | 로그인',
        'description': 'Frety | 로그인',
        'url': `https://www.frety.me/login`,
        'image': {
            '@type': `articleImage_login`,
            'url': 'https://www.frety.me/image/favicon.png',
            'width': 800,
            'height': 600,
            'alt': 'frety_login_image',
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

            <Login/>
        </>
    );
}
