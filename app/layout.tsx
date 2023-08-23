import 'tailwindcss/tailwind.css'
import './globals.css'

import type { ReactNode } from 'react'

import { Nunito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import RentModal from '@/components/modals/RentModal'
import SearchModal from '@/components/modals/SearchModal'
import Navbar from '@/components/navbar/Navbar'
import getCurrentUser from '@/services/user'

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
				<SearchModal />
				<RentModal />
				<LoginModal />
				<RegisterModal />
				<Navbar currentUser={currentUser} />
				<div className='pb-20 pt-28'>{children}</div>
			</body>
		</html>
	)
}
