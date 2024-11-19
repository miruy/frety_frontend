import NotFound from "@/app/not-found";
import {GetServerSidePropsContext} from "next";
import MyCreatedTabs from "@/components/page/MyCreatedTabs";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {prefetchSearchTabs} from "@/openapi/api/tab/tab";
import {PageRsSearchTabsResponse} from "@/openapi/model";

const MyCreatedTabsPage = async (context: GetServerSidePropsContext) => {

    const {ascii_annotation_username} = context.params!;

    if (typeof ascii_annotation_username !== 'string') {
        return <NotFound/>;
    }

    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966
    const userName = decodingUserName.replace("@", "") // dbflarla4966

    try {

        // 내가 제작한 악보로 바꿔야함!
        const myCreatedQueryClient = new QueryClient();
        await prefetchSearchTabs(myCreatedQueryClient, {sort: "RECENT", page: 0, pageSize: 10});
        const myCreatedDehydratedState = dehydrate(myCreatedQueryClient);

        const myCreatedTabQueries = myCreatedDehydratedState.queries || [];

        let myCreatedTabData: PageRsSearchTabsResponse = {
            data: [], meta: {
                page: 0,
                pageSize: 0,
                totalCount: 0,
                totalPage: 0,
                hasPreviousPage: false,
                hasNextPage: false
            }
        };

        myCreatedTabQueries.forEach(query => {
            myCreatedTabData = query.state.data as PageRsSearchTabsResponse;
        });

        return (
            <MyCreatedTabs myCreatedTabData={myCreatedTabData} userName={userName}/>
        );
    } catch {
        return <NotFound/>;
    }
};

export default MyCreatedTabsPage;