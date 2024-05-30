export interface Quiz {
    id: string;
    name: string;
    questions: QuizQuestion[];
}

export interface Player {
    id: string;
    name: string;
}

export interface QuizQuestion {
    id: string;
    name: string;
    time: number;
    choices: QuizChoice[];
}

export interface QuizChoice {
    id: string;
    name: string;
    correct: boolean;
}

export const COLORS = ["bg-pink-400", "bg-blue-400", "bg-yellow-400", "bg-purple-400"];
