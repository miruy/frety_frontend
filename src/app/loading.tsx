'use client'

import {Dialog} from "@radix-ui/react-dialog";
import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {Slide, toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {TbCircleDotted} from "react-icons/tb";

const Loading = () => {

    const router = useRouter()
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
            router.push("/");
            toast.error("페이지를 읽는데 실패하였습니다. 잠시후 다시 시도해주세요.", {
                position: "top-center",
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
        }, 10000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-transparent justify-center items-center shadow-none border-0 outline-0">
                <VisuallyHidden><DialogTitle/></VisuallyHidden>
                <TbCircleDotted className="w-[50px] h-[50px] animate-spin-slow text-white"/>
            </DialogContent>
        </Dialog>
    )
}

export default Loading;