import Main from "@/components/page/Main";
import {
    prefetchSearchTabs,
} from "@/openapi/api/tab/tab";
import NotFound from "@/app/not-found";
import {dehydrate, Hydrate, QueryClient} from "@tanstack/react-query";
import {ServerSidePrefetchSearchTabsResponse} from "@/response/ServerSidePrefetchSearchTabsResponse";

export default async function Home() {

    // 최근등록순 서버사이들 렌더링
    const recentQueryClient = new QueryClient();
    await prefetchSearchTabs(recentQueryClient, {sort: "RECENT", page: 0, pageSize: 10});
    const recentDehydratedState = dehydrate(recentQueryClient);

    // 투표순 서버사이들 렌더링
    const voteQueryClient = new QueryClient();
    await prefetchSearchTabs(voteQueryClient, {sort: "VOTE", page: 0, pageSize: 10});
    const voteDehydratedState = dehydrate(voteQueryClient);

    // 최근등록순, 투표순을 하나의 배열로 병합
    const allQueries = [
        ...(recentDehydratedState.queries || []),
        ...(voteDehydratedState.queries || []),
    ];

    // queryKey.sort가 "RECENT"와 "VOTE"인 state.data 추출
    let recentData: ServerSidePrefetchSearchTabsResponse = {
        data: [], meta: {
            page: 0,
            pageSize: 0,
            totalCount: 0,
            totalPage: 0,
            hasPreviousPage: false,
            hasNextPage: false
        }
    };
    let voteData: ServerSidePrefetchSearchTabsResponse = {
        data: [], meta: {
            page: 0,
            pageSize: 0,
            totalCount: 0,
            totalPage: 0,
            hasPreviousPage: false,
            hasNextPage: false
        }
    };

    allQueries.forEach(query => {
        const queryKey = query.queryKey[1] as { sort: string };

        if (queryKey.sort === "RECENT") {
            recentData = query.state.data as ServerSidePrefetchSearchTabsResponse;
        } else if (queryKey.sort === "VOTE") {
            voteData = query.state.data as ServerSidePrefetchSearchTabsResponse;
        }
    });

    try {
        return (
            <Hydrate state={{queries: allQueries}}>
                <Main recentTabsData={recentData} voteTabsData={voteData}/>
            </Hydrate>
        );
    } catch {
        return <NotFound/>;
    }
}
