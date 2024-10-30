'use client';

import {Input} from "@/components/ui/input";
import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Guitar} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";

const CreateTab = () => {

    const [lyricsData, setLyricsData] = useState("");
    const [isComposing, setIsComposing] = useState(false); // 태그 한글 입력 중인지 여부

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !isComposing) {
            // Shift 키는 줄바꿈
            if (event.shiftKey) {
                return;
            }

            event.preventDefault();
            console.log("엔터 시 행 추가 - 여기에 로직 추가예정", lyricsData);

            // 엔터 후 입력창 초기화
            setLyricsData("");
        }
    };


    return (
        <div className="px-3 py-10 mx-auto w-full lg:w-[70%] space-y-10">
            <div className="space-y-2 border-b pb-2">
                <div className="text-4xl font-bold tracking-wide">악보 제작</div>
                <div className="text-lg font-semibold tracking-wide text-primary/50">Frety에 직접 제작한 기타 악보를 등록하고, 다른 사람들과
                    공유해보세요.
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="relative">
                        <Input id="artist" className="pl-20 w-full h-[50px]"/>
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 select-none">Artist</div>
                    </label>
                </div>

                <div>
                    <label className="relative">
                        <Input id="song" className="pl-20 w-full h-[50px]"/>
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 select-none">Song</div>
                    </label>
                </div>

                <div className="flex items-center space-x-2">
                    <Select>
                        <SelectTrigger className="w-full h-[50px]">
                            <SelectValue placeholder="Capo"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="No Capo">No Capo</SelectItem>
                                <SelectItem value="Capo 1">Capo 1</SelectItem>
                                <SelectItem value="Capo 2">Capo 2</SelectItem>
                                <SelectItem value="Capo 3">Capo 3</SelectItem>
                                <SelectItem value="Capo 4">Capo 4</SelectItem>
                                <SelectItem value="Capo 5">Capo 5</SelectItem>
                                <SelectItem value="Capo 6">Capo 6</SelectItem>
                                <SelectItem value="Capo 7">Capo 7</SelectItem>
                                <SelectItem value="Capo 8">Capo 8</SelectItem>
                                <SelectItem value="Capo 9">Capo 9</SelectItem>
                                <SelectItem value="한음 내림 튜닝 (Whole Step Down Tuning)">
                                    한음 내림 튜닝 (Whole Step Down Tuning)
                                </SelectItem>
                                <SelectItem value="반음 내림 튜닝 (Half Step Down Tuning)">
                                    반음 내림 튜닝 (Half Step Down Tuning)
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full h-[50px]">
                            <SelectValue placeholder="Style"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="스트럼 (Strumming)">스트럼 (Strumming)</SelectItem>
                                <SelectItem value="퍼커시브 (Percussive Playing)">퍼커시브 (Percussive Playing)</SelectItem>
                                <SelectItem value="아르페지오 (Arpeggio)">아르페지오 (Arpeggio)</SelectItem>
                                <SelectItem value="칼립소 (Calypso)">칼립소 (Calypso)</SelectItem>
                                <SelectItem value="슬로우 고고 (Slow Go-Go)">슬로우 고고 (Slow Go-Go)</SelectItem>
                                <SelectItem value="컨트리 (Country Style)">컨트리 (Country Style)</SelectItem>
                                <SelectItem value="슬로우 락 (Slow Rock)">슬로우 락 (Slow Rock)</SelectItem>
                                <SelectItem value="셔플 (Shuffle)">셔플 (Shuffle)</SelectItem>
                                <SelectItem value="쓰리핑거 (Three-Finger Picking)">쓰리핑거 (Three-Finger Picking)</SelectItem>
                                <SelectItem value="보사노바 (Bossa Nova)">보사노바 (Bossa Nova)</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="py-10">
                    <div className="flex space-x-2 items-center">
                        <Guitar className="size-5"/>
                        <div className="text-sm font-semibold">악보 제작 방법</div>
                    </div>
                    <div className="text-sm ml-1.5 space-y-1">
                        <div className="ml-5">1. 입력칸에 가사를 <span className="font-bold">직접 입력</span>하거나 <span
                            className="font-bold">붙여넣기</span>하여 가사를 업로드하세요.
                        </div>
                        <div className="text-muted-foreground ml-8"><span
                            className="font-bold">- Shift + Enter : </span>가사 줄바꿈
                        </div>
                        <div className="text-muted-foreground ml-8"><span className="font-bold">- Enter : </span>가사 업로드
                        </div>
                        <div className="text-muted-foreground ml-8"><span className="font-bold">- ESC : </span>코드 선택기 닫기
                        </div>
                        <div className="ml-5">2. 가사의 각 <span className="font-bold">음절</span>을 클릭하여 <span
                            className="font-bold">기타 코드</span>를 지정할 수 있습니다. (공백에도 코드 지정 가능)
                        </div>
                        <div className="ml-5">3. 악보 작성을 마쳤다면, <span className="font-bold">악보 등록 버튼</span>을 눌러 당신의
                            악보를 <span className="font-bold">Frety</span>에 공유하세요!
                        </div>
                    </div>
                </div>

                <div>
                    <Textarea
                        id="content"
                        className="w-full h-[400px] text-center"
                        placeholder="줄바꿈 : Shift + Enter / 업로드 : Enter / 코드 선택기 닫기 : ESC"
                        value={lyricsData}
                        onChange={(e) => setLyricsData(e.target.value)}
                        onCompositionStart={() => setIsComposing(true)} // 한글 입력 시작
                        onCompositionEnd={() => setIsComposing(false)} // 한글 입력 완료
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateTab;