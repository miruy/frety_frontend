'use client';

import {HandHeart, UserRoundPen} from "lucide-react";
import {formatDate} from "@/utils/formatDate";
import {GetTabByIdResponse} from "@/openapi/model";
import {Slide, toast} from "react-toastify";
import {useContext} from "react";
import {AuthContext} from "@/context/AuthContext";
import {useCreateVote} from "@/openapi/api/vote/vote";
import {TabContext} from "@/context/TabContext";

const DetailTab_TabInfo = ({tab}: { tab: GetTabByIdResponse }) => {

    const {isLoggedIn, authId} = useContext(AuthContext);
    const {findTab} = useContext(TabContext);

    const {mutate: createVote} = useCreateVote({
        mutation: {
            onSuccess: async () => {
                toast.success("평가해주셔서 감사합니다.", {
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

    const onCreateRatingSubmit = () => {
        if (!isLoggedIn) {
            toast.warn("로그인 후 이용해주세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        createVote({
            data: {
                targetId: tab.id!,
                type: "TAB",
                voterId: authId!
            }
        })
    }

    return (
        <div>
            {/* 악보 제작자 */}
            <div className="flex items-center justify-end mb-2 space-x-0.5">
                <div className="flex items-center space-x-1">
                    <UserRoundPen className="w-4 sm:w-5"/>
                    <div className="text-xs sm:text-sm">제작 :</div>
                </div>

                <div className="text-xs sm:text-sm">{tab?.authorName}</div>
            </div>

            {/* 등록일, 수정일 */}
            <div className="flex justify-between border rounded-lg p-3">
                <div className="flex space-x-1">
                    <div
                        className="flex flex-col items-center justify-center bg-secondary rounded-lg text-xs text-black py-2 px-3 space-y-0.5 tracking-wider">
                        <div>등록</div>
                        <div>{tab?.createdAt && formatDate(tab.createdAt)}</div>
                    </div>

                    {tab?.updatedAt !== tab?.createdAt &&
                        <div
                            className="flex flex-col items-center justify-center bg-secondary rounded-lg text-xs text-black py-2 px-3 space-y-0.5 tracking-wider">
                            <div>수정</div>
                            <div>{formatDate(tab.updatedAt!)}</div>
                        </div>
                    }
                </div>

                {/* 투표 */}
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="badge badge-outline border-neutral-400">{tab.voteCount}</div>

                    <div
                        onClick={onCreateRatingSubmit}
                        className="cursor-pointer p-2.5 rounded-full hover:bg-secondary active:scale-90 duration-100">
                        <HandHeart className="size-7"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailTab_TabInfo;