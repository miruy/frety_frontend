'use client';

import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Pause, Play} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";

interface AutoScrollButtonProps {
    scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const DetailTab_TabAutoScrollButton = ({scrollContainerRef}: AutoScrollButtonProps) => {

    const [scrolling, setScrolling] = useState<boolean>(false); // 자동 스크롤 상태
    const [speed, setSpeed] = useState<number>(1); // 스크롤 속도
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // 스크롤 타이머 참조

    // 스크롤 토글 메서드
    const toggleScroll = () => {
        setScrolling((prev) => !prev); // 현재 상태를 반전
    };

    // 속도를 낮추는 함수
    const decreaseSpeed = () => {
        setSpeed((prev) => Math.max(1, prev - 1)); // 속도 1씩 감소
    };

    // 속도를 올리는 함수
    const increaseSpeed = () => {
        setSpeed((prev) => Math.min(prev + 1, 10)); // 속도 1씩 증가
    };

    // 스크롤 로직
    useEffect(() => {
        if (scrolling && scrollContainerRef.current) {
            intervalRef.current = setInterval(() => {
                if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTop += speed;
                }
            }, 16); // 60fps
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        // 클린업
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [scrolling, speed, scrollContainerRef]);

    return (
        <ToggleGroup type="multiple" variant="outline">
            {/*className="fixed top-[250px] right-[264px] gap-0.5"*/}
            {/* 스크롤 시작/멈춤 버튼 */}
            <ToggleGroupItem
                onClick={toggleScroll}
                value="toggle-scroll" aria-label="Toggle scroll" className="h-10 w-10">
                {scrolling ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}
            </ToggleGroupItem>

            {/* 속도 1 감소 버튼 */}
            <Button
                variant="outline"
                onClick={decreaseSpeed}
                value="underline" aria-label="Toggle underline" className="h-10 w-10">
                <div className="">-1</div>
            </Button>

            {/* 속도 1 증가 버튼 */}
            <Button
                variant="outline"
                onClick={increaseSpeed}
                value="underline" aria-label="Toggle underline" className="h-10 w-10">
                <div className="">+1</div>
            </Button>

            {/* 현재 속도 */}
            <div className="flex flex-col justify-center items-center border rounded-md h-10 w-[48px]">
                <div className="text-xs">speed</div>
                <div className="font-semibold text-xs">{speed}</div>
            </div>
        </ToggleGroup>
    )
}

export default DetailTab_TabAutoScrollButton;