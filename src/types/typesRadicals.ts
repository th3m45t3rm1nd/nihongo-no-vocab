interface KanjiReference {
    reading: string;
    meaning: string;
  }
  
  interface FoundInKanji {
    [key: string]: KanjiReference;
  }
  
  interface RadicalEntry {
    id: string;
    character: string;
    mnemonic: string;
    difficulty: string;
    level: string;
    foundInKanji: FoundInKanji;
  }
  
  interface RadicalData {
    [key: string]: RadicalEntry;
  }
  
  export type { RadicalData, RadicalEntry, KanjiReference, FoundInKanji };