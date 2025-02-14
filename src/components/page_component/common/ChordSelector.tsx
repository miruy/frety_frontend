import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
import {SVGuitarChord} from "svguitar";
import {commonConfigs, customConfigs} from "@/data/drawChordDiagram";
import {chordsMap} from "@/data/chordsMap";

interface ChordSelectorProps {
    setChord: (chord: string) => void;
    deleteChord: () => void;
}

const chordData: { [key: string]: string[] } = {
    "A 코드": [
        "A", "A#", "A#7", "A#9", "A#M7", "A#m", "A#m7", "A#sus4", "A13", "A5",
        "A6", "A7", "A7sus4", "A9", "AM7", "Aadd9", "Aaug", "Ab", "Abm", "Adim",
        "Am", "Am11", "Am6", "Am7", "A/E", "A/C#", "Am7/G", "Am9", "Asus2", "Asus4"
    ],
    "B 코드": [
        "B", "B#", "B#7", "B#9", "B#M7", "B#m", "B#m7", "B#sus4", "B13", "B5",
        "B6", "B7", "B7sus4", "B9", "BM7", "Badd9", "Baug", "Bb", "Bbm", "Bdim",
        "Bm", "Bm11", "Bm6", "Bm7(A)", "Bm7(B)", "Bm7/G", "Bm9", "Bsus2", "Bsus4"
    ],
    "C 코드": [
        "C", "C#", "C#7", "C#9", "C#M7", "C#m", "C#m7", "C#sus4", "C13", "C5",
        "C6", "C7", "C7sus4", "C9", "CM7", "Cadd9(A)", "Cadd9(B)", "Caug", "Cb", "Cbm", "Cdim",
        "Cm", "Cm11", "Cm6", "Cm7", "Cm7/G", "Cm9", "Csus2", "Csus4"
    ],
    "D 코드": [
        "D", "D#", "D#7", "D#M7", "D#m", "D#m7", "D#sus4", "D/E", "D/F#", "D13", "D5",
        "D6", "D7", "D7sus4", "D9", "DM7", "Dadd9", "Daug", "Db", "Dbm", "D#dim", "Ddim",
        "Dm", "Dm6", "Dm7", "Dsus2", "Dsus4",
    ],
    "E 코드": [
        "E", "E#", "E#7", "E#M7", "E#m", "E#m7", "E#sus4", "E13", "E5", "E6",
        "E7(A)", "E7(B)", "E7sus4", "E9", "EM7", "Eadd9", "Eaug", "Eb", "Ebm", "Edim", "Em", "Em/D",
        "Em6", "Em7(A)", "Em7(B)", "Em7(C)", "Em7(D)", "Em9(A)", "Em9(B)", "Esus2", "Esus4"
    ],
    "F 코드": [
        "F", "F#", "F#7", "F#M7", "F#m", "F#m7", "F#m9", "F#m7-5", "F#sus4", "F13", "F5",
        "F6", "F7", "F9", "FM7", "Fadd9", "Faug", "Fb", "Fbm", "Fdim", "Fm",
        "Fm6", "Fm7", "Fsus2", "Fsus4"
    ],
    "G 코드": [
        "G(A)", "G(B)", "G#", "G#7", "G#M7", "G#m", "G#m7", "G#m7-5", "G#sus4", "G/B", "G13", "G5",
        "G6", "G7", "G9", "GM7", "Gadd9", "Gaug", "Gb", "Gbm", "Gdim", "G#dim7/D", "Gm",
        "Gm6", "Gm7", "Gsus2", "Gsus4"
    ]
};


const ChordSelector = ({setChord, deleteChord}: ChordSelectorProps) => {

    // 코드다이어그램 미리보기
    const drawChordDiagram = (container: HTMLDivElement, chordName: string) => {

        if (!container) return;

        // 기존 내용 초기화 (중복 방지)
        container.innerHTML = "";

        // 다이어그램 생성
        const chordDiagram = new SVGuitarChord(container);
        const customConfig = customConfigs[chordName];
        const chord = chordsMap[chordName];

        chordDiagram
            .configure({
                ...commonConfigs,
                ...customConfig,
            })
            .chord(chord)
            .draw();

        // SVG 크기 설정
        const svgElement = container.querySelector("svg");
        if (svgElement) {
            svgElement.style.height = "50px"; // 높이 설정
            svgElement.style.width = "50px"; // 너비 설정
        }

        // 프랫 번호 위치 설정
        const tuningText = container.querySelectorAll("text.tuning");
        if (tuningText.length > 1) {
            const currentX = parseFloat(tuningText[0].getAttribute("x") || "0");
            const currentY = parseFloat(tuningText[0].getAttribute("y") || "0");

            tuningText[0].setAttribute("x", (currentX - 177).toString()); // 왼쪽으로 이동
            tuningText[0].setAttribute("y", (currentY + 55).toString());  // 아래로 이동
        }
    };

    return (
        <Command className="rounded-lg border shadow-md w-[230px]">
            <CommandInput placeholder="Search"/>
            <CommandList className="p-1">
                <CommandEmpty className="py-10 text-center text-xs text-primary/50">검색결과 없음</CommandEmpty>

                <CommandItem
                    className="text-[13.5px] mb-1 cursor-pointer"
                    onSelect={deleteChord}
                >
                    코드 제거
                </CommandItem>
                {Object.keys(chordData).map((key, KeyIndex) => (
                    <div key={KeyIndex}>
                        <CommandSeparator/>
                        <CommandGroup heading={key}
                                      className="[&_[cmdk-group-heading]]:text-[14px] [&_[cmdk-group-heading]]:cursor-default">
                            {chordData[key].map((value, valueIndex) => {
                                return (
                                    <CommandItem
                                        key={valueIndex}
                                        className="flex justify-between text-xs cursor-pointer"
                                        onSelect={() => {
                                            setChord(value)
                                        }}
                                    >
                                        <div>{value}</div>

                                        <div
                                            ref={(ref) => {
                                                if (ref) {
                                                    drawChordDiagram(ref, value); // 다이어그램 즉시 생성
                                                }
                                            }}
                                        ></div>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </div>
                ))}
            </CommandList>
        </Command>
    )
}

export default ChordSelector;