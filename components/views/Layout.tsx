import Footer from './Footer'
import Header from './Header'

const fullScreen = {
	minHeight: 'calc(100vh - 80px - 1rem)',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	gap: '.5rem'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			<main style={fullScreen as React.CSSProperties}>
				{children}
			</main>
			<Footer />
		</>
	)
}

export default Layout