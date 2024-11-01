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
import {Guitar, NotebookPen, PencilLine} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

interface Syllable {
    text: string;
    chord: string | null;
}

const CreateTab = () => {

    const [lyricsData, setLyricsData] = useState<string>("");
    const [isComposing, setIsComposing] = useState(false); // 태그 한글 입력 중인지 여부
    const [parsedLyrics, setParsedLyrics] = useState<{ lineData: Syllable[], comment: string }[]>([]);
    const [maxCharactersPerLine, setMaxCharactersPerLine] = useState(30); // 글자 제한 기본값
    const [lyricComment, setLyricComment] = useState<boolean[]>([]);

    // 가사 입력 후 엔터
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !isComposing) {
            // Shift 키는 줄바꿈
            if (event.shiftKey) {
                return;
            }

            event.preventDefault();
            // 줄 단위로 나누기 (1)
            const lines = lyricsData.split('\n');
            lines.forEach(line => {
                if (line.trim() !== '') {

                    // 가사 한 행씩 업로드 함수 호출 (2)
                    addLineToView(line);
                }
            });

            // 엔터 후 입력창 초기화
            setLyricsData("");
        }
    };

    //가사 한 행씩 업로드 (2)
    const addLineToView = (line: string) => {
        // 한 행을 한 음절씩 나누기 (3)
        const syllables = line.split('');

        // 한 행으로 음절-코드 담을 빈 배열 생성
        const lineData: Syllable[] = [];

        // 앞쪽 공백 5개 추가 (4)
        for (let i = 0; i < 3; i++) {
            lineData.push({text: ' ', chord: null});
        }

        // 입력받은 음절들을 Syllable 객체로 변환 (5)
        syllables.forEach((syllable) => {
            lineData.push({text: syllable, chord: null});
        });

        // 뒤쪽 공백 5개 추가 (6)
        for (let i = 0; i < 3; i++) {
            lineData.push({text: ' ', chord: null});
        }

        // 변환된 가사 데이터를 parsedLyrics에 업데이트
        setParsedLyrics((prevData) => [...prevData, {lineData, comment: ""}]);
    }

    // 음절 클릭
    const clickSyllable = (syllable: Syllable) => {
        console.log('Clicked syllable:', syllable);
    };

    // 화면 크기에 따라 글자 제한을 설정
    useEffect(() => {
        const updateMaxCharacters = () => {
            setMaxCharactersPerLine(window.innerWidth >= 1024 ? 30 : 20); // lg 이상은 30자, 이하 20자
        };

        // 처음 화면 로드 시 설정
        updateMaxCharacters();

        // 윈도우 리사이즈 시 업데이트
        window.addEventListener("resize", updateMaxCharacters);

        return () => {
            window.removeEventListener("resize", updateMaxCharacters);
        };
    }, []);

    return (
        <div className="px-3 py-10 mx-auto w-full lg:w-[70%] space-y-10">
            <div className="space-y-2 border-b pb-2">
                <div className="text-4xl font-bold tracking-wide">악보 제작</div>
                <div className="text-lg font-semibold tracking-wide text-primary/50">Frety에 직접 제작한 기타 악보를 등록하고, 다른 사람들과
                    공유해보세요.
                </div>
            </div>

            <div className="space-y-3">
                {/* 가수 */}
                <div>
                    <label className="relative">
                        <Input id="artist" className="pl-20 w-full h-[50px]"/>
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 select-none">Artist</div>
                    </label>
                </div>

                {/* 제목 */}
                <div>
                    <label className="relative">
                        <Input id="song" className="pl-20 w-full h-[50px]"/>
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 select-none">Song</div>
                    </label>
                </div>

                <div className="flex items-center space-x-2">
                    {/* 카포 셀렉트박스 */}
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

                    {/* 주법 스타일 셀렉트박스 */}
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

                {/* 악보 제작 방법 */}
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
                        <div className="ml-5">3. 악보 작성을 마쳤다면, <span className="font-bold">저장 버튼</span>을 눌러 당신의
                            악보를 <span className="font-bold">Frety</span>에 공유하세요!
                        </div>
                    </div>
                </div>

                {/* 한 행씩 업로드 된 가사 표시 */}
                <div>
                    {parsedLyrics.map(({lineData, comment}, lineIndex) => (
                        <div key={lineIndex} className="flex flex-col mt-10 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {lineData.map((syllable, syllableIndex) => (
                                        <span
                                            key={syllableIndex}
                                            className="relative hover:bg-primary/20 hover:bg-opacity-40 cursor-pointer inline-block px-0.5"
                                            onClick={() => clickSyllable(syllable)}
                                            dangerouslySetInnerHTML={{
                                                __html: syllable.text === ' ' ? '&nbsp;&nbsp;&nbsp;' : syllable.text,
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center space-x-1">
                                    <PencilLine
                                        className="hover:bg-secondary p-1.5 size-7 rounded-md"
                                        onClick={() => {
                                            // 코멘트 입력창 표시 토글
                                            setLyricComment((prev) => {
                                                const newLyricComment = [...prev];
                                                newLyricComment[lineIndex] = !newLyricComment[lineIndex]; // 현재 행의 상태만 토글
                                                return newLyricComment;
                                            });
                                        }}
                                    />

                                    <Button
                                        variant="secondary"
                                        className="text-xs w-fit h-fit p-1.5 mr-16"
                                        onClick={() => {
                                            // 삭제할 행의 인덱스를 기억한 뒤, 해당 행의 코멘트 상태를 false로 설정하여 입력창을 숨김
                                            setLyricComment((prev) => {
                                                const newLyricComment = [...prev];
                                                newLyricComment.splice(lineIndex, 1); // 삭제할 행의 상태 제거
                                                return newLyricComment; // 업데이트된 상태 반환
                                            });

                                            // 가사 행 삭제
                                            setParsedLyrics((prevData) => prevData.filter((_, i) => i !== lineIndex));
                                        }}>
                                        삭제
                                    </Button>
                                </div>
                            </div>

                            {lyricComment[lineIndex] &&
                                <div className="flex flex-col">

                                    <div>
                                        <label className="relative">
                                            <Input
                                                id="comment"
                                                className="pl-12 h-10 focus-visible:ring-0"
                                                type="text"
                                                value={comment}
                                                onChange={(e) => {
                                                    const lyricComment = e.target.value; // 사용자가 입력한 코멘트
                                                    setParsedLyrics((prevData) => {
                                                        const updatedData = [...prevData];
                                                        updatedData[lineIndex] = {
                                                            ...updatedData[lineIndex],
                                                            comment: lyricComment
                                                        }; // 해당 행의 comment 업데이트
                                                        return updatedData;
                                                    });
                                                }}
                                            />
                                            <div
                                                className="absolute left-4 top-1/2 -translate-y-1/2 select-none text-xs">
                                                <NotebookPen className="size-4 opacity-60"/>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                </div>

                {/* 가사 입력창 */}
                <div className="py-10">
                    <Textarea
                        id="content"
                        className="w-full h-[400px] text-center"
                        placeholder="줄바꿈 : Shift + Enter / 업로드 : Enter / 코드 선택기 닫기 : ESC"
                        value={lyricsData}
                        onChange={(e) => {
                            const inputText = e.target.value;

                            // lg이상-30글자/lg이하-20글자 인력 제한
                            const formattedText = inputText
                                .split('\n')
                                .map(line => {
                                    if (line.length > maxCharactersPerLine) {
                                        // 글자 제한 초과 시 자동 줄바꿈
                                        return line.match(new RegExp(`.{1,${maxCharactersPerLine}}`, 'g'))?.join('\n') || line;
                                    }
                                    return line;
                                })
                                .join('\n');

                            setLyricsData(formattedText);
                        }}
                        onCompositionStart={() => setIsComposing(true)} // 한글 입력 시작
                        onCompositionEnd={() => setIsComposing(false)} // 한글 입력 완료
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <Button className="w-full h-[50px] tracking-wide"
                        onClick={() => {
                            console.log("parsedLyrics", parsedLyrics)
                        }}>
                    저장
                </Button>
            </div>
        </div>
    )
}

export default CreateTab;