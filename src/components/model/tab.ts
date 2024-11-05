export interface Syllable {
    text: string;
    chord: string | null;
}

interface Content {
    comment: string;
    lineData: Syllable[];
}

export interface Tab {
    id: number;
    artist: string;
    song: string;
    capo: string;
    style: string;
    content: Content[];
}
