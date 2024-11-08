'use client';

import {ThumbsUp, UserRoundPen} from "lucide-react";
import {formatDate} from "@/utils/formatDate";
import {GetTabByIdResponse} from "@/openapi/model";
import {useState} from "react";

const DetailTab_TabInfo = ({tab}: { tab: GetTabByIdResponse }) => {

    const [voter, setVoter] = useState<number>(0);

    const handleVote = () => {
        setVoter(prev => prev + 1);
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

                    <div
                        className="flex flex-col items-center justify-center bg-secondary rounded-lg text-xs text-black py-2 px-3 space-y-0.5 tracking-wider">
                        <div>수정</div>
                        <div>{tab.updatedAt ? formatDate(tab.updatedAt!) : "-"}</div>
                    </div>
                </div>

                {/* 좋아요 */}
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="badge badge-outline border-neutral-400">{voter}</div>

                    <div
                        onClick={handleVote}
                        className="cursor-pointer p-3 rounded-full hover:bg-secondary active:scale-90 duration-100">
                        <ThumbsUp className="size-6"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailTab_TabInfo;