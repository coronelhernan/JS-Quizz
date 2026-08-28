import { useEffect, useRef } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  Button,
  Chip,
  Divider
} from '@mui/material'
import { CheckCircle, Cancel, EmojiEvents } from '@mui/icons-material'
import confetti from 'canvas-confetti'
import { useQuestionsStore } from '../store/questions'

const launchConfetti = () => {
  const duration = 2500
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors: ['#f0db4f', '#323330', '#ffffff']
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors: ['#f0db4f', '#323330', '#ffffff']
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()

  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#f0db4f', '#323330', '#ffffff']
  })
}

export const ResultsModal = () => {
  const showResults = useQuestionsStore(state => state.showResults)
  const questions = useQuestionsStore(state => state.questions)
  const closeResults = useQuestionsStore(state => state.closeResults)
  const reset = useQuestionsStore(state => state.reset)
  const hasLaunchedConfetti = useRef(false)

  const total = questions.length
  const correctCount = questions.filter(q => q.isCorrectUserAnswer).length
  const incorrectCount = total - correctCount
  const isPerfectScore = total > 0 && correctCount === total

  useEffect(() => {
    if (showResults && isPerfectScore && !hasLaunchedConfetti.current) {
      hasLaunchedConfetti.current = true
      launchConfetti()
    }

    if (!showResults) {
      hasLaunchedConfetti.current = false
    }
  }, [showResults, isPerfectScore])

  const handleRestart = () => {
    closeResults()
    reset()
  }

  return (
    <Dialog
      open={showResults}
      onClose={closeResults}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: { bgcolor: '#222', textAlign: 'center', p: 1 }
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        {isPerfectScore && <EmojiEvents sx={{ fontSize: 48, color: '#f0db4f' }} />}
        <Typography variant="h4" component="span">
          {isPerfectScore ? '¡Ganaste! 🎉' : 'Quiz finalizado'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          {isPerfectScore
            ? 'Respondiste todas las preguntas correctamente. ¡Sos un crack de JavaScript!'
            : 'Ya respondiste todas las preguntas. Este fue tu resultado:'}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 2 }}>
          <Chip
            icon={<CheckCircle />}
            label={`${correctCount} correctas`}
            color="success"
            variant="filled"
          />
          <Chip
            icon={<Cancel />}
            label={`${incorrectCount} incorrectas`}
            color="error"
            variant="filled"
          />
        </Stack>

        <Divider sx={{ my: 2, borderColor: '#444' }} />

        <Typography variant="h6">
          Puntaje: {correctCount} / {total}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 1 }}>
        <Button onClick={closeResults} sx={{ color: '#fff' }}>
          Revisar respuestas
        </Button>
        <Button onClick={handleRestart} variant="contained">
          Jugar de nuevo
        </Button>
      </DialogActions>
    </Dialog>
  )
}
