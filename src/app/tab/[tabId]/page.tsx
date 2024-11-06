import TabDetail from "@/components/page/TabDetail";
import NotFound from "@/app/not-found";
import {getTabById} from "@/openapi/api/tab/tab";

interface TabProps {
    params: {
        tabId: string;
    };
}

const TabDetailPage = async ({params}: TabProps) => {

    const {tabId} = params;

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