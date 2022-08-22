const styles = {
	isFlipped: {
		transform: 'rotateY(180deg)',
	},
	isInactive: {
		opacity: '0',
	},
	cardFace: {
		backfaceVisibility: 'hidden',
	},
	cardBackFace: {
		backfaceVisibility: 'hidden',
		transform: 'rotateY(180deg)'
	},
	card: {
		transition: '0.5s',
		transformStyle: 'preserve-3d',
		position: 'relative',
		cursor: 'pointer',
		color: 'transparent',
	},
	img: {
		width: '100%',
		height: '100%',
		borderRadius: '4px',
	}
}

type CardProps = {
	id: number,
	onClick: (id: number) => void,
	image: string,
	isInactive: boolean,
	isFlipped: boolean,
	isAble: boolean
}

function Card(props: CardProps) {
	const backSide = '/images/backside.avif'

	const handleClick = () => {
		!props.isFlipped && props.isAble && props.onClick(props.id)
	}

	return (
		<div onClick={handleClick}>
			{/* style={`${styles.card}, ${props.isFlipped && styles.isFlipped}, 
				${props.isInactive && styles.isInactive}` as React.CSSProperties} */}
			<div style={styles.cardBackFace as React.CSSProperties}>
				<img src={backSide} alt='' style={styles.img} />
			</div>
			<div style={styles.cardFace as React.CSSProperties}>
				<img src={props.image} alt='' style={styles.img} />
			</div>
		</div>
	)
}

export default Card