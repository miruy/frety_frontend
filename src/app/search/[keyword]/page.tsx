import NotFound from "@/app/not-found";
import {prefetchSearchTabs} from "@/openapi/api/tab/tab";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {PageRsSearchTabsResponse} from "@/openapi/model";
import Search from "@/components/page/Search";

interface Props {
    params: {
        keyword: string;
    };
}

const SearchTabPage = async ({params}: Props) => {

    const {keyword} = params;

    const decodingKeyword = decodeURIComponent(keyword);

    try {

        const searchTabQueryClient = new QueryClient();
        await prefetchSearchTabs(searchTabQueryClient, {
            sort: "RECENT",
            keyword: decodingKeyword,
            page: 0,
            pageSize: 10
        });
        const searchBySongDehydratedState = dehydrate(searchTabQueryClient);

        const searchTabQueries = searchBySongDehydratedState.queries || [];

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