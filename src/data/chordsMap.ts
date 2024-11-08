import {Finger} from "svguitar";

interface Barre {
    fromString: number;
    toString: number;
    fret: number;
    color: string;
}

interface Chord {
    fingers: Finger[]; // 이미 정의된 Finger 타입을 사용
    barres: Barre[];
}

export const chordsMap: { [key: string]: Chord } = {
    // 예시 데이터
    "A": {
        fingers: [
            [2, 2],
            [3, 2],
            [4, 2],
            [1, 0], // open-string
            [5, 0], // silent-string(mute)
            [6, 'x'],
        ],
        barres: [],
    },
    "A#": {
        fingers: [
            [2, 3],
            [3, 3],
            [4, 3],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "Ab": {
        fingers: [
            [3, 3],
            [4, 4],
            [5, 4],
            [1, 0],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Am": {
        fingers: [
            [2, 1],
            [3, 2],
            [4, 2],
            [6, 'x'],
        ],
        barres: [],
    },
    "Am11": {
        fingers: [
            [3, 4],
            [4, 4],
            [6, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "A#7": {
        fingers: [
            [2, 3],
            [4, 3],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "A#M7": {
        fingers: [
            [3, 2],
            [2, 3],
            [4, 3],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "A#m7": {
        fingers: [
            [2, 2],
            [4, 3],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "A#sus4": {
        fingers: [
            [3, 3],
            [4, 3],
            [2, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "A#m": {
        fingers: [
            [2, 2],
            [3, 3],
            [4, 3],
            [5, 1],
            [6,'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "Abm": {
        fingers: [
            [4, 4],
            [5, 4],
            [1, 0],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "A7": {
        fingers: [
            [2, 2],
            [4, 2],
            [1, 0],
            [3, 0],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Am7": {
        fingers: [
            [2, 1],
            [4, 2],
            [1, 0],
            [3, 0],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Am7/G": {
        fingers: [
            [2, 1],
            [4, 2],
            [6, 3],
            [1, 0],
            [3, 0],
            [5, 0],
        ],
        barres: [],
    },
    "A7sus4": {
        fingers: [
            [4, 2],
            [2, 3],
            [1, 0],
            [3, 0],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Asus4": {
        fingers: [
            [3, 2],
            [2, 3],
            [1, 0],
            [4, 0],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Asus2": {
        fingers: [
            [3, 2],
            [4, 2],
            [1, 0],
            [2, 0],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "AM7": {
        fingers: [
            [3, 1],
            [2, 2],
            [4, 2],
            [1, 0],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "A6": {
        fingers: [
            [5, 0],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 4,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Am6": {
        fingers: [
            [2, 1],
            [1, 2],
            [3, 2],
            [4, 2],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "A9": {
        fingers: [
            [2, 2],
            [4, 2],
            [6, 2],
            [1, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 3,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "Am9": {
        fingers: [
            [3, 2],
            [4, 2],
            [1, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "A#9": {
        fingers: [
            [1, 'x'],
            [2, 1],
            [3, 1],
            [4, 'x'],
            [5, 1],
            [6, 'x'],
        ],
        barres: [],
    },
    "Aadd9": {
        fingers: [
            [3, 4],
            [5, 4],
            [6, 5],
            [1, 'x'],
        ],
        barres: [
            {
                fromString: 4,
                toString: 2,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Adim": {
        fingers: [
            [2, 1],
            [4, 1],
            [3, 2],
            [1, 'x'],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Aaug": {
        fingers: [
            [1, 1],
            [2, 2],
            [3, 2],
            [4, 3],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "A5": {
        fingers: [
            [3, 2],
            [4, 2],
            [1, 'x'],
            [2, 'x'],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "A13": {
        fingers: [
            [1, 2],
            [2, 2],
            [4, 2],
            [3, 0],
            [5, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "B": {
        fingers: [
            [2, 4],
            [3, 4],
            [4, 4],
            [5, 2],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "B#": {
        fingers: [
            [2, 4],
            [3, 4],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "B#9": {
        fingers: [
            [4, 2],
            [2, 3],
            [3, 3],
            [5, 3],
            [1, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "B7sus4": {
        fingers: [
            [3, 2],
            [4, 2],
            [5, 2],
            [1, 0],
            [2, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Bb": {
        fingers: [
            [2, 3],
            [3, 3],
            [4, 3],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "Bm": {
        fingers: [
            [2, 3],
            [3, 4],
            [4, 4],
            [5, 2],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "B#7": {
        fingers: [
            [2, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "B#M7": {
        fingers: [
            [3, 3],
            [2, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "B#m7": {
        fingers: [
            [2, 3],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "B#sus4": {
        fingers: [
            [3, 4],
            [4, 4],
            [2, 5],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Bm11": {
        fingers: [
            [3, 2],
            [5, 2],
            [2, 3],
            [1, 0],
            [4, 0],
            [6, 'x']
        ],
        barres: [],
    },
    "Bm7/G": {
        fingers: [
            [1, 2],
            [3, 2],
            [6, 3],
            [2, 0],
            [4, 0],
            [5, 0],
        ],
        barres: [],
    },
    "Bm9": {
        fingers: [
            [1, 2],
            [2, 2],
            [3, 2],
            [5, 2],
            [4, 0],
            [6, 'x']
        ],
        barres: [],
    },
    "B#m": {
        fingers: [
            [2, 3],
            [3, 4],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Bbm": {
        fingers: [
            [2, 2],
            [3, 3],
            [4, 3],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "B7": {
        fingers: [
            [4, 1],
            [1, 2],
            [3, 2],
            [5, 2],
            [2, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Bm7": {
        fingers: [
            [2, 3],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Bsus4": {
        fingers: [
            [3, 4],
            [4, 4],
            [2, 5],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Bsus2": {
        fingers: [
            [3, 4],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "BM7": {
        fingers: [
            [3, 3],
            [2, 4],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "B6": {
        fingers: [
            [3, 1],
            [4, 1],
            [1, 2],
            [5, 2],
            [2, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Bm6": {
        fingers: [
            [3, 1],
            [1, 2],
            [5, 2],
            [2, 0],
            [4, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "B9": {
        fingers: [
            [4, 1],
            [2, 2],
            [3, 2],
            [5, 2],
            [1, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Badd9": {
        fingers: [
            [4, 1],
            [2, 2],
            [5, 2],
            [3, 4],
            [1, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Bdim": {
        fingers: [
            [5, 2],
            [2, 3],
            [4, 3],
            [3, 4],
            [1, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Baug": {
        fingers: [
            [1, 2],
            [2, 3],
            [3, 3],
            [4, 'x'],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "B5": {
        fingers: [
            [1, 2],
            [2, 0],
            [3, 'x'],
            [4, 'x'],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "B13": {
        fingers: [
            [4, 1],
            [3, 2],
            [5, 2],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 2,
                toString: 1,
                fret: 4,
                color: '#000000',
            },
        ],
    },
    "C": {
        fingers: [
            [2, 1],
            [4, 2],
            [5, 3],
            [1, 0],
            [3, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "C#": {
        fingers: [
            [2, 4],
            [3, 4],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "C#9": {
        fingers: [
            [4, 3],
            [2, 4],
            [3, 4],
            [5, 4],
            [1, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "C7sus4": {
        fingers: [
            [2, 5],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Cm11": {
        fingers: [
            [3, 3],
            [5, 3],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 4,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "Cm7/G": {
        fingers: [
            [2, 3],
            [4, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Cm9": {
        fingers: [
            [4, 1],
            [2, 3],
            [3, 3],
            [5, 3],
            [1, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Cb": {
        fingers: [
            [2, 4],
            [3, 4],
            [4, 4],
            [5, 2],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Cm": {
        fingers: [
            [2, 3],
            [3, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "C#7": {
        fingers: [
            [2, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "C#M7": {
        fingers: [
            [3, 3],
            [2, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "C#m7": {
        fingers: [
            [2, 3],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "C#sus4": {
        fingers: [
            [3, 4],
            [4, 4],
            [2, 5],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "C#m": {
        fingers: [
            [2, 3],
            [3, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Cbm": {
        fingers: [
            [2, 3],
            [3, 4],
            [4, 4],
            [5, 2],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "C7": {
        fingers: [
            [2, 1],
            [4, 2],
            [3, 3],
            [5, 3],
            [1, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Cm7": {
        fingers: [
            [2, 3],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Csus4": {
        fingers: [
            [2, 1],
            [1, 3],
            [4, 3],
            [5, 3],
            [3, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Csus2": {
        fingers: [
            [2, 1],
            [1, 3],
            [5, 3],
            [3, 0],
            [4, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "CM7": {
        fingers: [
            [4, 2],
            [5, 3],
            [1, 0],
            [2, 0],
            [3, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "C6": {
        fingers: [
            [2, 1],
            [3, 2],
            [4, 2],
            [5, 3],
            [1, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Cm6": {
        fingers: [
            [4, 1],
            [3, 2],
            [5, 3],
            [2, 4],
            [1, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "C9": {
        fingers: [
            [4, 2],
            [2, 3],
            [3, 3],
            [5, 3],
            [1, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Cadd9": {
        fingers: [
            [4, 2],
            [2, 3],
            [5, 3],
            [1, 0],
            [3, 0],
            [6, 'x'],
        ],
        barres: [],
    },
    "Cdim": {
        fingers: [
            [1, 2],
            [2, 4],
            [3, 5],
            [4, 'x'],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Caug": {
        fingers: [
            [1, 2],
            [2, 3],
            [3, 3],
            [4, 'x'],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "C5": {
        fingers: [
            [2, 1],
            [1, 3],
            [3, 'x'],
            [4, 'x'],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "C13": {
        fingers: [
            [4, 2],
            [3, 3],
            [5, 3],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 2,
                toString: 1,
                fret: 5,
                color: '#000000',
            },
        ],
    },
    "D": {
        fingers: [
            [1, 2],
            [2, 3],
            [3, 2],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "D#": {
        fingers: [
            [2, 4],
            [3, 4],
            [4, 4],
            [5, 2],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Db": {
        fingers: [
            [2, 4],
            [3, 4],
            [4, 4],
            [5, 2],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Dm": {
        fingers: [
            [1, 1],
            [2, 3],
            [3, 2],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "D#7": {
        fingers: [
            [2, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "D#M7": {
        fingers: [
            [3, 3],
            [2, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "D#m7": {
        fingers: [
            [2, 3],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "D#sus4": {
        fingers: [
            [3, 4],
            [4, 4],
            [2, 5],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "D#m": {
        fingers: [
            [2, 3],
            [3, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Dbm": {
        fingers: [
            [2, 3],
            [3, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "D7": {
        fingers: [
            [1, 2],
            [2, 1],
            [3, 2],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Dm7": {
        fingers: [
            [1, 1],
            [2, 1],
            [3, 2],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "D7sus4": {
        fingers: [
            [2, 1],
            [3, 2],
            [1, 3],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Dsus4": {
        fingers: [
            [3, 2],
            [1, 3],
            [2, 3],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Dsus2": {
        fingers: [
            [3, 2],
            [2, 3],
            [1, 0],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "DM7": {
        fingers: [
            [1, 2],
            [2, 2],
            [3, 2],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "D6": {
        fingers: [
            [1, 2],
            [2, 0],
            [3, 2],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Dm6": {
        fingers: [
            [1, 1],
            [2, 0],
            [3, 2],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "D9": {
        fingers: [
            [4, 2],
            [2, 3],
            [3, 3],
            [5, 3],
            [1, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Dadd9": {
        fingers: [
            [4, 4],
            [2, 5],
            [5, 5],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 3,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Ddim": {
        fingers: [
            [1, 2],
            [2, 4],
            [3, 5],
            [4, 'x'],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Daug": {
        fingers: [
            [1, 2],
            [2, 3],
            [3, 3],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "D5": {
        fingers: [
            [3, 2],
            [2, 3],
            [1, 'x'],
            [4, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "D13": {
        fingers: [
            [4, 2],
            [3, 3],
            [5, 3],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 2,
                toString: 1,
                fret: 5,
                color: '#000000',
            },
        ],
    },
    "D/F#": {
        fingers: [
            [1, 2],
            [3, 2],
            [6, 2],
            [2, 3],
            [4, 0],
            [5, 0],
        ],
        barres: [],
    },
    "E": {
        fingers: [
            [3, 1],
            [4, 2],
            [5, 2],
            [1, 0],
            [2, 0],
            [6, 0],
        ],
        barres: [],
    },
    "E#": {
        fingers: [
            [2, 4],
            [3, 4],
            [4, 4],
            [5, 2],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Eb": {
        fingers: [
            [2, 4],
            [3, 4],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Em": {
        fingers: [
            [4, 2],
            [5, 2],
            [1, 0],
            [2, 0],
            [3, 0],
            [6, 0],
        ],
        barres: [],
    },
    "E#7": {
        fingers: [
            [3, 2],
            [5, 3],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "E#M7": {
        fingers: [
            [3, 2],
            [4, 2],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "E#m7": {
        fingers: [
            [5, 3],
            [6, 0]
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "E#sus4": {
        fingers: [
            [3, 3],
            [4, 3],
            [6, 0]
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "E#m": {
        fingers: [
            [2, 3],
            [3, 4],
            [4, 4],
            [6, 'x']
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Ebm": {
        fingers: [
            [2, 3],
            [3, 4],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "E7": {
        fingers: [
            [3, 1],
            [5, 2],
            [1, 0],
            [2, 0],
            [4, 0],
            [6, 0],
        ],
        barres: [],
    },
    "Em7": {
        fingers: [
            [5, 2],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
            [6, 0],
        ],
        barres: [],
    },
    "E7sus4": {
        fingers: [
            [3, 2],
            [5, 2],
            [1, 0],
            [2, 0],
            [4, 0],
            [6, 0],
        ],
        barres: [],
    },
    "Esus4": {
        fingers: [
            [3, 2],
            [4, 2],
            [1, 0],
            [2, 0],
            [5, 0],
            [6, 0],
        ],
        barres: [],
    },
    "Esus2": {
        fingers: [
            [1, 2],
            [4, 2],
            [3, 4],
            [2, 5],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "EM7": {
        fingers: [
            [3, 1],
            [4, 1],
            [5, 2],
            [1, 0],
            [2, 0],
            [6, 0],
        ],
        barres: [],
    },
    "E6": {
        fingers: [
            [3, 1],
            [2, 2],
            [4, 2],
            [5, 2],
            [1, 0],
            [6, 0],
        ],
        barres: [],
    },
    "Em6": {
        fingers: [
            [2, 2],
            [4, 2],
            [5, 2],
            [1, 0],
            [3, 0],
            [6, 0],
        ],
        barres: [],
    },
    "E9": {
        fingers: [
            [3, 1],
            [1, 2],
            [5, 2],
            [2, 0],
            [4, 0],
            [6, 0],
        ],
        barres: [],
    },
    "Eadd9": {
        fingers: [
            [3, 1],
            [1, 2],
            [4, 2],
            [5, 2],
            [2, 0],
            [6, 0],
        ],
        barres: [],
    },
    "Edim": {
        fingers: [
            [5, 1],
            [4, 2],
            [1, 'x'],
            [2, 'x'],
            [3, 0],
            [6, 0],
        ],
        barres: [],
    },
    "Eaug": {
        fingers: [
            [2, 1],
            [3, 1],
            [4, 2],
            [5, 3],
            [1, 0],
            [6, 0],
        ],
        barres: [],
    },
    "E5": {
        fingers: [
            [4, 2],
            [5, 2],
            [1, 'x'],
            [2, 'x'],
            [3, 'x'],
            [6, 0],
        ],
        barres: [],
    },
    "E13": {
        fingers: [
            [3, 1],
            [2, 2],
            [5, 2],
            [1, 0],
            [4, 0],
            [6, 0],
        ],
        barres: [],
    },
    "F": {
        fingers: [
            [3, 2],
            [4, 3],
            [5, 3],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "F#": {
        fingers: [
            [3, 3],
            [4, 4],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Fb": {
        fingers: [
            [2, 4],
            [3, 4],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Fm": {
        fingers: [
            [4, 3],
            [5, 3],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "F#7": {
        fingers: [
            [3, 3],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "F#M7": {
        fingers: [
            [3, 3],
            [4, 3],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "F#sus4": {
        fingers: [
            [3, 4],
            [4, 4],
            [6, 0]
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "F#m7-5": {
        fingers: [
            [2, 1],
            [3, 2],
            [4, 2],
            [6, 2],
            [1, 0],
            [5, 0],
        ],
        barres: [],
    },
    "F#m": {
        fingers: [
            [4, 4],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "F#m7": {
        fingers: [
            [1, 0],
            [2, 2],
            [3, 2],
            [4, 2],
            [5, 0],
            [6, 2],
        ],
        barres: [],
    },
    "Fbm": {
        fingers: [
            [2, 3],
            [3, 4],
            [4, 4],
            [6, 'x'],
        ],
        barres: [
            {
                fromString: 5,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "F7": {
        fingers: [
            [3, 2],
            [5, 3],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "Fm7": {
        fingers: [
            [5, 3],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "Fsus4": {
        fingers: [
            [3, 3],
            [4, 3],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 1,
                color: '#000000',
            },
        ],
    },
    "Fsus2": {
        fingers: [
            [1, 1],
            [2, 1],
            [4, 3],
            [3, 0],
            [5, 'x'],
            [5, 'x'],
        ],
        barres: [],
    },
    "FM7": {
        fingers: [
            [2, 1],
            [3, 2],
            [4, 3],
            [1, 'x'],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "F6": {
        fingers: [
            [1, 1],
            [2, 1],
            [6, 1],
            [3, 2],
            [4, 0],
            [5, 0],
        ],
        barres: [],
    },
    "Fm6": {
        fingers: [
            [2, 1],
            [3, 1],
            [6, 1],
            [5, 3],
            [1, 'x'],
            [4, 0],
        ],
        barres: [],
    },
    "F9": {
        fingers: [
            [1, 1],
            [2, 1],
            [4, 1],
            [6, 1],
            [3, 0],
            [5, 0],
        ],
        barres: [],
    },
    "Fadd9": {
        fingers: [
            [2, 1],
            [3, 2],
            [1, 3],
            [4, 3],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Fdim": {
        fingers: [
            [1, 1],
            [3, 1],
            [4, 3],
            [2, 0],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "Faug": {
        fingers: [
            [1, 1],
            [2, 2],
            [3, 2],
            [4, 3],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "F5": {
        fingers: [
            [6, 1],
            [4, 3],
            [5, 3],
            [1, 'x'],
            [2, 'x'],
            [3, 'x'],
        ],
        barres: [],
    },
    "F13": {
        fingers: [
            [4, 1],
            [6, 1],
            [1, 3],
            [2, 3],
            [3, 0],
            [5, 0],
        ],
        barres: [],
    },
    "G": {
        fingers: [
            [5, 2],
            [1, 3],
            [6, 3],
            [2, 0],
            [3, 0],
            [4, 0],
        ],
        barres: [],
    },
    "G#": {
        fingers: [
            [3, 3],
            [4, 4],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Gb": {
        fingers: [
            [3, 3],
            [4, 4],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Gm": {
        fingers: [
            [4, 4],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "G#7": {
        fingers: [
            [3, 3],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "G#M7": {
        fingers: [
            [3, 3],
            [4, 3],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "G#m7": {
        fingers: [
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "G#sus4": {
        fingers: [
            [3, 4],
            [4, 4],
            [6, 0]
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "G#m": {
        fingers: [
            [4, 4],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Gbm": {
        fingers: [
            [4, 4],
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "G7": {
        fingers: [
            [1, 1],
            [5, 2],
            [6, 3],
            [4, 0],
            [3, 0],
            [2, 0],
        ],
        barres: [],
    },
    "Gm7": {
        fingers: [
            [5, 4],
            [6, 0],
        ],
        barres: [
            {
                fromString: 6,
                toString: 1,
                fret: 2,
                color: '#000000',
            },
        ],
    },
    "Gsus4": {
        fingers: [
            [1, 3],
            [2, 3],
            [5, 3],
            [6, 3],
            [4, 0],
            [3, 0],
        ],
        barres: [],
    },
    "Gsus2": {
        fingers: [
            [1, 3],
            [2, 3],
            [6, 3],
            [3, 0],
            [4, 0],
            [5, 0],
        ],
        barres: [],
    },
    "GM7": {
        fingers: [
            [1, 2],
            [5, 2],
            [6, 3],
            [2, 0],
            [3, 0],
            [4, 0],
        ],
        barres: [],
    },
    "G6": {
        fingers: [
            [5, 2],
            [6, 3],
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
        ],
        barres: [],
    },
    "Gm6": {
        fingers: [
            [5, 1],
            [2, 3],
            [6, 3],
            [1, 0],
            [3, 0],
            [4, 0],
        ],
        barres: [],
    },
    "G9": {
        fingers: [
            [3, 2],
            [5, 2],
            [4, 3],
            [6, 3],
            [1, 'x'],
            [2, 0],
        ],
        barres: [],
    },
    "Gadd9": {
        fingers: [
            [3, 2],
            [5, 2],
            [1, 3],
            [6, 3],
            [1, 'x'],
            [4, 0],
        ],
        barres: [],
    },
    "Gdim": {
        fingers: [
            [3, 2],
            [6, 2],
            [5, 3],
            [4, 4],
            [1, 'x'],
            [2, 'x'],
        ],
        barres: [],
    },
    "Gaug": {
        fingers: [
            [4, 1],
            [5, 2],
            [1, 3],
            [6, 3],
            [2, 0],
            [3, 0],
        ],
        barres: [],
    },
    "G5": {
        fingers: [
            [1, 3],
            [2, 3],
            [3, 0],
            [4, 'x'],
            [5, 'x'],
            [6, 'x'],
        ],
        barres: [],
    },
    "G13": {
        fingers: [
            [5, 2],
            [4, 3],
            [6, 3],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
        barres: [],
    },
    "G/B": {
        fingers: [
            [5, 2],
            [1, 3],
            [2, 3],
            [3, 0],
            [4, 0],
            [6, 'x'],
        ],
        barres: [],
    },
};