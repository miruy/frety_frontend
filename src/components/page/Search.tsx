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

const Search = () => {

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
            createAt: faker.date.past().toLocaleDateString(),
        }));
    }

    const searchedTabs = generateSheetMusicData(10); // 예시로 10개의 데이터를 생성

    return (
        <div className="px-3 py-10 mx-auto w-full lg:w-[70%] space-y-10">
            <div className="space-y-2 border-b pb-2">
                <div className="text-4xl font-bold tracking-wide">{searchKeyword}</div>
                <div className="text-lg font-semibold tracking-wide text-primary/50">검색결과</div>
            </div>

            <div className="space-y-10">
                <Table>
                    <TableHeader>
                        <TableRow className="cursor-default hover:bg-transparent">
                            <TableHead className="text-center">no</TableHead>
                            <TableHead className="text-center">Artist</TableHead>
                            <TableHead className="text-center">Song</TableHead>
                            <TableHead className="text-center">악보제작자</TableHead>
                            <TableHead className="text-center">등록일</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {searchedTabs.map((searchedTab, index) => {
                            return (
                                <TableRow key={index} className="cursor-pointer" onClick={handleDetailTab}>
                                    <TableCell className="text-center">{searchedTab.no}</TableCell>
                                    <TableCell className="text-center">{searchedTab.artist}</TableCell>
                                    <TableCell className="text-center">{searchedTab.song}</TableCell>
                                    <TableCell className="text-center">{searchedTab.writer}</TableCell>
                                    <TableCell className="text-center">{searchedTab.createAt}</TableCell>
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

export default Search;