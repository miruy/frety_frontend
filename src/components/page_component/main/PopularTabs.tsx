import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useRouter} from "next/navigation";
import {SearchTabsResponse} from "@/openapi/model";
import {Heart} from "lucide-react";

const PopularTabs = ({tabs}: { tabs: SearchTabsResponse[] }) => {

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
                    {tabs.map((popularTab, index) => {
                        return (
                            <TableRow key={index} className="cursor-pointer"
                                      onClick={() => handleDetailTab(popularTab.id!)}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="text-center">{popularTab.artist}</TableCell>
                                <TableCell className="text-center">{popularTab.song}</TableCell>
                                <div className="flex flex-1 items-center">
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

export default PopularTabs;