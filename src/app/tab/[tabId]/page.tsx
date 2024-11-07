import TabDetail from "@/components/page/TabDetail";
import NotFound from "@/app/not-found";
import {getTabById} from "@/openapi/api/tab/tab";
import {GetServerSidePropsContext} from "next";

const TabDetailPage = async (context: GetServerSidePropsContext) => {

    const {tabId} = context.params!;

    if (typeof tabId !== 'string') {
        return <NotFound/>;
    }

    try {

        const tab = await getTabById(Number(tabId));

        return (
            <TabDetail tab={tab}/>
        )
    } catch {
        return <NotFound/>;
    }
}

export default TabDetailPage;