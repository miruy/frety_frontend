import NotFound from "@/app/not-found";
import {getTabById} from "@/openapi/api/tab/tab";
import {GetServerSidePropsContext} from "next";
import DetailTab from "@/components/page/DetailTab";

const DetailTabPage = async (context: GetServerSidePropsContext) => {

    const {tabId} = context.params!;

    if (typeof tabId !== 'string') {
        return <NotFound/>;
    }

    try {

        const tab = await getTabById(Number(tabId));

        return (
            <DetailTab tab={tab}/>
        )
    } catch {
        return <NotFound/>;
    }
}

export default DetailTabPage;