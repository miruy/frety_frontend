import {GetServerSidePropsContext} from "next";
import NotFound from "@/app/not-found";
import {prefetchSearchTabs} from "@/openapi/api/tab/tab";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {PageRsSearchTabsResponse} from "@/openapi/model";
import Search from "@/components/page/Search";

const SearchTabPage = async (context: GetServerSidePropsContext) => {

    let {keyword} = context.params!;

    if (!keyword || typeof keyword !== 'string') {
        keyword = "검색어를 입력하세요"
    }

    const decodingKeyword = decodeURIComponent(keyword);

    try {

        const searchQueryClient = new QueryClient();
        await prefetchSearchTabs(searchQueryClient, {sort: "RECENT", keyword: decodingKeyword, page: 0, pageSize: 10});
        const searchDehydratedState = dehydrate(searchQueryClient);

        const searchTabQueries = searchDehydratedState.queries || [];

        let searchTabData: PageRsSearchTabsResponse = {
            data: [], meta: {
                page: 0,
                pageSize: 0,
                totalCount: 0,
                totalPage: 0,
                hasPreviousPage: false,
                hasNextPage: false
            }
        };

        searchTabQueries.forEach(query => {
            searchTabData = query.state.data as PageRsSearchTabsResponse;
        });

        return (
            <HydrationBoundary state={searchTabData}>
                <Search searchedTabData={searchTabData} keyword={decodingKeyword}/>
            </HydrationBoundary>
        );
    } catch {
        return <NotFound/>;
    }
};

export default SearchTabPage;