import NotFound from "@/app/not-found";
import {GetServerSidePropsContext} from "next";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {prefetchSearchTabs} from "@/openapi/api/tab/tab";
import {PageRsSearchTabsResponse} from "@/openapi/model";
import MyVotedTabs from "@/components/page/MyVotedTabs";

const MyVotedTabsPage = async (context: GetServerSidePropsContext) => {

    const {ascii_annotation_username} = context.params!;

    if (typeof ascii_annotation_username !== 'string') {
        return <NotFound/>;
    }

    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966
    const userName = decodingUserName.replace("@", "") // dbflarla4966

    try {

        // 내가 좋아요 표시한 악보로 바꿔야함!
        const myVotedQueryClient = new QueryClient();
        await prefetchSearchTabs(myVotedQueryClient, {sort: "RECENT", page: 0, pageSize: 10});
        const myVotedDehydratedState = dehydrate(myVotedQueryClient);

        const myVotedTabQueries = myVotedDehydratedState.queries || [];

        let myVotedTabData: PageRsSearchTabsResponse = {
            data: [], meta: {
                page: 0,
                pageSize: 0,
                totalCount: 0,
                totalPage: 0,
                hasPreviousPage: false,
                hasNextPage: false
            }
        };

        myVotedTabQueries.forEach(query => {
            myVotedTabData = query.state.data as PageRsSearchTabsResponse;
        });

        return (
            <MyVotedTabs myVotedTabData={myVotedTabData} userName={userName}/>
        );
    } catch {
        return <NotFound/>;
    }
};

export default MyVotedTabsPage;