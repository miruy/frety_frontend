'use client';

import {HandHeart, UserRoundPen} from "lucide-react";
import {formatDate} from "@/utils/formatDate";
import {GetTabByIdResponse} from "@/openapi/model";
import {useCreateRating, useSearchRatings} from "@/openapi/api/rating/rating";
import {Slide, toast} from "react-toastify";
import {useState} from "react";

const DetailTab_TabInfo = ({tab}: { tab: GetTabByIdResponse }) => {

    const [hasLogin, setHasLogin] = useState<boolean>(true);

    // 악보 평가 아이디 전체 조회
    const {
        data: ratingIds,
        refetch: ratingIdsRefetch,
    } = useSearchRatings({
            targetId: tab.id!,
            type: "TAB"
        },
        {
            query: {
                queryKey: ['TabRatings', tab.id],
            }
        });

    const {mutate: createRating} = useCreateRating({
        mutation: {
            onSuccess: async () => {
                toast.success("평가해주셔서 감사합니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                await ratingIdsRefetch();
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
        if (!hasLogin) {
            toast.warn("로그인 후 이용해주세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        } else {
            createRating({
                data: {
                    targetId: tab.id!,
                    type: "TAB",
                    rating: true
                }
            })
        }
    }

    return (
        <div>
            {/* 악보 제작자 */}
            <div className="flex items-center justify-end mb-2 space-x-0.5">
                <div className="flex items-center space-x-1">
                    <UserRoundPen className="w-4 sm:w-5"/>
                    <div className="text-xs sm:text-sm">제작 :</div>
                </div>

                <div className="text-xs sm:text-sm">미구현</div>
            </div>

            {/* 등록일, 수정일 */}
            <div className="flex justify-between border rounded-lg p-3">
                <div className="flex space-x-1">
                    <div
                        className="flex flex-col items-center justify-center bg-secondary rounded-lg text-xs text-black py-2 px-3 space-y-0.5 tracking-wider">
                        <div>등록</div>
                        <div>{formatDate(tab.createdAt!)}</div>
                    </div>

                    {tab.updatedAt !== tab.createdAt &&
                        <div
                            className="flex flex-col items-center justify-center bg-secondary rounded-lg text-xs text-black py-2 px-3 space-y-0.5 tracking-wider">
                            <div>수정</div>
                            <div>{formatDate(tab.updatedAt!)}</div>
                        </div>
                    }
                </div>

                {/* 좋아요 */}
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="badge badge-outline border-neutral-400">{ratingIds?.length}</div>

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