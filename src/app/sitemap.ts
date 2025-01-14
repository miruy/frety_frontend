import {MetadataRoute} from 'next'
import {searchTabs} from "@/openapi/api/tab/tab";
import {SearchTabsResponse} from "@/openapi/model";

const defaultSiteMap: MetadataRoute.Sitemap = [
    {
        url: 'https://www.frety.me',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
    },
    {
        url: 'https://www.frety.me/login',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    },
    {
        url: 'https://www.frety.me/signup',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    },
    {
        url: 'https://www.frety.me/search',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        let allTabs: SearchTabsResponse[] = [];
        let currentPage = 0;
        const pageSize = 10;

        while (true) {
            const tabsResponse = await searchTabs({
                // sort: "RECENT",
                page: currentPage,
                pageSize: pageSize,
            });

            if (!tabsResponse.data || tabsResponse.data.length === 0) {
                break;
            }

            allTabs = [...allTabs, ...tabsResponse.data];
            currentPage++;
        }

        const sitemapFromTabs: MetadataRoute.Sitemap = allTabs.map((tab) => ({
            url: `https://www.frety.me/tab/${tab.id}`,
            lastModified: new Date(tab.createdAt!),
            changeFrequency: "daily",
            priority: 0.7,
        }));

        return [...defaultSiteMap, ...sitemapFromTabs];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return defaultSiteMap; // 기본 사이트맵만 반환
    }
}