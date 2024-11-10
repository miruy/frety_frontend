'use client';

import {faker} from "@faker-js/faker";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useState} from "react";
import {formatDate} from "@/utils/formatDate";
import {Badge} from "@/components/ui/badge";

const Bookmark = () => {

    const [searchKeyword] = useState<string>("임창정");

    const handleDetailTab = () => {
        console.log("detail")
    }

    function generateSheetMusicData(count: number) {
        return Array.from({length: count}).map((_, index) => ({
            no: index + 1,
            artist: faker.music.songName(),
            song: faker.lorem.words(3),
            writer: faker.name.fullName(),
            createdAt: faker.date.past().toLocaleDateString(),
            updatedAt: faker.date.past().toLocaleDateString(),
        }));
    }

    const searchedTabs = generateSheetMusicData(10); // 예시로 10개의 데이터를 생성

    return (
        <div className="px-3 py-10 mx-auto w-full lg:w-[70%] space-y-10">
            <div className="space-y-2 border-b pb-2">
                <div className="text-2xl sm:text-4xl font-bold tracking-wide">{searchKeyword}</div>
                <div className="text-md sm:text-lg font-semibold tracking-wide text-primary/50">검색결과</div>
            </div>

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
                            </div>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {searchedTabs.map((searchedTab, index) => {
                            return (
                                <TableRow key={index} className="cursor-pointer" onClick={handleDetailTab}>
                                    <TableCell className="text-center">{searchedTab.no}</TableCell>
                                    <TableCell className="text-center">{searchedTab.artist}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-center items-center space-x-1">
                                            <span>{searchedTab.song}</span>
                                            <span><Badge variant="secondary"
                                                         className="rounded w-fit h-fit px-1.5 py-0.5 text-xs">코멘트 수</Badge></span>
                                        </div>
                                    </TableCell>
                                    <div className="flex flex-1 items-center">
                                        <TableCell
                                            className="hidden md:flex flex-1 justify-center items-center text-center">미구현</TableCell>
                                        <TableCell
                                            className="hidden md:flex flex-1 justify-center items-center text-center">{formatDate(searchedTab.createdAt!)}</TableCell>
                                        <TableCell
                                            className="hidden md:flex flex-1 justify-center items-center text-center">{searchedTab.updatedAt !== searchedTab.createdAt ? formatDate(searchedTab.updatedAt!) : "-"}</TableCell>
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
        </div>
    )
}

export default Bookmark;