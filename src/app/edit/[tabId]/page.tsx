import EditTab from "@/components/page/EditTab";
import {getTabById} from "@/openapi/api/tab/tab";
import NotFound from "@/app/not-found";

interface Props {
    params: {
        tabId: string;
    };
}

const EditTabPage = async ({params}: Props) => {

    const {tabId} = params;

    try {
        const tab = await getTabById(Number(tabId));

        return <EditTab tab={tab}/>
    } catch {
        return <NotFound/>;
    }
}

export default EditTabPage;