import EditTab from "@/components/page/EditTab";
import {getTabById} from "@/openapi/api/tab/tab";
import TabDetail from "@/components/page/TabDetail";
import NotFound from "@/app/not-found";

interface TabProps {
    params: {
        tabId: string;
    };
}

const EditTabPage = async ({params}: TabProps) => {

    const {tabId} = params;

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