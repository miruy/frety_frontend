import Main from "@/components/page/Main";
import {searchTabs} from "@/openapi/api/tab/tab";
import NotFound from "@/app/not-found";

export default async function Home() {
    
    const tabs = await searchTabs();

    try {
        return (
            <Main tabs={tabs}/>
        );
    } catch {
        return <NotFound/>;
    }
}
