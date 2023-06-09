'use client'

import { User } from '@prisma/client'
import { FC } from 'react'

import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

type NavbarProps = {
	currentUser?: User | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
	return (
		<div className='fixed w-full bg-white z-10 shadow-sm'>
			<div className='py-4 border-b'>
				<Container>
					<div
						className='
							flex
							flex-row
							item-center
							justify-between
							gap-3
							md:gap-0
						'
					>
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
		</div>
	)
}

export default Navbar
