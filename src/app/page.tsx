import Main from "@/components/page/Main";
import {
    prefetchSearchTabs,
} from "@/openapi/api/tab/tab";
import NotFound from "@/app/not-found";
import {dehydrate, QueryClient, HydrationBoundary} from "@tanstack/react-query";
import {PageRsSearchTabsResponse} from "@/openapi/model";

const Home = async () => {

    try {
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

        return (
            <HydrationBoundary state={recentData}>
                <Main recentTabsData={recentData}/>
            </HydrationBoundary>
        );
    } catch {
        return <NotFound/>;
    }
}

export default Home;