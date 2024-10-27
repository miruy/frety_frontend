'use client';

import {Button} from "@/components/ui/button";
import {Music2, Search} from "lucide-react";
import * as React from "react";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";

const TopBar = () => {

    const router = useRouter();

    return (
        <div className="hidden md:flex h-[70px] items-center justify-between p-5">
            <div
                onClick={() => router.push("/")}
                className="text-3xl font-bold hover:text-slate-500 hover:scale-110 duration-300 cursor-pointer">
                Frety
            </div>

            <div className="flex space-x-2">
                <form className="relative">
                    <Input
                        id="search"
                        placeholder="악보 검색"
                        className="pl-8 w-[350px]"
                    />
                    <Music2
                        className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-70"/>

                    <Button variant="ghost" size="sm" className="absolute right-0 top-1/2 -translate-y-1/2 select-none">
                        <Search/>
                    </Button>
                </form>

                <div>
                    <Button variant="ghost" onClick={() => router.push("/login")}>로그인</Button>
                    <Button variant="ghost"  onClick={() => router.push("/signup")}>회원가입</Button>
                </div>
            </div>
        </div>
    )
}

export default TopBar;