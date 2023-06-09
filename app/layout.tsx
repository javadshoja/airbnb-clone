import { Nunito } from 'next/font/google'
import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import 'tailwindcss/tailwind.css'

import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import getCurrentUser from './services/user'

export const metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone',
	keywords: 'next, next13, airbnb, crash course',
	icons: {
		icon: '/favicon.ico'
	}
}

const nunito = Nunito({
	subsets: ['latin']
})

export default async function RootLayout({
	children
}: {
	children: ReactNode
}) {
	const currentUser = await getCurrentUser()
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<Toaster />
				<ClientOnly>
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				{children}
			</body>
		</html>
	)
}
