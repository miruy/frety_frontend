import NotFound from "@/app/not-found";
import MyVotedAllTabs from "@/components/page/MyVotedAllTabs";

interface Props {
    params: {
        ascii_annotation_username: string;
    };
}

const MyVotedTabsPage = async ({params}: Props) => {

    const {ascii_annotation_username} = params;

    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966
    const userName = decodingUserName.replace("@", "") // dbflarla4966

    try {
        return <MyVotedAllTabs userName={userName}/>
    } catch {
        return <NotFound/>;
    }
};

export default MyVotedTabsPage;