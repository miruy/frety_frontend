import NotFound from "@/app/not-found";
import {prefetchGetTabById} from "@/openapi/api/tab/tab";
import {GetServerSidePropsContext} from "next";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import DetailTab from "@/components/page/DetailTab";
import {GetTabByIdResponse} from "@/openapi/model";

const DetailTabPage = async (context: GetServerSidePropsContext) => {

    const tabId = Number(context.params?.tabId) || 0;

    try {

        const recentQueryClient = new QueryClient();
        await prefetchGetTabById(recentQueryClient, tabId);
        const recentDehydratedState = dehydrate(recentQueryClient);

        const detailTab = recentDehydratedState.queries.map(data => data.state.data) as GetTabByIdResponse;

        return (
            <HydrationBoundary state={detailTab}>
                <DetailTab detailTab={detailTab} tabId={tabId}/>
            </HydrationBoundary>
        )
    } catch {
        return <NotFound/>;
    }
}

export default DetailTabPage;