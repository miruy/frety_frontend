import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useRouter} from "next/navigation";
import {SearchTabsResponse} from "@/openapi/model";
import {formatDate} from "@/utils/formatDate";
import {Badge} from "@/components/ui/badge";
import {Heart, Star} from "lucide-react";

const LatestTabs = ({tabs}: { tabs: SearchTabsResponse[] }) => {

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
                                className="hidden md:flex flex-1 justify-center items-center text-center">제작자</TableHead>
                            <TableHead
                                className="hidden md:flex flex-1 justify-center items-center text-center">등록</TableHead>
                            <TableHead
                                className="hidden md:flex flex-1 justify-center items-center text-center">수정</TableHead>
                            <TableHead
                                className="hidden md:flex flex-1 justify-center items-center text-center">
                                <Heart className="w-4"/>
                            </TableHead>
                        </div>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tabs.map((latestTab, index) => {
                        return (
                            <TableRow key={index} className="cursor-pointer"
                                      onClick={() => handleDetailTab(latestTab.id!)}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="text-center">{latestTab.artist}</TableCell>
                                <TableCell>
                                    <div className="flex justify-center items-center space-x-1">
                                        <span>{latestTab.song}</span>
                                        <span><Badge variant="secondary"
                                                     className="rounded w-fit h-fit px-1.5 py-0.5 text-xs">코멘트 수</Badge></span>
                                    </div>
                                </TableCell>
                                <div className="flex flex-1 items-center">
                                    <TableCell
                                        className="hidden md:flex flex-1 justify-center items-center text-center">미구현</TableCell>
                                    <TableCell
                                        className="hidden md:flex flex-1 justify-center items-center text-center">{formatDate(latestTab.createdAt!)}</TableCell>
                                    <TableCell
                                        className="hidden md:flex flex-1 justify-center items-center text-center">{latestTab.updatedAt !== latestTab.createdAt ? formatDate(latestTab.updatedAt!) : "-"}</TableCell>
                                    <TableCell
                                        className="hidden md:flex flex-1 justify-center items-center text-center">미구현</TableCell>
                                </div>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default LatestTabs;