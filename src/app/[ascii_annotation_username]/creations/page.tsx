import NotFound from "@/app/not-found";
import MyCreatedAllTabs from "@/components/page/MyCreatedAllTabs";

interface Props {
    params: {
        ascii_annotation_username: string;
    };
}

const MyCreatedTabsPage = async ({params}: Props) => {

    const {ascii_annotation_username} = params;

    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966
    const userName = decodingUserName.replace("@", ""); // dbflarla4966

    try {
        return <MyCreatedAllTabs userName={userName}/>
    } catch {
        return <NotFound/>;
    }
};

export default MyCreatedTabsPage;
