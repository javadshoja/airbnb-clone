import 'tailwindcss/tailwind.css'

import type { ReactNode } from 'react'

import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { env } from '@/env.mjs'
import { HighlightInit } from '@highlight-run/next/highlight-init'

import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'
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
		<>
			<HighlightInit
				projectId={env.HIGHLIGHT_PROJECT_ID}
				tracingOrigins
				networkRecording={{
					enabled: true,
					recordHeadersAndBody: true,
					urlBlocklist: []
				}}
			/>
			<html lang='en'>
				<body className={nunito.className}>
					<Toaster />
					<RentModal />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
					{children}
				</body>
			</html>
		</>
	)
}
