import Head from "next/head";
import React from "react";

interface SeoHeadProps {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogType: string;
    ogUrl: string;
    ogImage: string;
    ogImageAlt: string;
    jsonLd: {
        '@context': string;
        '@type': string;
        name: string;
        description: string;
        url: string;
        image: {
            '@type': string;
            url: string;
            width: number;
            height: number;
        };
    };
}

const SeoHead = ({
                     title,
                     description,
                     ogTitle,
                     ogDescription,
                     ogType,
                     ogUrl,
                     ogImage,
                     ogImageAlt,
                     jsonLd
                 }: SeoHeadProps) => {

    const baseUrl = "https://www.frety.me";

    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="index, follow"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta charSet="utf-8"/>

            <meta property="title" content={title}/>
            <meta property="description" content={description}/>

            <meta property="og:title" content={ogTitle}/>
            <meta property="og:description" content={ogDescription}/>
            <meta property="og:type" content={ogType}/>
            <meta property="og:url" content={ogUrl}/>
            <meta property="og:site_name" content="Frety 프렛티"/>
            <meta property="og:locale" content="ko_KR"/>
            <meta property="og:image" content={ogImage}/>
            <meta property="og:image:width" content="800"/>
            <meta property="og:image:height" content="600"/>
            <meta property="og:image:alt" content={ogImageAlt}/>

            <link rel="canonical" href={ogUrl}/>
            <link rel="alternate" href={ogUrl} hrefLang="ko_KR"/>

            <link rel="icon" href={`${baseUrl}/favicon.ico`} type="image/x-icon"/>
            <link rel="icon" href={`${baseUrl}/image/favicon.png`} sizes="512x512" type="image/png"/>

            {/* 웹사이트 소개 정보 구조화 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </Head>

    )
}

export default SeoHead;