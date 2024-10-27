'use client';

import {
    Sheet, SheetClose,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

const SideSheet = () => {

    const router = useRouter();
    const [openSheet, setOpenSheet] = useState<boolean>(false);

    return (
        <div className="flex justify-end md:hidden bg-fuchsia-300 relative">
            <Sheet open={openSheet}>
                <SheetTrigger className="absolute top-5 right-5" asChild>
                    <Button onClick={() => setOpenSheet(true)} variant="outline" className="p-2 w-fit h-fit">
                        <Menu/>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetClose onClick={() => setOpenSheet(false)} className="absolute right-5 top-5">
                        <Button variant="outline" className="p-2 w-fit h-fit">
                            <X/>
                        </Button>
                    </SheetClose>
                    <div className="py-10 space-y-1">
                        <div className="p-2 hover:bg-secondary rounded-lg text-sm"
                             onClick={() => {
                                 router.push("/login");
                                 setOpenSheet(false);
                             }}>로그인
                        </div>
                        <div className="p-2 hover:bg-secondary rounded-lg text-sm"
                             onClick={() => {
                                 router.push("/signup");
                                 setOpenSheet(false);
                             }}>회원가입
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default SideSheet;