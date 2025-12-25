
export interface Child {
  name: string;
  age: number;
}

export interface Player {
  id: string;
  childName: string;
  childAge: number;
  parentName: string;
  score: number;
  color: string;
}

export interface QuestionCategory {
  category: string;
  items: string[];
  questions?: string[];
}

export interface Round3Item {
  header: string;
  leftImage: string;
  rightImage: string;
  leftLabel: string;
  rightLabel: string;
}

export interface FinalRoundItem {
  text: string;
  isCorrect: boolean;
}

export type GamePhase = 'setup' | 'round1' | 'round2' | 'round3' | 'round4' | 'results';
