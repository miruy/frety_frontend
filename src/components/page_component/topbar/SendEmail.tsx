'use client';

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useState} from "react";
import {Slide, toast} from "react-toastify";
import Loading from "@/app/loading";

const SendEmail = () => {

    const [showAddChordCard, setShowAddChordCard] = useState<boolean>(false);
    const [addChord, setAddChord] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const sendEmailForAddChord = async () => {

        if (!addChord) {
            toast.error("기타 코드를 입력하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        setAddChord("");
        setShowAddChordCard(false);
        await sendContactEmail(addChord);
    }

    const sendContactEmail = async (content: string) => {
        setLoading(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content}),
            });

            if (response.ok) {
                toast.success("기타 코드 신청이 완료되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("기타 코드 신청에 실패했습니다. 관리자에게 문의하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* 이메일 전송 중 로딩페이지 표시 */}
            {loading && <Loading/>}

            <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5">
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild onClick={() => {
                            setAddChord("");
                            setShowAddChordCard(prev => !prev);
                        }}>
                            <Button
                                className={`flex pt-3 px-3 pb-2.5 rounded-full shadow-lg ${showAddChordCard ? `bg-accent` : `bg-background`}`}
                                variant="outline">
                                <Send className="w-5"/>
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent side="left" sideOffset={10} className={showAddChordCard ? `hidden` : ``}>
                            <div className="text-xs">기타 코드 신청하기</div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {showAddChordCard &&
                <div className="fixed bottom-[55px] right-[55px] sm:bottom-[65px] sm:right-[65px]">
                    <div className="bg-background border rounded-lg shadow-lg w-fit h-fit p-4 space-y-3">
                        <div>
                            <div className="font-bold text-sm">찾으시는 기타 코드가 없으신가요?</div>
                            <div className="hidden sm:flex text-xs text-primary/70">
                                필요한 기타 코드를 입력 후 신청하시면, 검토 후 업데이트하갰습니다.
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Input
                                type="text"
                                className="h-7 placeholder:text-xs text-xs"
                                placeholder="D#m7"
                                value={addChord}
                                onChange={(event) => setAddChord(event.target.value)}
                            />
                            <Button type="button" onClick={sendEmailForAddChord} className="h-7 text-xs">신청</Button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SendEmail;