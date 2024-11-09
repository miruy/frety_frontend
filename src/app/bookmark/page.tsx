import NotFound from "@/app/not-found";
import Bookmark from "@/components/page/Bookmark";

const BookmarkTabPage = async () => {

    try {
        return (
            <Bookmark/>
        );
    } catch {
        return <NotFound/>;
    }
};

export default BookmarkTabPage;