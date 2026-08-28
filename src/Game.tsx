import { Card, Typography, List, ListItem, ListItemButton, ListItemText, IconButton, Stack, Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { type Question as QuestionType } from './types.d'
import SyntaxHighLigther from 'react-syntax-highlighter'
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ResultsModal } from './components/ResultsModal'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  // usuario no ha seleccionado nada todavía
  if (userSelectedAnswer == null) return 'transparent'
  // si ya selecciono pero la solución es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  // si esta es la solución correcta
  if (index === correctAnswer) return 'green'
  // si esta es la selección del usuario pero no es correcta
  if (index === userSelectedAnswer) return 'red'
  // si no es ninguna de las anteriores
  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}>
      <Typography variant="h5">{info.question}</Typography>

			<SyntaxHighLigther language='javascript' style={monokai}>
				{info.code}
			</SyntaxHighLigther>

      <List sx={{ bgcolor: '#333', textAlign: 'center' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index)
              }}
              >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
  const reset = useQuestionsStore(state => state.reset)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction="column" sx={{ gap: 2, alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
        <Button sx={{ bgcolor: '#333', textAlign: 'center', color: '#fff', padding: '10px' }}
          onClick={() => reset()}>
            Reiniciar juego
        </Button>
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center', justifyContent: 'center' }}>
          <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
            <ArrowBackIosNew />
          </IconButton>
            {currentQuestion + 1} / {questions.length}

          <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
            <ArrowForwardIos />
          </IconButton>
        </Stack>
      </Stack>
      <Question info={questionInfo} />
      <ResultsModal />
    </>
  )
}
