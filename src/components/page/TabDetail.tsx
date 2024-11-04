'use client';

import {faker} from "@faker-js/faker";
import {Switch} from "@/components/ui/switch";
import {useEffect, useState} from "react";
import {SVGuitarChord} from 'svguitar'
import {chordsMap} from "@/data/chordsMap";
import {commonConfigs, customConfigs} from "@/data/drawChordDiagram";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {
    Ellipsis, Eraser, Star, Trash2,
} from "lucide-react";
import {useRouter} from "next/navigation";

const TabDetail = () => {

    const [chords] = useState<boolean>(true);
    const [showDiagram, setShowDiagram] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const diagramElement = document.getElementById('chordDiagram');

        if (diagramElement && chords) {
            const chordDiagram = new SVGuitarChord(diagramElement)
            const chord = chordsMap["A"];
            const customConfig = customConfigs["A"]; // 프렛 설정을 위한 커스텀 설정

            chordDiagram
                .configure({
                    ...commonConfigs,
                    ...customConfig,
                })
                .chord(chord)
                .draw()

            // 프랫 위치 설정
            const tuningText = diagramElement.querySelectorAll('text.tuning');
            if (tuningText.length > 1) {

                const currentX = parseFloat(tuningText[0].getAttribute('x') || '0');
                const currentY = parseFloat(tuningText[0].getAttribute('y') || '0');

                tuningText[0].setAttribute('x', (currentX - 177).toString()); // 왼쪽으로 이동
                tuningText[0].setAttribute('y', (currentY + 50).toString());   // 아래로 이동
            }
        }
    }, [chords]);


    const tab = {
        id: 1,
        artist: "임창정",
        song: "나란 놈이란",
        writer: faker.name.fullName(),
        capo: "No Capo",
        style: "스트럼 (Strumming)",
        createAt: faker.date.past().toLocaleDateString(),
        voter: faker.date.past().toLocaleDateString(),
        comment: faker.lorem.words(3),
        reply: faker.lorem.words(3),
    }

    return (
        <div className="px-3 py-10 mx-auto w-full lg:w-[70%]">
            <div className="space-y-2 border-b pb-2">
                <div className="text-4xl font-bold tracking-wide">{tab.song}</div>
                <div className="text-lg font-semibold tracking-wide text-primary/50">{tab.artist}</div>
            </div>

            <div className="flex justify-between py-2">
                <div>
                    <div className="flex items-center space-x-2 tracking-wide text-sm">
                        <div>Capo</div>
                        <div>:</div>
                        <div>{tab.capo}</div>
                    </div>

                    <div className="flex items-center space-x-2 tracking-wide text-sm">
                        <div>Style</div>
                        <div>:</div>
                        <div>{tab.style}</div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center border h-10 rounded-md px-3">
                        <label className="label cursor-pointer">
                            <div className="flex items-center space-x-2">
                                <img id="offChord" src="/image/offChord.png" alt="chord_off" className="w-[22px]"/>
                                <Switch checked={showDiagram} className="h-5 w-10"
                                        onClick={() => setShowDiagram(!showDiagram)}/>
                                <img id="onChord" src="/image/onChord.png" alt="chord_on" className="w-[20px]"/>
                            </div>
                        </label>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-10"><Ellipsis/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="end" className="w-fit h-fit p-2">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Star/>
                                    <span className="text-[14px]">즐겨찾기 추가</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => router.push(`/edit/${tab.id}`)}>
                                    <Eraser/>
                                    <span className="text-[14px]">수정</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Trash2/>
                                    <span className="text-[14px]">삭제</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div>
                <div id="chordDiagram" className={`${showDiagram ? 'flex' : 'hidden'} w-20 h-20`}/>
            </div>
        </div>
    )
}

export default TabDetail;