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
  levels: {
    display: 'flex',
    gap: '.5em',
  },
  level: {
    border: '1px solid #59dcff',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: '#59dcff',
    padding: '.5rem 1rem',
    cursor: 'pointer',
  }
}

const levels = [
  'Easy',
  'Medium',
  'Hard',
  'Extreme'
]

const Home: NextPage = () => {
  const [game, startGame] = useState<string>('')
  return (
    <>
      {
        game === ''
          ?
          <>
            <div style={styles.title}>Memory game</div>
            <div style={styles.subTitle}>- Select a level -</div>
            <div style={styles.levels}>
              {
                levels.map((level) =>
                  <button style={styles.level} onClick={() => startGame(level)}>
                    {level}
                  </button>)
              }
            </div>
          </>
          :
          <Board game={game} reset={startGame} />
      }
    </>
  )
}

export default Home
