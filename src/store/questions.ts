import { create } from 'zustand'
import { type Question } from '../types.d'

const FETCH_URL = 'http://localhost:5173/data.json'

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>
}

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const response = await fetch(FETCH_URL)
      const json = await response.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },
  }
})
