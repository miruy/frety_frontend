'use client';

import {faker} from "@faker-js/faker";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ChevronRight, Heart} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useRouter} from "next/navigation";

const MyTabs = ({userName}: { userName: string }) => {

    const router = useRouter();

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
            ratingCount: 4
        }));
    }

    const searchedTabs = generateSheetMusicData(5); // 예시로 10개의 데이터를 생성

    return (
        <div className="px-3 py-10 mx-auto w-full lg:w-[70%] space-y-10">

            {/* 제작한 악보 */}
            <div className="space-y-3">
                <div className="space-y-1.5 border-b pb-2">
                    <div className="text-lg sm:text-2xl font-bold tracking-wide">{userName}님이 제작한 악보</div>
                    <div className="text-sm sm:text-md font-semibold tracking-wide text-primary/50">3개의 악보</div>
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
                            {searchedTabs.map((searchedTab, index) => {
                                return (
                                    <TableRow key={index} className="cursor-pointer" onClick={handleDetailTab}>
                                        <TableCell className="text-center">{searchedTab.artist}</TableCell>
                                        <TableCell className="text-center">{searchedTab.song}</TableCell>
                                        <div className="flex flex-1 items-center">
                                            <TableCell
                                                className="hidden md:flex flex-1 justify-center items-center text-center">{searchedTab.ratingCount}</TableCell>
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

            <Separator className="w-full"/>


            {/* 즐겨찾는 악보 */}
            <div className="space-y-3">
                <div className="space-y-1.5 border-b pb-2">
                    <div className="text-lg sm:text-2xl font-bold tracking-wide">{userName}님이 즐겨찾는 악보</div>
                    <div className="text-sm sm:text-md font-semibold tracking-wide text-primary/50">3개의 악보</div>
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
                            {searchedTabs.map((searchedTab, index) => {
                                return (
                                    <TableRow key={index} className="cursor-pointer" onClick={handleDetailTab}>
                                        <TableCell className="text-center">{searchedTab.artist}</TableCell>
                                        <TableCell className="text-center">{searchedTab.song}</TableCell>
                                        <div className="flex flex-1 items-center">
                                            <TableCell
                                                className="hidden md:flex flex-1 justify-center items-center text-center">{searchedTab.ratingCount}</TableCell>
                                        </div>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                    <div className="flex justify-end" onClick={() => router.push(`/@${userName}/favorites`)}>
                        <Button variant="link"
                                className="w-fit h-fit p-1 text-sm text-primary/50">더보기 <ChevronRight/></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyTabs;