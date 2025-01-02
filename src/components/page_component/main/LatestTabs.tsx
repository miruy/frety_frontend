import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import {Heart} from "lucide-react";
import Pagination from "@/components/page_component/common/Pagination";
import {PageRsSearchTabsResponse} from "@/openapi/model";
import {useState} from "react";
import {useSearchTabs} from "@/openapi/api/tab/tab";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import * as React from "react";

const LatestTabs = ({recentTabsData}: { recentTabsData: PageRsSearchTabsResponse }) => {

    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

    // 최근등록순 악보 전체조회 클라이언트사이드 렌더링 + 페이지네이션
    // const {
    //     data: recentTabs,
    //     isLoading: isLoadingRecent,
    //     isError: isErrorRecent,
    // } = useQuery({
    //     queryKey: ['RecentTabs', currentPage], // 쿼리 키
    //     queryFn: () => searchTabs({sort: 'RECENT', page: currentPage, pageSize: 10}),
    //     initialData: currentPage === 0 ? recentTabsData : undefined,
    // });

    const {
        data: recentTabs,
        isLoading: isLoadingRecent,
        isError: isErrorRecent,
    } = useSearchTabs({page: currentPage, pageSize: 10}, {
        query: {
            queryKey: ['RecentTabs', currentPage],
            // initialData: currentPage === 0 ? recentTabsData : undefined
        },
    });

    const handleDetailTab = (tabId: number) => {
        router.push("/tab/" + tabId);
    }

    if (isLoadingRecent) {
        return <Loading/>
    }
    if (isErrorRecent) {
        return <NotFound/>
    }

    return (
        <div className="space-y-10">
            <Table>
                <TableHeader>
                    <TableRow className="cursor-default hover:bg-transparent">
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
                    {recentTabs?.data?.map((latestTab, index) => {
                        return (
                            <TableRow key={index} className="cursor-pointer"
                                      onClick={() => handleDetailTab(latestTab.id!)}>
                                <TableCell className="text-center">{latestTab.artist}</TableCell>
                                <TableCell className="text-center">{latestTab.song}</TableCell>
                                <div className="flex flex-1 items-center">
                                    <TableCell
                                        className="hidden md:flex flex-1 justify-center items-center text-center">{latestTab.voteCount}</TableCell>
                                </div>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <div>
                <Pagination
                    totalPage={recentTabs?.meta?.totalPage || 1}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    buttonSize={5}
                    hasPreviousPage={recentTabs?.meta?.hasPreviousPage}
                    hasNextPage={recentTabs?.meta?.hasNextPage}
                />
            </div>
        </div>
    )
}

export default LatestTabs;