import type { NextPage } from 'next'
import styles from '../../styles/views/Footer.module.css'

const Footer: NextPage = () => {
	return (
		<footer className={styles.footer}>
			<a
				href="https://adnahl.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				By adnahl
			</a>
		</footer>
	)
}

export default Footer