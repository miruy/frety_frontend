import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";

interface ChordSelectorProps {
    setChord: (chord: string) => void;
    deleteChord: () => void;
}

const chordData: { [key: string]: string[] } = {
    "A 코드": [
        "A", "A#", "A#7", "A#9", "A#M7", "A#m", "A#m7", "A#sus4", "A13", "A5",
        "A6", "A7", "A7sus4", "A9", "AM7", "Aadd9", "Aaug", "Ab", "Abm", "Adim",
        "Am", "Am11", "Am6", "Am7", "Am7/G", "Am9", "Asus2", "Asus4"
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
        "D", "D#", "D#7", "D#M7", "D#m", "D#m7", "D#sus4", "D/F#", "D13", "D5",
        "D6", "D7", "D7sus4", "D9", "DM7", "Dadd9", "Daug", "Db", "Dbm", "Ddim",
        "Dm", "Dm6", "Dm7", "Dsus2", "Dsus4"
    ],
    "E 코드": [
        "E", "E#", "E#7", "E#M7", "E#m", "E#m7", "E#sus4", "E13", "E5", "E6",
        "E7", "E7sus4", "E9", "EM7", "Eadd9", "Eaug", "Eb", "Ebm", "Edim", "Em",
        "Em6", "Em7(A)", "Em7(B)", "Em7(C)", "Em7(D)", "Em9(A)", "Em9(B)", "Esus2", "Esus4"
    ],
    "F 코드": [
        "F", "F#", "F#7", "F#M7", "F#m", "F#m7", "F#m7-5", "F#sus4", "F13", "F5",
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
                            {chordData[key].map((value, valueIndex) => (
                                <CommandItem
                                    key={valueIndex}
                                    className="text-xs cursor-pointer"
                                    onSelect={() => {
                                        setChord(value)
                                    }}
                                >
                                    <span>{value}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </div>
                ))}
            </CommandList>
        </Command>
    )
}

export default ChordSelector;