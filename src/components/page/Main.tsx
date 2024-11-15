'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import LatestTabs from "@/components/page_component/main/LatestTabs";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Music4, Search} from "lucide-react";
import * as React from "react";
import {useState} from "react";
import {searchTabs} from "@/openapi/api/tab/tab";
import {useQuery} from "@tanstack/react-query";
import NotFound from "@/app/not-found";
import Loading from "@/app/loading";
import {PageRsSearchTabsResponse} from "@/openapi/model";

interface MainProps {
    recentTabsData: PageRsSearchTabsResponse;
    voteTabsData: PageRsSearchTabsResponse;
}

const Main = ({recentTabsData, voteTabsData}: MainProps) => {

    const router = useRouter();
    const [keyword, setKeyword] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

    // 최근등록순 악보 전체조회 클라이언트사이드 렌더링 + 페이지네이션
    const {
        data: recentTabs,
        isLoading: isLoadingRecent,
        isError: isErrorRecent,
    } = useQuery({
        queryKey: ['RecentTabs', currentPage], // 쿼리 키
        queryFn: () => searchTabs({sort: 'RECENT', page: currentPage, pageSize: 10}),
        initialData: currentPage === 0 ? recentTabsData : undefined,
    });

    const handleCreateTab = () => {
        router.push("/create");
    }

    const handleSearchTab = () => {
        router.push(`/search/${keyword}`);
        setKeyword("");
    }

    if (isLoadingRecent) {
        return <Loading/>
    }
    if (isErrorRecent) {
        return <NotFound/>
    }

    return (
        <div className="flex flex-col px-3 py-10 mx-auto w-full lg:w-[70%]">
            <div className="space-y-2 border-b pb-2">
                <div className="text-4xl font-bold tracking-wide">Frety</div>
                <div className="text-md sm:text-lg font-semibold tracking-wide text-primary/50">프렛위에서 완성되는 당신의 기타 코드
                </div>
            </div>

            <div className="flex flex-col space-y-5">
                {/* md이하일때 검색창 표시 */}
                <div className="flex sm:hidden w-full relative mt-5">
                    <Input
                        id="search"
                        value={keyword}
                        placeholder="악보 검색"
                        className="pl-9 w-full h-[40px] select-none"
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSearchTab()
                            }
                        }}
                    />
                    <Music4
                        className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 select-none opacity-70"/>

                    <Button
                        onClick={handleSearchTab}
                        variant="ghost" size="sm"
                        className="absolute right-1 p-2 w-fit h-fit top-1/2 -translate-y-1/2 select-none">
                        <Search/>
                    </Button>
                </div>

                <Tabs defaultValue="latest" className="flex-1">
                    <div className="flex items-center justify-between">
                        <TabsList>
                            <TabsTrigger value="latest" className="text-xs sm:text-sm">최근 등록된 악보</TabsTrigger>
                            <TabsTrigger value="popular" className="text-xs sm:text-sm">인기 악보</TabsTrigger>
                        </TabsList>

                        <Button onClick={
                            handleCreateTab
                        } className="text-xs sm:text-sm">악보 제작</Button>
                    </div>

                    <TabsContent value="latest" className="py-5">
                        <LatestTabs tabs={recentTabs!} currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}/>
                    </TabsContent>
                    <TabsContent value="popular" className="py-5">
                        {/*<PopularTabs tabs={tabs}/>*/}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Main;