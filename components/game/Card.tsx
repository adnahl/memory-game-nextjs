import classStyle from '../../styles/game/Card.module.css'

const styles = {
	cardFace: {
		backfaceVisibility: 'hidden',
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
		<div onClick={handleClick}
			className={
				`${classStyle.card} 
				${props.isFlipped && classStyle.flipped} 
				${props.isInactive && classStyle.inactive}`
			}
		>
			<div className={`${classStyle.cardBackFace} ${classStyle.cardFace}`}>
				<img src={backSide} alt='' style={styles.img} />
			</div>
			<div className={classStyle.cardFace}>
				<img src={props.image} alt='' style={styles.img} />
			</div>
		</div>
	)
}

export default Card