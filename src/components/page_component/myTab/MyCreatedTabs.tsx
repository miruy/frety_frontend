'use client';

import {ChevronRight, Heart, PencilLine} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {searchMyCreatedTabs} from "@/openapi/api/tab/tab";

const MyCreatedTabs = ({userName}: {userName: string }) => {

    const router = useRouter();

    // 내가 제작한 악보 5개 미리보기
    const {
        data: myCreatedTabs,
    } = useQuery({
        queryKey: ['MyCreatedTabs', userName],
        queryFn: () => searchMyCreatedTabs(userName!, {page: 0, pageSize: 5}),
    });

    const handleDetailTab = (tabId: number) => {
        router.push("/tab/" + tabId);
    }

    return (
        <div className="space-y-3">
            <div className="space-y-1.5 border-b pb-2">
                <div className="flex items-center space-x-2 text-lg sm:text-2xl font-bold tracking-wide">
                    <PencilLine className="w-4 h-4 sm:w-6 sm:h-6"/>
                    <div>{userName}님이 제작한 악보</div>
                </div>
                <div
                    className="text-sm sm:text-md font-semibold tracking-wide text-primary/50">{myCreatedTabs?.meta?.totalCount}개의
                    악보
                </div>
            </div>

            <div className="border rounded-lg p-5 space-y-1">
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
                        {myCreatedTabs?.data?.map((myCreatedTab, index) => {
                            return (
                                <TableRow key={index} className="cursor-pointer"
                                          onClick={() => handleDetailTab(myCreatedTab.id!)}>
                                    <TableCell className="text-center">{myCreatedTab.artist}</TableCell>
                                    <TableCell className="text-center">{myCreatedTab.song}</TableCell>
                                    <div className="flex flex-1 items-center">
                                        <TableCell
                                            className="hidden md:flex flex-1 justify-center items-center text-center">{myCreatedTab.voteCount}</TableCell>
                                    </div>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <div className="flex justify-end" onClick={() => router.push(`/@${userName}/creations`)}>
                    <Button variant="link"
                            className="w-fit h-fit p-1 text-sm text-primary/50">더보기 <ChevronRight/></Button>
                </div>
            </div>
        </div>
    )
}

export default MyCreatedTabs;