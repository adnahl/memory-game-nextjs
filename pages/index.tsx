import type { NextPage } from 'next'
import { useState } from 'react'
import Board from '../components/game/Board'

const styles = {
  title: {
    fontSize: '2em',
  },
  subTitle: {
    marginTop: '2rem',
    color: 'gray'
  },
  modes: {
    display: 'flex',
    gap: '.5em',
  },
  mode: {
    border: '1px solid #ff6022',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: '#ff6022',
    padding: '.5rem 1rem',
    cursor: 'pointer',
  }
}

const modes = [
  'Easy',
  'Medium',
  'Hard',
  // 'Extreme'
]

const arrayCards = (cant: number) => {
  let arr = []
  for (let i = 0; i < cant; i++) {
    arr.push(i + 1)
  }
  arr.sort(() => 0.5 - Math.random())
  return arr
}

const Home: NextPage = () => {
  const [game, startGame] = useState<string>('')
  const [cards, setCards] = useState<Array<number>>([])

  const handleStartGame = (mode: string) => {
    switch (mode) {
      case 'Extreme':
        setCards(arrayCards(72)) // 8x9 - 36 images
        break

      case 'Hard':
        setCards(arrayCards(32))  // 4x8 - 16 images
        break

      case 'Medium':
        setCards(arrayCards(20))  // 3x5 - 10 images
        break

      case 'Easy':
      default:
        setCards(arrayCards(12))  // 3x4 - 6 images
        break
    }
    startGame(mode)
  }

  return (
    <>
      {
        game === ''
          ?
          <>
            <div style={styles.title}>Memory game</div>
            <div style={styles.subTitle}>- Select a mode -</div>
            <div style={styles.modes}>
              {
                modes.map((mode) =>
                  <button style={styles.mode} onClick={() => handleStartGame(mode)}>
                    {mode}
                  </button>)
              }
            </div>
          </>
          :
          <Board game={game} resetGame={startGame} cards={cards} />
      }
    </>
  )
}

export default Home
