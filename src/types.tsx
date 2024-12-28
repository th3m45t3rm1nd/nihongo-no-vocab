interface VocabMeaning {
    explanation: string;
  }
  
  interface VocabReading {
    reading: string;
    explanation: string;
  }
  
  interface VocabEntry {
    id: string;
    level: string;
    difficulty: string;
    meaning: VocabMeaning;
    reading: VocabReading;
  }
  
  interface VocabData {
    [key: string]: VocabEntry;
  }

interface KanjiReference {
    reading: string;
    meaning: string;
  }
  
  interface FoundInKanji {
    [key: string]: KanjiReference;
  }
  
  interface RadicalEntry {
    id: string;
    mnemonic: string;
    difficulty: string;
    level: string;
    foundInKanji: FoundInKanji;
  }
  
  interface RadicalData {
    [key: string]: RadicalEntry;
  }
  
interface RadicalCombination {
    [key: string]: string;
  }
  
  interface Meaning {
    Primary: string;
    Alternatives: string;
    mnemonc: string;
    hint: string;
  }
  
  interface ReadingType {
    meaning: string;
    primary: boolean;
  }
  
  interface Reading {
    Onyomi: ReadingType;
    Kunyomi: ReadingType;
    Nanori: ReadingType;
    mnemonc: string;
    hint: string;
  }
  
interface FoundInVocab {
    [key: string]: VocabEntry;
  }
  
  interface KanjiEntry {
    id: string;
    difficulty: string;
    level: string;
    radicalCombination: RadicalCombination;
    meaning: Meaning;
    reading: Reading;
    foundInVocab: FoundInVocab;
  }
  
  interface KanjiData {
    [key: string]: KanjiEntry;
  }
  
  export type { 
    KanjiData, 
    KanjiEntry, 
    RadicalCombination, 
    Meaning, 
    ReadingType, 
    Reading, 
    VocabEntry, 
    FoundInVocab,
    RadicalData,
    RadicalEntry,
    FoundInKanji,
    KanjiReference,
    VocabData,
};