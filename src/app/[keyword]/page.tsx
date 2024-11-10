import Search from "@/components/page/Search";
import {GetServerSidePropsContext} from "next";
import NotFound from "@/app/not-found";
import {searchTabsByKeyword} from "@/openapi/api/tab/tab";

const SearchTabPage = async (context: GetServerSidePropsContext) => {

    const {keyword} = context.params!;

    if (typeof keyword !== 'string') {
        return <NotFound/>;
    }

    try {
        const tabs = await searchTabsByKeyword(keyword);

        return (
            <Search tabs={tabs} keyword={keyword} />
        );
    } catch {
        return <NotFound/>;
    }
};

export default SearchTabPage;