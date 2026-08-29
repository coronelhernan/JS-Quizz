import { create } from 'zustand'
import { type Question } from '../types.d'
import { persist } from 'zustand/middleware'

const FETCH_URL = '/data.json'

interface State {
  questions: Question[];
  currentQuestion: number;
  showResults: boolean;
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  closeResults: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    showResults: false,

    fetchQuestions: async (limit: number) => {
      const response = await fetch(FETCH_URL)
      const json = await response.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      // Obtenemos el questions desde el estado global
      const { questions } = get()

      // Utilizamos el structuredClone para clonar el objeto
      const newQuestions = structuredClone(questions)
      // Encontramos el índice de la pregunta
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // Obtenemos la información de la pregunta
      const questionInfo = newQuestions[questionIndex]
      // Averiguamos si el usuario ha seleccionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
      // Cambiar esta información en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }

      // Verificamos si con esta respuesta ya se completaron todas las preguntas
      const allAnswered = newQuestions.every(q => q.userSelectedAnswer != null)

      // Actualizamos el estado
      set({ questions: newQuestions, showResults: allAnswered })
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion })
      }
    },

    closeResults: () => {
      set({ showResults: false })
    },

    reset: () => {
      set({ currentQuestion: 0, questions: [], showResults: false })
    }
  }
}, {
  name: 'questions',
  partialize: (state) => ({
    questions: state.questions,
    currentQuestion: state.currentQuestion
  })
}))
