import Search from "@/components/page/Search";
import {GetServerSidePropsContext} from "next";
import NotFound from "@/app/not-found";

const SearchTabPage = async (context: GetServerSidePropsContext) => {

    const {keyword} = context.params!;

    if (typeof keyword !== 'string') {
        return <NotFound/>;
    }

    try {

        // const tab = await getTabById(Number(tabId));

        return (
            <Search/>
        );
    } catch {
        return <NotFound/>;
    }
};

export default SearchTabPage;