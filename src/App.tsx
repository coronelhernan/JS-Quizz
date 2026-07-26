import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavaScriptLogo } from './components/JavaScriptLogo'

function App() {
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quizz
          </Typography>
        </Stack>
      </Container>
    </main>
  )
}

export default App
