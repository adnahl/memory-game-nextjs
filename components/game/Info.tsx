import React, { useState, useEffect, useRef } from 'react'
import styles from '../../styles/game/Info.module.css'

type HighScore = {
	mode: string,
	moves: number,
	time: number
}

type Props = {
	mode: string,
	moves: number,
	highScore: Array<HighScore>,
	setHighScore: (highScore: Array<HighScore>) => void,
	finished: boolean
}

type Timer = {
	h: number, m: number, s: number
}

const formatTime = (sec: number) => {
	return (sec - (sec %= 60)) / 60 + (sec < 9 ? ':0' : ':') + sec
}

const Info = ({ mode, moves, highScore, setHighScore, finished }: Props) => {
	const [timer, setTimer] = useState<Timer>({ h: 0, m: 0, s: 0 })
	const updated = useRef(false)

	useEffect(() => {
		if (finished) {
			updateHighScore()
			return
		}
		let interval = setInterval(() => {
			setTimer({ ...timer, s: timer.s + 1 })
			if (timer.s === 59) setTimer({ ...timer, m: timer.m + 1, s: 0 })
			if (timer.m === 59) setTimer({ ...timer, h: timer.h + 1, m: 0 })
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	}, [timer])

	const updateHighScore = () => {
		if (!updated.current) {
			setHighScore([...highScore, {
				mode: mode,
				moves: moves,
				time: timer.s + timer.m * 60 + timer.h * 60 * 60
			}].sort((a, b) => a.time - b.time)
				.sort((a, b) => a.moves - b.moves)
			)
			localStorage.setItem("highScores", JSON.stringify([...highScore, {
				mode: mode,
				moves: moves,
				time: timer.s + timer.m * 60 + timer.h * 60 * 60
			}].sort((a, b) => a.time - b.time)
				.sort((a, b) => a.moves - b.moves)
			))
			updated.current = true
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.stats}>
				<div style={{ textAlign: 'left' }}>
					<span>Moves: {moves}</span>
					<span className={styles.timer}> Time:
						{timer.h > 0 && <span>{timer.h}h</span>}
						{timer.m > 0 && <span>{timer.m}m</span>}
						<span>{String(timer.s).padStart(2, '0')}s</span>
					</span>
				</div>
				<span>Best: {
					highScore.filter(hs => hs.mode === mode).length > 0 &&
					highScore.filter(hs => hs.mode === mode)[0].moves +
					' ' + formatTime(highScore.filter(hs => hs.mode === mode)[0].time)
				}
				</span>
			</div>
			{
				highScore.filter(hs => hs.mode === mode).length > 0 &&
				updated.current &&
				<>
					<div style={{ margin: '1rem 0 .5rem 0' }}>High Score</div>
					<div className={styles.boxHighScore}>
						<div className={styles.highScore}>
							<span>Position</span>
							<span>Moves</span>
							<span>Time</span>
						</div>
						{
							highScore.filter(hs => hs.mode === mode).map((score, i) =>
								<div className={styles.highScore} key={i}>
									<span>{i + 1}</span>
									<span>{score.moves}</span>
									<span>{formatTime(score.time)}</span>
								</div>
							)}
					</div>
				</>
			}
		</div>
	)
}

export default Info