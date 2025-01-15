import {ChordStyle, Orientation} from "svguitar";

// 공통 설정
export const commonConfigs = {
    position: 1,
    orientation: 'horizontal' as Orientation,
    style: 'normal' as ChordStyle,
    strings: 6,
    frets: 5,
    fretSize: 1,
    fontFamily: 'Open Sans, Arial, sans-serif',
    color: '#000000',
    backgroundColor: 'none',
    fingerSize: 0.7,
    barreChordStrokeWidth: 0.1,
    barreChordRadius: 0.5,
    emptyStringIndicatorSize: 0.7,
    strokeWidth: 5,
    nutWidth: 14,
    fixedDiagramPosition: false,
    sidePadding: 0.2,
    tuningsFontSize: 75,
};

// 커스텀 설정
interface CustomConfig {
    noPosition: boolean;
    tuning: string[];
    svgTitle: string;
}

const definedCustomConfigs = {
    tuning4: {noPosition: true, tuning: ['4', '', '', '', '', ''], svgTitle: "Frety_chord"},
    tuning3: {noPosition: true, tuning: ['3', '', '', '', '', ''], svgTitle: "Frety_chord"},
    tuning6: {noPosition: true, tuning: ['6', '', '', '', '', ''], svgTitle: "Frety_chord"},
    tuning7: {noPosition: true, tuning: ['7', '', '', '', '', ''], svgTitle: "Frety_chord"},
    tuning8: {noPosition: true, tuning: ['8', '', '', '', '', ''], svgTitle: "Frety_chord"},
};

export const customConfigs: Record<string, CustomConfig> = {
    "Am11": definedCustomConfigs.tuning3,
    "Ab": definedCustomConfigs.tuning4,
    "Abm": definedCustomConfigs.tuning4,
    "A9": definedCustomConfigs.tuning4,
    "B#": definedCustomConfigs.tuning3,
    "B#7": definedCustomConfigs.tuning3,
    "B#M7": definedCustomConfigs.tuning3,
    "B#m7": definedCustomConfigs.tuning3,
    "B#sus4": definedCustomConfigs.tuning3,
    "B#m": definedCustomConfigs.tuning3,
    "Baug": definedCustomConfigs.tuning3,
    "C#": definedCustomConfigs.tuning4,
    "C#m": definedCustomConfigs.tuning4,
    "Cm": definedCustomConfigs.tuning3,
    "C#7": definedCustomConfigs.tuning4,
    "C7sus4": definedCustomConfigs.tuning3,
    "Cm7/G": definedCustomConfigs.tuning3,
    "C#M7": definedCustomConfigs.tuning4,
    "C#m7": definedCustomConfigs.tuning4,
    "C#sus4": definedCustomConfigs.tuning4,
    "Cm7": definedCustomConfigs.tuning3,
    "Caug": definedCustomConfigs.tuning4,
    "D#": definedCustomConfigs.tuning6,
    "D#7": definedCustomConfigs.tuning6,
    "D#M7": definedCustomConfigs.tuning6,
    "D#m7": definedCustomConfigs.tuning6,
    "D#sus4": definedCustomConfigs.tuning6,
    "D#m": definedCustomConfigs.tuning6,
    "Db": definedCustomConfigs.tuning4,
    "Dbm": definedCustomConfigs.tuning4,
    "D9": definedCustomConfigs.tuning4,
    "Ddim": definedCustomConfigs.tuning4,
    "D13": definedCustomConfigs.tuning4,
    "E#": definedCustomConfigs.tuning8,
    "E#m": definedCustomConfigs.tuning8,
    "Eb": definedCustomConfigs.tuning6,
    "Ebm": definedCustomConfigs.tuning6,
    "Fb": definedCustomConfigs.tuning7,
    "Fbm": definedCustomConfigs.tuning7,
    "G#": definedCustomConfigs.tuning4,
    "G#m": definedCustomConfigs.tuning4,
    "Gm": definedCustomConfigs.tuning3,
    "Gm7": definedCustomConfigs.tuning3,
    "Gdim": definedCustomConfigs.tuning3,
    "G#m7-5": definedCustomConfigs.tuning3,
    "G#7": definedCustomConfigs.tuning4,
    "G#M7": definedCustomConfigs.tuning4,
    "G#m7": definedCustomConfigs.tuning4,
    "G#sus4": definedCustomConfigs.tuning4,

    // 기본 설정이 없을 때 사용할 공통 설정
    default: {
        noPosition: false,
        tuning: ['\u2002', '', '', '', '', ''],
        svgTitle: "Frety_chord",
    }
};