'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import LatestTabs from "@/components/page_component/main/LatestTabs";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Music4, Search} from "lucide-react";
import * as React from "react";
import {useContext, useState} from "react";
import {PageRsSearchTabsResponse} from "@/openapi/model";
import {AuthContext} from "@/context/AuthContext";
import {Slide, toast} from "react-toastify";
import PopularTabs from "@/components/page_component/main/PopularTabs";

const Main = ({recentTabsData, voteTabsData}: {
    recentTabsData: PageRsSearchTabsResponse,
    voteTabsData: PageRsSearchTabsResponse
}) => {

    const router = useRouter();
    const [keyword, setKeyword] = useState<string>("");
    const {isLoggedIn} = useContext(AuthContext);

    const handleCreateTab = () => {

        if (!isLoggedIn) {
            toast.warn("로그인 후 이용가능합니다.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });

            return;
        } else {
            router.push("/create");
        }
    }

    const handleSearchTab = () => {
        router.push(`/search/${keyword}`);
        setKeyword("");
    }

    return (
        <div className="flex flex-col px-3 py-10 mx-auto w-full lg:w-[70%]">
            <div className="space-y-2 border-b pb-2">
                <div className="text-4xl font-bold tracking-wide">Frety</div>
                <div className="text-md sm:text-lg font-semibold tracking-wide text-primary/50">프렛 위에서 완성되는 당신의 기타 코드
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

                        <Button
                            onClick={handleCreateTab}
                            className="text-xs sm:text-sm">악보 제작</Button>
                    </div>

                    {/* 데이터 넘겨만 주고 안씀 */}
                    <TabsContent value="latest" className="py-5">
                        <LatestTabs recentTabsData={recentTabsData!}/>
                    </TabsContent>
                    <TabsContent value="popular" className="py-5">
                        <PopularTabs voteTabsData={voteTabsData!}/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Main;