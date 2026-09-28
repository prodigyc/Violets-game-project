import { DEFAULT_QUESTIONS } from './data'
import type { GameState, Question } from './types'

export { DEFAULT_QUESTIONS }

const QUESTIONS_KEY = 'violets-questions-v1'
const GAME_KEY = 'violets-game-v1'

export function getQuestions(): Question[] {
  try {
    const saved = localStorage.getItem(QUESTIONS_KEY)
    return saved ? JSON.parse(saved) as Question[] : DEFAULT_QUESTIONS
  } catch { return DEFAULT_QUESTIONS }
}

export function saveQuestions(questions: Question[]) { localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions)) }
export function resetQuestions() { localStorage.removeItem(QUESTIONS_KEY) }
export function getGame(): GameState | null {
  try {
    const saved = localStorage.getItem(GAME_KEY)
    return saved ? JSON.parse(saved) as GameState : null
  } catch { return null }
}
export function saveGame(game: GameState) { localStorage.setItem(GAME_KEY, JSON.stringify(game)) }
export function clearGame() { localStorage.removeItem(GAME_KEY) }
export function downloadJson(name: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a'); link.href = url; link.download = name; link.click(); URL.revokeObjectURL(url)
}
