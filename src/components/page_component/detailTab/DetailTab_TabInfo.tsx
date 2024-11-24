'use client';

import {Heart, Star, UserRoundPen} from "lucide-react";
import {formatDate} from "@/utils/formatDate";
import {GetTabByIdResponse} from "@/openapi/model";
import {Slide, toast} from "react-toastify";
import {useContext, useState} from "react";
import {AuthContext} from "@/context/AuthContext";
import {useCreateVote} from "@/openapi/api/vote/vote";
import {TabContext} from "@/context/TabContext";
import {getFavorite, useCreateFavorite, useDeleteFavorite} from "@/openapi/api/favorite/favorite";
import {useQuery} from "@tanstack/react-query";
import {Badge} from "@/components/ui/badge";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import * as React from "react";

const DetailTab_TabInfo = ({tab}: { tab: GetTabByIdResponse }) => {

    const {isLoggedIn, authId} = useContext(AuthContext);
    const {findTab, findAllRecentTabs} = useContext(TabContext);
    const [voteScrollPosition, setVoteScrollPosition] = useState<number>(0);
    const [createFavoriteScrollPosition, setCreateFavoriteScrollPosition] = useState<number>(0);
    const [deleteFavoriteScrollPosition, setDeleteFavoriteScrollPosition] = useState<number>(0);

    // 즐겨찾기한 악보인지 조회
    const {
        data: isFavorite,
        refetch: isFavoriteRefetch
    } = useQuery({
        queryKey: ['IsMyFavoriteTab', authId, tab.id],
        queryFn: () => getFavorite({favoriterId: authId!, tabId: tab.id!}),
    });

    // 투표 등록
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
                await findAllRecentTabs.refetch();
                window.scrollTo(0, voteScrollPosition); // 저장된 위치로 스크롤
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

    // 즐겨찾기 등록
    const {mutate: createFavorite} = useCreateFavorite({
        mutation: {
            onSuccess: async () => {
                toast.success("즐겨찾기가 등록되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                await findTab.refetch();
                await findAllRecentTabs.refetch();
                await isFavoriteRefetch();
                window.scrollTo(0, createFavoriteScrollPosition); // 저장된 위치로 스크롤
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

    // 즐겨찾기 해제
    const {mutate: deleteFavorite} = useDeleteFavorite({
        mutation: {
            onSuccess: async () => {
                toast.success("즐겨찾기가 해제되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                await findTab.refetch();
                await findAllRecentTabs.refetch();
                await isFavoriteRefetch();
                window.scrollTo(0, deleteFavoriteScrollPosition); // 저장된 위치로 스크롤
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

        setVoteScrollPosition(window.scrollY); // 현재 위치 저장

        createVote({
            data: {
                targetId: tab.id!,
                type: "TAB",
                voterId: authId!
            }
        })
    }

    const onCreateFavoriteSubmit = () => {
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

        setCreateFavoriteScrollPosition(window.scrollY); // 현재 위치 저장

        createFavorite({
            data: {
                targetId: tab.id!,
                type: "TAB",
                favoriterId: authId!
            }
        })
    }

    const onDeleteFavoriteSubmit = () => {
        setDeleteFavoriteScrollPosition(window.scrollY); // 현재 위치 저장

        deleteFavorite({
            params: {
                favoriterId: authId!,
                tabId: tab.id!
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


                <div className="flex items-center space-x-2">
                    {/* 즐겨찾기 */}
                    <div className="flex flex-col items-center justify-center space-y-1">
                        <Badge variant="outline">{tab.favoriteCount}</Badge>

                        {isFavorite ?
                            <TooltipProvider>
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild onClick={onDeleteFavoriteSubmit}>
                                        <div
                                            className="cursor-pointer p-3 rounded-full hover:bg-secondary active:scale-90 duration-100">
                                            <Star className="stroke-amber-400 fill-amber-400 size-6"/>
                                        </div>
                                    </TooltipTrigger>

                                    <TooltipContent side="bottom" sideOffset={5}>
                                        <div className="text-xs">즐겨찾기 해제</div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            :
                            <TooltipProvider>
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild onClick={onCreateFavoriteSubmit}>
                                        <div
                                            className="cursor-pointer p-3 rounded-full hover:text-amber-400 hover:bg-secondary active:scale-90 duration-100">
                                            <Star className="size-6"/>
                                        </div>
                                    </TooltipTrigger>

                                    <TooltipContent side="bottom" sideOffset={5}>
                                        <div className="text-xs">즐겨찾기 등록</div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        }
                    </div>

                    {/* 투표 */}
                    <div className="flex flex-col items-center justify-center space-y-1">
                        <Badge variant="outline">{tab.voteCount}</Badge>

                        <TooltipProvider>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild onClick={onCreateRatingSubmit}>
                                    <div
                                        className="cursor-pointer p-3 rounded-full hover:text-red-400 hover:bg-secondary active:scale-90 duration-100">
                                        <Heart className="size-6"/>
                                    </div>
                                </TooltipTrigger>

                                <TooltipContent side="bottom" sideOffset={5}>
                                    <div className="text-xs">좋은 악보예요!</div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailTab_TabInfo;