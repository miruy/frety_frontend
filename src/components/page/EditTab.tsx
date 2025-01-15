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
import {NotebookPen, PencilLine, X} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {useContext, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import ChordSelector from "@/components/page_component/common/ChordSelector";
import HowToEditTab from "@/components/page_component/editTab/HowToEditTab";
import {Toggle} from "@/components/ui/toggle";
import {GetTabByIdResponse, UpdateTabRequest} from "@/openapi/model";
import {Syllable} from "@/components/model/tab";
import {Controller, useForm} from "react-hook-form";
import {useUpdateTab} from "@/openapi/api/tab/tab";
import {Slide, toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {AuthContext} from "@/context/AuthContext";
import {TabContext} from "@/context/TabContext";
import {DragDropContext, Draggable, DropResult} from 'react-beautiful-dnd';
import {StrictModeDroppable} from "@/components/page_component/common/StrictModeDroppable";

const EditTab = ({tab}: { tab: GetTabByIdResponse }) => {

    const [lyricsData, setLyricsData] = useState<string>("");
    const [isComposing, setIsComposing] = useState(false); // 태그 한글 입력 중인지 여부
    const [parsedLyrics, setParsedLyrics] = useState<{ lineData: Syllable[], comment: string }[]>([]);
    const [maxCharactersPerLine, setMaxCharactersPerLine] = useState(30); // 글자 제한 기본값
    const [lyricComment, setLyricComment] = useState<boolean[]>([]);
    const [showChordSelector, setShowChordSelector] = useState<boolean>(false);
    const [selectedSyllable, setSelectedSyllable] = useState<{ lineIndex: number; syllableIndex: number } | null>(null);
    const [isDefaultComment, setIsDefaultComment] = useState<{ index: number, hasComment: boolean }[]>([]);
    const router = useRouter();
    const {loginId} = useContext(AuthContext);
    const {findTab, tabId} = useContext(TabContext);

    const {mutate: updateTab} = useUpdateTab({
        mutation: {
            onSuccess: async () => {
                toast.success("성공적으로 악보가 수정되었습니다.", {
                    position: "top-center",
                    autoClose: 2500,
                    transition: Slide,
                    className: "text-sm",
                    theme: "colored",
                });
                await findTab.refetch();
                router.push(`/tab/${tabId}`)
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

    const editTabForm = useForm<UpdateTabRequest>({
        defaultValues: {
            artist: "",
            song: "",
            capo: "",
            style: "",
            content: "",
            authorName: ""
        }
    });

    const handleUpdateTabSubmit = (data: UpdateTabRequest) => {
        if (!data.artist) {
            toast.error("가수명을 입력하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        if (!data.song) {
            toast.error("제목을 입력하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        if (!data.capo) {
            toast.warn("카포를 선택하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        if (!data.style) {
            toast.error("주법을 선택하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        if (parsedLyrics.length === 0) {
            toast.error("내용을 입력하세요.", {
                position: "top-center",
                autoClose: 2500,
                transition: Slide,
                className: "text-sm",
                theme: "colored",
            });
            return
        }

        if (data.artist && data.song && data.capo && data.style && data.authorName && parsedLyrics.length !== 0) {
            onUpdateTabSubmit(data)
        }
    }

    const onUpdateTabSubmit = (data: UpdateTabRequest) => {
        const serializedContent = JSON.stringify(parsedLyrics);

        updateTab({
            tabId: Number(tabId),
            data: {
                artist: data.artist,
                song: data.song,
                capo: data.capo,
                style: data.style,
                content: serializedContent,
                authorName: loginId!
            }
        });
    }

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
            lines.forEach((line) => {
                if (line.trim() !== '') {

                    // 가사 한 행씩 업로드 함수 호출 (2)
                    addLineToView(line);

                    // 새로 가사 추가 시 hasComment를 false로 설정
                    setIsDefaultComment(prevComments => {
                        const updatedComments = [...prevComments];
                        updatedComments[prevComments.length] = {
                            index: prevComments.length, // 새 인덱스
                            hasComment: false // 새 가사 추가 시 false로 설정
                        };
                        return updatedComments;
                    });
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
        console.log("가사 데이터", parsedLyrics)
    }

    // 음절 클릭 시 코드 셀렉터 표시/숨기기 및 해당 위치 저장 (7)
    const clickSyllable = (lineIndex: number, syllableIndex: number) => {
        // 음절 선택하면 해당 줄 index, 해당 음절 index 저장
        setSelectedSyllable((prev) =>
            prev && prev.lineIndex === lineIndex && prev.syllableIndex === syllableIndex ? null : {
                lineIndex,
                syllableIndex
            }
        );

        // 코드 셀렉터 표시 (8)
        setShowChordSelector(true);
    };

    // 코드선택기에서 코드 선택하면 음절위에 표시 (9)
    const setChord = (chord: string) => {
        if (selectedSyllable) {
            const {lineIndex, syllableIndex} = selectedSyllable;

            setParsedLyrics(prevData => {
                const updatedLineData = [...prevData[lineIndex].lineData];

                updatedLineData[syllableIndex] = {
                    ...updatedLineData[syllableIndex],
                    chord: chord // 선택된 코드 설정
                };

                return [
                    ...prevData.slice(0, lineIndex), // 이전 행들
                    {lineData: updatedLineData, comment: prevData[lineIndex].comment}, // 업데이트된 행
                    ...prevData.slice(lineIndex + 1) // 이후 행들
                ];
            });

            // 선택 후 코드 선택기 닫기
            setShowChordSelector(false);
            setSelectedSyllable(null);
        }
    }

    // 코드 제거
    const deleteChord = () => {
        if (selectedSyllable) {
            const {lineIndex, syllableIndex} = selectedSyllable;

            setParsedLyrics(prevData => {
                const updatedLineData = [...prevData[lineIndex].lineData];

                updatedLineData[syllableIndex] = {
                    ...updatedLineData[syllableIndex],
                    chord: null
                };

                return [
                    ...prevData.slice(0, lineIndex), // Previous lines
                    {lineData: updatedLineData, comment: prevData[lineIndex].comment}, // Updated line
                    ...prevData.slice(lineIndex + 1) // Subsequent lines
                ];
            });

            // 선택 후 코드 선택기 닫기
            setShowChordSelector(false);
            setSelectedSyllable(null);
        }
    }

    // ESC 키를 누르면 코드 셀렉터 닫기
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowChordSelector(false);
                setSelectedSyllable(null);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    // 화면 크기에 따라 글자 제한을 설정
    useEffect(() => {
        const updateMaxCharacters = () => {
            setMaxCharactersPerLine(window.innerWidth > 1024 ? 30 : 20); // lg 이상은 30자, 이하 20자
        };

        // 처음 화면 로드 시 설정
        updateMaxCharacters();

        // 윈도우 리사이즈 시 업데이트
        window.addEventListener("resize", updateMaxCharacters);

        return () => {
            window.removeEventListener("resize", updateMaxCharacters);
        };
    }, []);

    const onDragEnd = ({source, destination}: DropResult) => {
        console.log("드롭")
        console.log("source :", source)
        console.log("destination :", destination)
    };

    useEffect(() => {
        if (tab) {
            editTabForm.reset(
                {
                    artist: tab.artist,
                    song: tab.song,
                    capo: tab.capo,
                    style: tab.style,
                    content: tab.content,
                    authorName: tab.authorName
                }
            )

            // string -> json 객체로 변환
            const parsedContent = JSON.parse(tab.content!);
            const parsedData = parsedContent.map((item: { lineData: Syllable[], comment: string }) => ({
                lineData: item.lineData.flat(), // 중첩 배열을 평탄화
                comment: item.comment,
            }));

            // 기존 가사, 코드 표시
            setParsedLyrics(parsedData);

            // 기존 코멘트 표시
            const commentStatusArray = parsedContent.map((item: {
                lineData: Syllable[],
                comment: string
            }, index: number) => ({
                index: index,
                hasComment: item.comment !== ""
            }));
            setIsDefaultComment(commentStatusArray);
        }
    }, [tab]);

    return (
        <div className="px-3 py-10 mx-auto w-full md:w-[90%] xl:w-[70%] space-y-10">



            {/*<div>*/}
            {/*    드래그앤드롭 테스트*/}
            {/*    <DragDropContext onDragEnd={onDragEnd}>*/}
            {/*        <StrictModeDroppable droppableId="parsedLyricId">*/}
            {/*            {(provided) => (*/}
            {/*                <div ref={provided.innerRef} {...provided.droppableProps}>*/}
            {/*                    {users.map((user: User, index: number) => (*/}
            {/*                        <Draggable*/}
            {/*                            key={user.name}*/}
            {/*                            draggableId={user.id}*/}
            {/*                            index={index}*/}
            {/*                        >*/}
            {/*                            {(provided_two) => (*/}
            {/*                                <div*/}
            {/*                                    className="bg-blue-200"*/}
            {/*                                    ref={provided_two.innerRef}*/}
            {/*                                    {...provided_two.draggableProps}*/}
            {/*                                    {...provided_two.dragHandleProps}*/}
            {/*                                >*/}
            {/*                                    <div*/}
            {/*                                        className="bg-red-200"*/}
            {/*                                        key={index + 1}*/}
            {/*                                        id={user.id}*/}
            {/*                                    >*/}
            {/*                                        {user.name}*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            )}*/}
            {/*                        </Draggable>*/}
            {/*                    ))}*/}
            {/*                    {provided.placeholder}*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*        </StrictModeDroppable>*/}
            {/*    </DragDropContext>*/}
            {/*</div>*/}



            <div className="space-y-2 border-b pb-2">
                <div className="text-2xl sm:text-4xl font-bold tracking-wide">악보 수정</div>
                <div className="text-md sm:text-lg font-semibold tracking-wide text-primary/50">
                    악보를 수정하고, 새로운 가사와 코드를 추가할 수 있습니다.
                </div>
            </div>

            <form
                onSubmit={editTabForm.handleSubmit(handleUpdateTabSubmit)}
                className="space-y-3">
                {/* 가수 */}
                <div>
                    <label className="relative">
                        <Input id="artist"
                               className="pl-20 w-full h-[50px]"
                               {...editTabForm.register("artist")}
                        />
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 select-none">Artist</div>
                    </label>
                </div>

                {/* 제목 */}
                <div>
                    <label className="relative">
                        <Input id="song" className="pl-20 w-full h-[50px]"
                               {...editTabForm.register("song")}
                        />
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 select-none">Song</div>
                    </label>
                </div>

                <div className="flex items-center space-x-2">
                    {/* 카포 셀렉트박스 */}
                    <Controller
                        control={editTabForm.control}
                        name="capo"
                        render={({field}) => {
                            return (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        if (value) {
                                            field.onChange(value);
                                            editTabForm.setValue("capo", value);
                                        }
                                    }}
                                >
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
                            )
                        }}
                    />

                    {/* 주법 스타일 셀렉트박스 */}
                    <Controller
                        control={editTabForm.control}
                        name="style"
                        render={({field}) => {
                            return (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        if (value) {
                                            field.onChange(value);
                                            editTabForm.setValue("style", value);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full h-[50px]">
                                        <SelectValue placeholder="Style"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="스트럼 (Strumming)">스트럼 (Strumming)</SelectItem>
                                            <SelectItem value="퍼커시브 (Percussive Playing)">퍼커시브 (Percussive
                                                Playing)</SelectItem>
                                            <SelectItem value="아르페지오 (Arpeggio)">아르페지오 (Arpeggio)</SelectItem>
                                            <SelectItem value="칼립소 (Calypso)">칼립소 (Calypso)</SelectItem>
                                            <SelectItem value="슬로우 고고 (Slow Go-Go)">슬로우 고고 (Slow Go-Go)</SelectItem>
                                            <SelectItem value="컨트리 (Country Style)">컨트리 (Country Style)</SelectItem>
                                            <SelectItem value="슬로우 락 (Slow Rock)">슬로우 락 (Slow Rock)</SelectItem>
                                            <SelectItem value="셔플 (Shuffle)">셔플 (Shuffle)</SelectItem>
                                            <SelectItem value="쓰리핑거 (Three-Finger Picking)">쓰리핑거 (Three-Finger
                                                Picking)</SelectItem>
                                            <SelectItem value="보사노바 (Bossa Nova)">보사노바 (Bossa Nova)</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }}
                    />
                </div>

                {/* 악보 수정 방법 */}
                <HowToEditTab/>

                {/* 기존 가사와 코드 표시 */}
                <div>
                    {parsedLyrics.map(({lineData, comment}, lineIndex) => {
                        return (
                            <div key={lineIndex} className="flex flex-col mt-14 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="relative flex items-center">
                                        {lineData.map((syllable, syllableIndex) => (
                                            <div key={syllableIndex} className="relative">

                                                {/* 선택한 코드 표시 (3) */}
                                                {syllable.chord && (
                                                    <div
                                                        className={`absolute text-[13px] tracking-tighter font-semibold text-primary/60 mt-[-23px]
                                                     ${syllable.chord.length === 1 && 'left-1 w-[10px]'} 
                                                        ${syllable.chord.length === 2 && 'left-0 w-[20px]'}
                                                        ${syllable.chord.length === 3 && '-left-[5px] w-[40px]'}
                                                        ${syllable.chord.length === 4 && '-left-[9px] w-[50px]'}
                                                        ${syllable.chord.length === 5 && '-left-[12px] w-[60px]'}
                                                        ${syllable.chord.length === 6 && '-left-[16px] w-[60px]'}
                                                        ${syllable.chord.length === 7 && '-left-[18px] w-[70px]'}
                                                        ${syllable.chord.length === 8 && '-left-[19px] w-[70px]'}
                                                    `}>
                                                        {syllable.chord}
                                                    </div>
                                                )}

                                                {/* 각 음절 (1) */}
                                                <span
                                                    className={`
                                                ${
                                                        selectedSyllable?.lineIndex === lineIndex &&
                                                        selectedSyllable.syllableIndex === syllableIndex &&
                                                        showChordSelector ? 'bg-primary/20' : ''} 
                                                ${!syllable.text.trim() ? 'bg-primary/5' : ''}
                                                relative hover:bg-primary/20 cursor-pointer inline-block min-w-[16px] mx-0.5 text-center`}
                                                    onClick={() => clickSyllable(lineIndex, syllableIndex)}
                                                    dangerouslySetInnerHTML={{
                                                        __html: syllable.text === ' ' ? '&nbsp;&nbsp;&nbsp;' : syllable.text,
                                                    }}
                                                />

                                                {/* 코드 셀렉터 (2) */}
                                                {showChordSelector && selectedSyllable?.lineIndex === lineIndex && selectedSyllable.syllableIndex === syllableIndex &&
                                                    <div className="absolute z-[1000] mt-2 ml-3">
                                                        <ChordSelector setChord={setChord}
                                                                       deleteChord={deleteChord}/>
                                                    </div>
                                                }

                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center space-x-0.5">
                                        <Toggle
                                            pressed={!lyricComment[lineIndex] && isDefaultComment[lineIndex]?.hasComment}
                                            aria-label="Toggle_Comment"
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {

                                                // isDefaultComment 배열을 복사한 후, 해당 index의 hasComment를 true로 설정
                                                if (!isDefaultComment[lineIndex].hasComment) {
                                                    setIsDefaultComment(prevComments => {
                                                        const updatedComments = [...prevComments];
                                                        updatedComments[lineIndex] = {
                                                            ...updatedComments[lineIndex],
                                                            hasComment: true // 해당 인덱스의 hasComment를 true로 설정
                                                        };

                                                        return updatedComments;
                                                    });
                                                }

                                                // 코멘트 입력창 표시 토글
                                                setLyricComment((prev) => {
                                                    const newLyricComment = [...prev];
                                                    newLyricComment[lineIndex] = !newLyricComment[lineIndex]; // 현재 행의 상태만 토글
                                                    return newLyricComment;
                                                });
                                            }}
                                        >
                                            <PencilLine className="size-4"/>
                                        </Toggle>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="p-2"
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
                                            <X/>
                                        </Button>
                                    </div>
                                </div>

                                {/* 기존 comment데이터가 있을 경우 */}
                                {!lyricComment[lineIndex] && isDefaultComment[lineIndex]?.hasComment &&
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
                        )
                    })}
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

                <Button
                    className="w-full h-[50px] tracking-wide"
                    type="submit"
                >
                    저장
                </Button>
            </form>
        </div>
    )
}

export default EditTab;