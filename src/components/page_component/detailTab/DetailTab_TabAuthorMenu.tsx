'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Ellipsis, Eraser, Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useDeleteTab} from "@/openapi/api/tab/tab";
import {Slide, toast} from "react-toastify";
import {useContext} from "react";
import {TabContext} from "@/context/TabContext";

const DetailTab_TabAuthorMenu = ({tabId}: { tabId: number }) => {

    const router = useRouter();
    const {findAllRecentTabs} = useContext(TabContext);

    // 악보 삭제
    const {mutate: deleteTab} = useDeleteTab({
        mutation: {
            onSuccess: async () => {
                toast.dismiss();

                toast.success("성공적으로 악보가 삭제되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });

                await findAllRecentTabs.refetch();

                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            },
            onError: (error) => {
                console.log(error)
                toast.error("관리자에게 문의하세요", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
            }
        }
    })

    const DeleteTabAlert = () => {

        const handleCancel = () => {
            toast.dismiss();
        }

        const handleDelete = () => {
            deleteTab({tabId: tabId});
        };

        return (
            <div className="flex items-center justify-between">
                <div>정말 악보를 삭제하시겠습니까?</div>
                <div className="flex justify-end items-center">
                    <Button type="button" variant="ghost" size="sm" className="text-xs w-fit h-fit px-2 py-1"
                            onClick={handleCancel}>취소</Button>
                    <Button type="button" variant="ghost" size="sm" className="text-xs w-fit h-fit px-2 py-1"
                            onClick={handleDelete}>삭제</Button>
                </div>
            </div>
        );
    };

    const onDeleteTabSubmit = () => {
        toast.info(<DeleteTabAlert/>, {
            position: "top-center",
            transition: Slide,
            className: "text-sm",
            theme: "colored",
            autoClose: false,
            closeButton: false
        },);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10"><Ellipsis/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="w-fit h-fit">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => router.push(`/edit/${tabId}`)}>
                        <Eraser/>
                        <span className="text-[14px]">수정</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={onDeleteTabSubmit}
                    >
                        <Trash2/>
                        <span className="text-[14px]">삭제</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DetailTab_TabAuthorMenu;