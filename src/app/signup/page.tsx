import Signup from "@/components/page/Signup";
import {Metadata} from "next";
import SeoHead from "@/components/common/SeoHead";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Frety | 회원가입',
        description: 'Frety | 회원가입',
        keywords: 'Frety | 회원가입',
        openGraph: {
            type: 'article',
            url: `https://www.frety.me/signup`,
            siteName: 'Frety - 프렛티',
            title: 'Frety | 회원가입',
            description: 'Frety | 회원가입',
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
            canonical: `https://www.frety.me/signup`,
            languages: {
                'ko-KR': `https://www.frety.me/signup`
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

export default function SignupPage() {

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'article',
        'name': 'Frety | 회원가입',
        'description': 'Frety | 회원가입',
        'url': `https://www.frety.me/signup`,
        'image': {
            '@type': `articleImage_signup`,
            'url': 'https://www.frety.me/image/favicon.png',
            'width': 800,
            'height': 600,
            'alt': 'frety_signup_image',
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

            <Signup/>
        </>
    );
}
