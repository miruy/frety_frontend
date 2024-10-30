'use client';

import {faker} from "@faker-js/faker";
import {Switch} from "@/components/ui/switch";
import {useEffect, useState} from "react";
import {SVGuitarChord} from 'svguitar'
import {chordsMap} from "@/data/chordsMap";
import {commonConfigs, customConfigs} from "@/data/drawChordDiagram";

const TabDetail = () => {

    const [chords] = useState<boolean>(true);
    const [showDiagram, setShowDiagram] = useState<boolean>(true);

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
    }, []);


    const tabDetailElements = {
        no: 1,
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
                <div className="text-4xl font-bold tracking-wide">{tabDetailElements.song}</div>
                <div className="text-lg font-semibold tracking-wide text-primary/50">{tabDetailElements.artist}</div>
            </div>

            <div className="flex justify-between py-2">
                <div>
                    <div className="flex items-center space-x-2 tracking-wide text-sm">
                        <div>Capo</div>
                        <div>:</div>
                        <div>{tabDetailElements.capo}</div>
                    </div>

                    <div className="flex items-center space-x-2 tracking-wide text-sm">
                        <div>Style</div>
                        <div>:</div>
                        <div>{tabDetailElements.style}</div>
                    </div>
                </div>

                <div className="flex items-center bg-secondary rounded-sm px-3">
                    <label className="label cursor-pointer">
                        <div className="flex items-center space-x-2">
                            <img id="offChord" src="/image/offChord.png" alt="chord_off" className="w-[22px]"/>
                            <Switch checked={showDiagram} className="h-5 w-10"
                                    onClick={() => setShowDiagram(!showDiagram)}/>
                            <img id="onChord" src="/image/onChord.png" alt="chord_on" className="w-[20px]"/>
                        </div>
                    </label>
                </div>
            </div>

            <div>
                <div id="chordDiagram" className={`${showDiagram ? 'flex' : 'hidden'} w-20 h-20`}/>
            </div>
        </div>
    )
}

export default TabDetail;