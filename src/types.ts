export const CATEGORIES = ['Dash', 'Solo Freestyle', 'Random Challenges', 'Photo Challenge', 'Items', 'Violets'] as const
export type Category = (typeof CATEGORIES)[number]
export type QuestionType = 'text' | 'multiple' | 'image' | 'boolean' | 'challenge'
export type TeamId = 'team1' | 'team2'

export interface Question {
  id: string
  categoryId: Category
  questionType: QuestionType
  points: 200 | 400 | 600
  question: string
  answer: string
  explanation: string
  choices: string[]
  imageUrl: string
  challengeInstructions: string
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export interface Team {
  name: string
  color: string
  score: number
}

export interface AssistanceState {
  double: boolean
  fifty: boolean
  steal: boolean
}

export interface GameState {
  teams: { team1: Team; team2: Team }
  selectedCategories: Category[]
  usedQuestionIds: string[]
  assistance: { team1: AssistanceState; team2: AssistanceState }
  currentTurn: TeamId
  soundEnabled: boolean
  startedAt: string
}
