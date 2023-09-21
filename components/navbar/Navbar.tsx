'use client'

import { Suspense, type FC } from 'react'

import Container from '../Container'
import Categories from './Categories'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import type { SafeUser } from '@/types'

type NavbarProps = {
	currentUser?: SafeUser | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
	return (
		<div className='fixed top-0 z-10 w-full bg-white shadow-sm'>
			<div className='border-b py-4'>
				<Container>
					<div
						className='
							flex
							items-center
							justify-between
							gap-3
							md:gap-0
						'
					>
						<Logo />
						<Suspense>
							<Search />
						</Suspense>
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Suspense>
				<Categories />
			</Suspense>
		</div>
	)
}

export default Navbar
