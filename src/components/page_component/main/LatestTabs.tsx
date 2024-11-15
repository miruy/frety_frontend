import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import {Heart} from "lucide-react";
import Pagination from "@/components/page_component/common/Pagination";
import {PageRsSearchTabsResponse} from "@/openapi/model";

const LatestTabs = ({tabs, currentPage, setCurrentPage}: {
    tabs: PageRsSearchTabsResponse,
    currentPage: number,
    setCurrentPage: (newPage: number) => void
}) => {

    const router = useRouter();

    const handleDetailTab = (tabId: number) => {
        router.push("/tab/" + tabId);
    }

    return (
        <div className="space-y-10">
            <Table>
                <TableHeader>
                    <TableRow className="cursor-default hover:bg-transparent">
                        <TableHead className="text-center">no</TableHead>
                        <TableHead className="text-center">Artist</TableHead>
                        <TableHead className="text-center">Song</TableHead>
                        <div className="flex flex-1 items-center">
                            <TableHead
                                className="hidden md:flex flex-1 justify-center items-center text-center">
                                <Heart className="w-4"/>
                            </TableHead>
                        </div>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tabs.data?.map((latestTab, index) => {
                        return (
                            <TableRow key={index} className="cursor-pointer"
                                      onClick={() => handleDetailTab(latestTab.id!)}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="text-center">{latestTab.artist}</TableCell>
                                <TableCell className="text-center">{latestTab.song}</TableCell>
                                <div className="flex flex-1 items-center">
                                    <TableCell
                                        className="hidden md:flex flex-1 justify-center items-center text-center">{latestTab.ratingCount}</TableCell>
                                </div>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <div>
                <Pagination
                    totalPage={tabs.meta?.totalPage || 1}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    buttonSize={5}
                    hasPreviousPage={tabs.meta?.hasPreviousPage}
                    hasNextPage={tabs.meta?.hasNextPage}
                />
            </div>
        </div>
    )
}

export default LatestTabs;