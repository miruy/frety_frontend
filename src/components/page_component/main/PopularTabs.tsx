import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import {PageRsSearchTabsResponse} from "@/openapi/model";
import {Heart} from "lucide-react";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {searchTabs} from "@/openapi/api/tab/tab";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import * as React from "react";

const PopularTabs = ({voteTabsData}: { voteTabsData: PageRsSearchTabsResponse }) => {

    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

    // 인기 순 악보 전체조회 클라이언트사이드 렌더링 + 페이지네이션
    const {
        data: voteTabs,
        isLoading: isLoadingRecent,
        isError: isErrorRecent,
    } = useQuery({
        queryKey: ['VoteTabs', currentPage], // 쿼리 키
        queryFn: () => searchTabs({sort: 'VOTE', page: currentPage, pageSize: 10}),
        initialData: currentPage === 0 ? voteTabsData : undefined,
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
                {/*<TableBody>*/}
                {/*{voteTabs?.data?.map((voteTab, index) => {*/}
                {/*    return (*/}
                {/*        <TableRow key={index} className="cursor-pointer"*/}
                {/*                  onClick={() => handleDetailTab(voteTab.id!)}>*/}
                {/*            <TableCell className="text-center">{voteTab.artist}</TableCell>*/}
                {/*            <TableCell className="text-center">{voteTab.song}</TableCell>*/}
                {/*            <div className="flex flex-1 items-center">*/}
                {/*                <TableCell*/}
                {/*                    className="hidden md:flex flex-1 justify-center items-center text-center">{voteTab.voteCount}</TableCell>*/}
                {/*            </div>*/}
                {/*        </TableRow>*/}
                {/*    )*/}
                {/*})}*/}
                {/*</TableBody>*/}
            </Table>
            <div className="flex flex-1 justify-center">현재 준비 중인 서비스입니다.</div>

            {/*<div>*/}
            {/*    <Pagination*/}
            {/*        totalPage={voteTabs?.meta?.totalPage || 1}*/}
            {/*        setCurrentPage={setCurrentPage}*/}
            {/*        currentPage={currentPage}*/}
            {/*        buttonSize={5}*/}
            {/*        hasPreviousPage={voteTabs?.meta?.hasPreviousPage}*/}
            {/*        hasNextPage={voteTabs?.meta?.hasNextPage}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    )
}

export default PopularTabs;