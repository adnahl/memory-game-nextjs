type Props = {
	game: string,
	reset: (game: string) => void
}

// const Board = ({ game }: { game: string }) => {
const Board = ({ game, reset }: Props) => {
	return (
		<>
			<div>Level {game}</div>
			<button onClick={() => reset('')}>Reset</button>
		</>
	)
}

export default Board