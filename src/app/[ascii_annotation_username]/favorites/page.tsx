import NotFound from "@/app/not-found";
import {GetServerSidePropsContext} from "next";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {prefetchSearchTabs} from "@/openapi/api/tab/tab";
import {PageRsSearchTabsResponse} from "@/openapi/model";
import MyFavoriteAllTabs from "@/components/page/MyFavoriteAllTabs";

const MyFavoriteTabsPage = async (context: GetServerSidePropsContext) => {

    const {ascii_annotation_username} = context.params!;

    if (typeof ascii_annotation_username !== 'string') {
        return <NotFound/>;
    }

    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966
    const userName = decodingUserName.replace("@", "") // dbflarla4966

    try {

        // 내가 즐겨찾는 악보로 바꿔야함!
        const myFavoriteQueryClient = new QueryClient();
        await prefetchSearchTabs(myFavoriteQueryClient, {sort: "RECENT", page: 0, pageSize: 10});
        const myFavoriteDehydratedState = dehydrate(myFavoriteQueryClient);

        const myFavoriteTabQueries = myFavoriteDehydratedState.queries || [];

        let myFavoriteTabData: PageRsSearchTabsResponse = {
            data: [], meta: {
                page: 0,
                pageSize: 0,
                totalCount: 0,
                totalPage: 0,
                hasPreviousPage: false,
                hasNextPage: false
            }
        };

        myFavoriteTabQueries.forEach(query => {
            myFavoriteTabData = query.state.data as PageRsSearchTabsResponse;
        });

        return (
            <MyFavoriteAllTabs myFavoriteTabData={myFavoriteTabData} userName={userName}/>
        );
    } catch {
        return <NotFound/>;
    }
};

export default MyFavoriteTabsPage;