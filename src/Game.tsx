import { Card, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types.d'
import SyntaxHighLigther from 'react-syntax-highlighter'
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Question = ({ info }: { info: QuestionType }) => {
  return (
    <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: 'left' }}>
      <Typography variant="h5">{info.question}</Typography>

			<SyntaxHighLigther language='javascript' style={monokai}>
				{info.code}
			</SyntaxHighLigther>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}
