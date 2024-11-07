import EditTab from "@/components/page/EditTab";
import {getTabById} from "@/openapi/api/tab/tab";
import NotFound from "@/app/not-found";
import {GetServerSidePropsContext} from "next";

const EditTabPage = async (context: GetServerSidePropsContext) => {

    const {tabId} = context.params!;

    if (typeof tabId !== 'string') {
        return <NotFound/>;
    }

    try {

        const tab = await getTabById(Number(tabId));

        return (
            <EditTab tab={tab} tabId={tabId}/>
        )
    } catch {
        return <NotFound/>;
    }
}

export default EditTabPage;