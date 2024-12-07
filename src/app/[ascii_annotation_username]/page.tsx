import NotFound from "@/app/not-found";
import MyTabs from "@/components/page/MyTabs";

interface Props {
    params: {
        ascii_annotation_username: string;
    };
}

const MyTabsPage = async ({params}: Props) => {

    const {ascii_annotation_username} = params;

    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966

    if (!decodingUserName.startsWith("@")) {
        return <NotFound/>;
    }

    const userName = decodingUserName.replace("@", "") // dbflarla4966

    try {
        return <MyTabs userName={userName}/>
    } catch {
        return <NotFound/>;
    }
};

export default MyTabsPage;