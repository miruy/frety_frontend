'use client';

import {Button} from "@/components/ui/button";
import {Menu, Music4, Search, X} from "lucide-react";
import * as React from "react";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {
    Sheet, SheetClose,
    SheetContent, SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";

const TopBar = () => {

    const router = useRouter();
    const [keyword, setKeyword] = useState<string>("");
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);

    const handleSearchTab = () => {
        router.push(`/search/${keyword}`);
        setKeyword("");
    }

    return (
        <>
            <div className="hidden sm:flex h-[70px] items-center justify-between p-5">
                <div
                    onClick={() => router.push("/")}
                    className="text-3xl font-bold hover:text-slate-500 hover:scale-110 duration-300 cursor-pointer">
                    Frety
                </div>

                <div className="flex space-x-2">
                    <div className="relative">
                        <Input
                            id="search"
                            value={keyword}
                            placeholder="악보 검색"
                            className="pl-9 w-[350px] h-[40px] select-none"
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

                    <div>
                        <Button variant="ghost" onClick={() => router.push("/login")}>로그인</Button>
                        <Button variant="ghost" onClick={() => router.push("/signup")}>회원가입</Button>
                    </div>
                </div>
            </div>

            <div className="flex sm:hidden h-[70px] items-center justify-between p-5 relative">
                <div
                    onClick={() => router.push("/")}
                    className="text-2xl font-bold hover:text-slate-500 hover:scale-110 duration-300 cursor-pointer">
                    Frety
                </div>

                <Sheet open={openSidebar}>
                    <SheetTrigger className="absolute top-5 right-5" asChild>
                        <Button onClick={() => setOpenSidebar(true)} variant="outline" className="p-2 w-fit h-fit">
                            <Menu/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top">
                        <SheetTitle className="absolute left-5 top-5">
                            <div
                                onClick={() => {
                                    setOpenSidebar(false);
                                    router.push("/");
                                }}
                                className="text-2xl font-bold cursor-pointer">
                                Frety
                            </div>
                        </SheetTitle>
                        <SheetClose onClick={() => setOpenSidebar(false)} className="absolute right-5 top-5">
                            <Button variant="outline" className="p-2 w-fit h-fit">
                                <X/>
                            </Button>
                        </SheetClose>
                        <div className="pt-12 space-y-1">
                            <div className="p-2 hover:bg-secondary rounded-lg text-sm cursor-pointer"
                                 onClick={() => {
                                     setOpenSidebar(false);
                                     router.push("/login");
                                 }}>로그인
                            </div>
                            <div className="p-2 hover:bg-secondary rounded-lg text-sm cursor-pointer"
                                 onClick={() => {
                                     setOpenSidebar(false);
                                     router.push("/signup");
                                 }}>회원가입
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default TopBar;