import React, { useState, useRef, useEffect } from 'react'
import Card from './Card'
import Info from './Info'
import styles from '../../styles/game/Board.module.css'

type Props = {
	game: string,
	resetGame: (game: string) => void,
	cards: Array<number>,
}

type HighScore = {
	mode: string,
	moves: number,
	time: number
}

const Board = ({ game, resetGame, cards }: Props) => {
	const [pairCards, setPairCards] = useState<Array<number>>([])
	const [clearedCards, setClearedCards] = useState<Array<number>>([])
	const [ableCards, setAbleCards] = useState<boolean>(true)
	const timeout = useRef<NodeJS.Timeout>(setTimeout(() => { }))
	const [moves, setMoves] = useState<number>(0)
	const [highScore, setHighScore] = useState<Array<HighScore>>(JSON.parse(localStorage.getItem('highScores') || '[]'))
	const [finished, setFinished] = useState<boolean>(false)

	const equalCards = (one: number, two: number) => {
		if ((one % (cards.length / 2) + 1) === (two % (cards.length / 2) + 1)) {
			setClearedCards((prev) => [...prev, one, two])
			setPairCards([])
			return true
		}
		return false
	}

	const flipCardBack = () => {
		timeout.current = setTimeout(() => {
			setPairCards([])
		}, 500)
	}

	const check = () => {
		const [first, second] = pairCards
		setAbleCards(true)
		if (equalCards(first, second)) return
		flipCardBack()
	}

	const complete = () => {
		if (clearedCards.length === cards.length) {
			// resetGame('')
			setFinished(true)
		}
	}

	const handleCardClick = (id: number) => {
		if (pairCards.length === 1) {
			setPairCards((prev) => [...prev, id])
			setMoves((moves) => moves + 1)
			setAbleCards(false)
			return
		}
		clearTimeout(timeout.current)
		setPairCards([id])
	}

	useEffect(() => {
		let timeout: NodeJS.Timeout = setTimeout(() => { })
		if (pairCards.length === 2) {
			timeout = setTimeout(check, 25)
		}
		return () => {
			clearTimeout(timeout)
		}
	}, [pairCards])

	useEffect(() => {
		complete()
	}, [clearedCards])

	const checkIsFlipped = (id: number) => {
		return clearedCards.includes(id) || pairCards.includes(id)
	}

	const checkIsInactive = (id: number) => {
		return clearedCards.includes(id)
	}

	return (
		<div className={styles.container}>
			<div>{game} mode</div>
			<button onClick={() => resetGame('')} className={styles.reset}>
				Go back
			</button>

			<Info
				moves={moves}
				highScore={highScore}
				setHighScore={setHighScore}
				finished={finished}
				mode={game}
			/>

			<div
				className={`
			${styles.grid} 
			${game === 'Easy' ? styles.colsEasy
						: game === 'Medium' ? styles.colsMedium
							: game === 'Hard' && styles.colsHard}`}>
				{
					cards.map(c =>
						<Card
							key={c}
							image={`/images/${c % (cards.length / 2) + 1}.jpg`}
							id={c}
							isAble={true}
							isInactive={checkIsInactive(c)}
							isFlipped={checkIsFlipped(c)}
							onClick={handleCardClick}
						/>
					)
				}
			</div>
		</div>
	)
}

export default Board