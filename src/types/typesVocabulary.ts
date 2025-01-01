interface VocabMeaning {
    Primary: string;
    "Word Type"?: string;
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
  
  export type {
    VocabData,
    VocabEntry,
    VocabMeaning,
    VocabReading
  };