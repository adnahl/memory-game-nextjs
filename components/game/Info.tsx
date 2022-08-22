import React, { useState, useEffect } from 'react'

const styles = {
	container: {
		margin: '2rem 0',
		padding: '1rem',
		border: '1px solid #59dcff',
		fontFamily: "'Inconsolata', monospace",
		borderRadius: '4px'
	},
	stats: {
		fontSize: '.9em',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	timer: {
		display: 'flex',
		gap: '.5em',
	}
}

type Timer = {
	h: number, m: number, s: number, ms: number
}

const Info = ({ moves }: { moves: number }) => {
	const [timer, setTimer] = useState<Timer>({ h: 0, m: 0, s: 0, ms: 0 })

	useEffect(() => {
		let interval = setInterval(() => {
			setTimer({ ...timer, ms: timer.ms + 100 })
			if (timer.ms === 900) setTimer({ ...timer, s: timer.s + 1, ms: 0 })
			if (timer.s === 59) setTimer({ ...timer, m: timer.m + 1, s: 0 })
			if (timer.m === 59) setTimer({ ...timer, h: timer.h + 1, m: 0 })
		}, 100) // 1000)
		return () => {
			clearInterval(interval)
		}
	}, [timer])

	return (
		<div style={styles.container}>
			<div style={styles.stats as React.CSSProperties}>
				<span>Moves: {moves}</span>
				<span style={styles.timer}>
					{/* <span>{timer.ms}ms</span> */}
					{timer.h > 0 && <span>{String(timer.h).padStart(2, '0')}h</span>}
					{timer.m > 0 && <span>{String(timer.m).padStart(2, '0')}m</span>}
					<span>{String(timer.s).padStart(2, '0')}s</span>
				</span>
			</div>
		</div>
	)
}

export default Info