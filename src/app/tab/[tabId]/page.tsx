import NotFound from "@/app/not-found";
import {getTabById, prefetchGetTabById, prefetchSearchTabs} from "@/openapi/api/tab/tab";
import {GetServerSidePropsContext} from "next";
import DetailTab from "@/components/page/DetailTab";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {PageRsSearchTabsResponse} from "@/openapi/model";

const DetailTabPage = async (context: GetServerSidePropsContext) => {

    const {tabId} = context.params!;

    if (typeof tabId !== 'string') {
        return <NotFound/>;
    }

    try {

        // const tab = await getTabById(Number(tabId));
        // 최근등록순 서버사이들 렌더링
        const recentQueryClient = new QueryClient();
        await prefetchGetTabById(recentQueryClient, Number(tabId));
        const recentDehydratedState = dehydrate(recentQueryClient);

        console.log("recentDehydratedState", recentDehydratedState.queries)
        return (
            <></>
            // <DetailTab tab={tab}/>
        )
    } catch {
        return <NotFound/>;
    }
}

export default DetailTabPage;