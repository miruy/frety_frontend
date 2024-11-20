import Main from "@/components/page/Main";
import {
    prefetchSearchTabs,
} from "@/openapi/api/tab/tab";
import NotFound from "@/app/not-found";
import {dehydrate, QueryClient, HydrationBoundary} from "@tanstack/react-query";
import {PageRsSearchTabsResponse} from "@/openapi/model";

const Home = async () => {

    try {
        // 최근 등록 순 악보 전체조회
        const recentQueryClient = new QueryClient();
        await prefetchSearchTabs(recentQueryClient, {sort: "RECENT", page: 0, pageSize: 10});
        const recentDehydratedState = dehydrate(recentQueryClient);

        const recentQueries = recentDehydratedState.queries || [];

        let recentData: PageRsSearchTabsResponse = {
            data: [], meta: {
                page: 0,
                pageSize: 0,
                totalCount: 0,
                totalPage: 0,
                hasPreviousPage: false,
                hasNextPage: false
            }
        };

        recentQueries.forEach(query => {
            recentData = query.state.data as PageRsSearchTabsResponse;
        });


        // 인기 순 악보 전체조회
        const voteQueryClient = new QueryClient();
        await prefetchSearchTabs(voteQueryClient, {sort: "VOTE", page: 0, pageSize: 10});
        const voteDehydratedState = dehydrate(voteQueryClient);

        const voteQueries = voteDehydratedState.queries || [];

        let voteData: PageRsSearchTabsResponse = {
            data: [], meta: {
                page: 0,
                pageSize: 0,
                totalCount: 0,
                totalPage: 0,
                hasPreviousPage: false,
                hasNextPage: false
            }
        };

        voteQueries.forEach(query => {
            voteData = query.state.data as PageRsSearchTabsResponse;
        });

        return (
            <HydrationBoundary state={recentData}>
                <Main recentTabsData={recentData} voteTabsData={voteData}/>
            </HydrationBoundary>
        );
    } catch {
        return <NotFound/>;
    }
}

export default Home;