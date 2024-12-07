import NotFound from "@/app/not-found";
import MyFavoriteAllTabs from "@/components/page/MyFavoriteAllTabs";

interface Props {
    params: {
        ascii_annotation_username: string;
    };
}

const MyFavoriteTabsPage = async ({params}: Props) => {

    const {ascii_annotation_username} = params;

    const decodingUserName = decodeURIComponent(ascii_annotation_username); // @dbflarla4966
    const userName = decodingUserName.replace("@", "") // dbflarla4966

    try {
        return <MyFavoriteAllTabs userName={userName}/>
    } catch {
        return <NotFound/>;
    }
};

export default MyFavoriteTabsPage;