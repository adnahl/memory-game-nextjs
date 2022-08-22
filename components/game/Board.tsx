import React, { useState, useRef, useEffect } from 'react'
import Card from './Card'
import Info from './Info'

const styles = {
	container: {
		width: '90%',
		maxWidth: '568px',
		textAlign: 'center',
		maxHeight: 'calc(100vh - 80px - 1rem)',
	},
	reset: {
		border: 'none',
		backgroundColor: 'transparent',
		color: 'lightgray',
		cursor: 'pointer',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(8, 1fr)', //Easy 6 - Medium 7 - Hard 8
		gap: '.5em'
	}
}

type Props = {
	game: string,
	resetGame: (game: string) => void,
	cards: Array<number>,
}

// const Board = ({ game }: { game: string }) => {
const Board = ({ game, resetGame, cards }: Props) => {
	const [pairCards, setPairCards] = useState<Array<number>>([])
	const [clearedCards, setClearedCards] = useState<Array<number>>([])
	const [ableCards, setAbleCards] = useState<boolean>(true)
	const timeout = useRef<NodeJS.Timeout>(setTimeout(() => { }))
	const [moves, setMoves] = useState<number>(0)

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
		}, 1000)
	}

	const check = () => {
		const [first, second] = pairCards
		setAbleCards(true)
		if (equalCards(first, second)) return
		flipCardBack()
	}

	const complete = () => {
		if (clearedCards.length === cards.length) {
			resetGame('')
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
			timeout = setTimeout(check, 500)
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
		<div style={styles.container as React.CSSProperties}>
			<div>{game} mode</div>
			<button onClick={() => resetGame('')} style={styles.reset}>Reset</button>

			<Info moves={5} />

			<div style={styles.grid}>
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