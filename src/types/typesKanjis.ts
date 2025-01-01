interface RadicalCombination {
    [key: string]: string;
  }
  
  interface ReadingType {
    meaning: string;
    primary: boolean;
  }
  
  interface Reading {
    mnemonc: string;
    hint: string;
    nanori: ReadingType;
    onyomi: ReadingType;
    kunyomi: ReadingType;
  }
  
  interface Meaning {
    Primary: string;
    mnemonc: string;
    hint: string;
    alt?: string;
  }
  
  interface VocabEntry {
    reading: string;
    meaning: string;
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
    Reading,
    ReadingType,
    Meaning,
    VocabEntry,
    FoundInVocab 
  };