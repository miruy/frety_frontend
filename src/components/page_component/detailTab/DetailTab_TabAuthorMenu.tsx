'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Ellipsis, Eraser, Star, Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useDeleteTab} from "@/openapi/api/tab/tab";
import {Slide, toast} from "react-toastify";
import {useContext} from "react";
import {TabContext} from "@/context/TabContext";
import {AuthContext} from "@/context/AuthContext";
import {useCreateFavorite} from "@/openapi/api/favorite/favorite";

const DetailTab_TabAuthorMenu = ({tabId}: { tabId: number }) => {

    const router = useRouter();
    const {findAllRecentTabs, findTab} = useContext(TabContext);
    const {authId} = useContext(AuthContext);

    // 즐겨찾기 추가
    const {mutate: createFavorite} = useCreateFavorite({
        mutation: {
            onSuccess: async () => {
                toast.success("성공적으로 즐겨찾기에 추가되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                await findTab.refetch();
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

    const DeleteAlert = () => {

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

    const onDeleteSubmit = () => {
        toast.info(<DeleteAlert/>, {
            position: "top-center",
            transition: Slide,
            className: "text-sm",
            theme: "colored",
            autoClose: false,
            closeButton: false
        },);
    }

    const onFavoriteSubmit = () => {
        createFavorite({
            data: {
                targetId: tabId,
                type: "TAB",
                favoriterId: authId!
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10"><Ellipsis/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end" className="w-fit h-fit p-2">
                <DropdownMenuGroup>

                    {/* 이미 즐겨찾기 되어 있는지 악보단건조회로 확인한 후 다르게 보이게 하기!!!!!! */}

                    <DropdownMenuItem className="cursor-pointer" onClick={onFavoriteSubmit}>
                        <Star/>
                        <span className="text-[14px]">즐겨찾기 추가</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => router.push(`/edit/${tabId}`)}>
                        <Eraser/>
                        <span className="text-[14px]">수정</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={onDeleteSubmit}
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