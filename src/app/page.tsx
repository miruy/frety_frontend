import Main from "@/components/page/Main";
import {searchTabsByCreatedAtDesc, searchTabsByRatingCountDesc} from "@/openapi/api/tab/tab";
import NotFound from "@/app/not-found";

export default async function Home() {

    const tabsByCreateAt = await searchTabsByCreatedAtDesc();
    const tabsByRatingCount = await searchTabsByRatingCountDesc();

    try {
        return (
            <Main tabsByCreateAt={tabsByCreateAt} tabsByRatingCount={tabsByRatingCount}/>
        );
    } catch {
        return <NotFound/>;
    }
}
