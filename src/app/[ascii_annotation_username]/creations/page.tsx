import NotFound from "@/app/not-found";
import {GetServerSidePropsContext} from "next";
import MyCreatedAllTabs from "@/components/page/MyCreatedAllTabs";

const MyCreatedTabsPage = async (context: GetServerSidePropsContext) => {

    const {ascii_annotation_username} = context.params!;

    if (typeof ascii_annotation_username !== 'string') {
        return <NotFound/>;
    }

    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966
    const userName = decodingUserName.replace("@", "") // dbflarla4966

    try {
        return (
            <MyCreatedAllTabs userName={userName}/>
        );
    } catch {
        return <NotFound/>;
    }
};

export default MyCreatedTabsPage;