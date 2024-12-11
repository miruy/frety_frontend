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

    let allTabs: SearchTabsResponse[] = [];
    let currentPage = 0;
    const pageSize = 10;

    // 페이지네이션을 고려하여 모든 탭을 가져옴
    while (true) {
        // `searchTabs` API 호출, page와 pageSize 파라미터 사용
        const tabsResponse = await searchTabs({
            sort: "RECENT",
            page: currentPage,
            pageSize: pageSize
        });

        // 받아온 데이터가 없다면 종료
        if (!tabsResponse.data || tabsResponse.data.length === 0) {
            break;
        }

        // 받아온 데이터를 allTabs 배열에 추가
        allTabs = [...allTabs, ...tabsResponse.data];

        // 다음 페이지로 이동
        currentPage++;
    }

    // `tabs.data`가 undefined일 경우 빈 배열을 반환
    const sitemapFromTabs: MetadataRoute.Sitemap = allTabs.map((tab) => {
        return {
            url: 'https://www.frety.me/tab/' + tab.id, // 실제 URL 경로에 맞게 수정
            lastModified: new Date(tab.createdAt!),  // 실제 날짜 정보 사용
            changeFrequency: "daily",
            priority: 0.7,
        };
    }) || [];  // undefined일 경우 빈 배열로 처리

    return [...defaultSiteMap, ...sitemapFromTabs];
}
