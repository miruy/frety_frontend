'use client';

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Heart} from "lucide-react";
import {PageRsSearchTabsResponse} from "@/openapi/model";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {searchTabs} from "@/openapi/api/tab/tab";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import * as React from "react";
import Pagination from "@/components/page_component/common/Pagination";

const Search = ({searchedTabData, keyword}: { searchedTabData: PageRsSearchTabsResponse, keyword: string }) => {

    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

    // 최근등록순 악보 전체조회 클라이언트사이드 렌더링 + 페이지네이션
    const {
        data: searchedTabs,
        isLoading: isLoadingSearch,
        isError: isErrorSearch,
    } = useQuery({
        queryKey: ['SearchTabs', currentPage, keyword], // 쿼리 키
        queryFn: () => searchTabs({sort: 'RECENT', keyword: keyword, page: currentPage, pageSize: 10}),
        initialData: currentPage === 0 ? searchedTabData : undefined,
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
                <div className="text-2xl sm:text-4xl font-bold tracking-wide">{keyword}</div>
                <div className="text-md sm:text-lg font-semibold tracking-wide text-primary/50">검색결과</div>
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
                        {searchedTabs?.data?.map((searchedTab, index) => {
                            return (
                                <TableRow key={index} className="cursor-pointer"
                                          onClick={() => handleDetailTab(searchedTab.id!)}>
                                    <TableCell className="text-center">{searchedTab.artist}</TableCell>
                                    <TableCell className="text-center">{searchedTab.song}</TableCell>
                                    <div className="flex flex-1 items-center">
                                        <TableCell
                                            className="hidden md:flex flex-1 justify-center items-center text-center">{searchedTab.voteCount}</TableCell>
                                    </div>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <div>
                    <Pagination
                        totalPage={searchedTabs?.meta?.totalPage || 1}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        buttonSize={5}
                        hasPreviousPage={searchedTabs?.meta?.hasPreviousPage}
                        hasNextPage={searchedTabs?.meta?.hasNextPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search;