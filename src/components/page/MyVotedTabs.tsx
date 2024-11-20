'use client';

import {Heart} from "lucide-react";
import * as React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Pagination from "@/components/page_component/common/Pagination";
import {useQuery} from "@tanstack/react-query";
import {searchTabs} from "@/openapi/api/tab/tab";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import {PageRsSearchTabsResponse} from "@/openapi/model";

const MyVotedTabs = ({myVotedTabData, userName}: {
    myVotedTabData: PageRsSearchTabsResponse,
    userName: string
}) => {

    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

    // 내가 즐겨찾는 악보 조회로 바꿔야함
    const {
        data: myVotedTabs,
        isLoading: isLoadingSearch,
        isError: isErrorSearch,
    } = useQuery({
        queryKey: ['MyFavoriteTabs', currentPage], // 쿼리 키
        queryFn: () => searchTabs({sort: 'RECENT', page: currentPage, pageSize: 10}),
        initialData: currentPage === 0 ? myVotedTabData : undefined,
    });

    const handleDetailTab = (tabId: number) => {
        router.push("/tab/" + tabId);
    }

    if (isLoadingSearch) {
        return <Loading/>
    }
    if (isErrorSearch) {
        return <NotFound/>
    }

    return (
        <div className="px-3 py-10 mx-auto w-full lg:w-[70%] space-y-10">
            <div className="space-y-2 border-b pb-2">
                <div className="text-2xl sm:text-4xl font-bold tracking-wide">{userName}님이 즐겨찾는 악보</div>
                <div className="text-md sm:text-lg font-semibold tracking-wide text-primary/50">3개의 악보</div>
            </div>

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
                        {myVotedTabs?.data?.map((myVotedTab, index) => {
                            return (
                                <TableRow key={index} className="cursor-pointer"
                                          onClick={() => handleDetailTab(myVotedTab.id!)}>
                                    <TableCell className="text-center">{myVotedTab.artist}</TableCell>
                                    <TableCell className="text-center">{myVotedTab.song}</TableCell>
                                    <div className="flex flex-1 items-center">
                                        <TableCell
                                            className="hidden md:flex flex-1 justify-center items-center text-center">{myVotedTab.ratingCount}</TableCell>
                                    </div>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <div>
                    <Pagination
                        totalPage={myVotedTabs?.meta?.totalPage || 1}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        buttonSize={5}
                        hasPreviousPage={myVotedTabs?.meta?.hasPreviousPage}
                        hasNextPage={myVotedTabs?.meta?.hasNextPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default MyVotedTabs;