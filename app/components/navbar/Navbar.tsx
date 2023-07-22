'use client'

import { FC } from 'react'

import { User } from '@prisma/client'

import Container from '../Container'
import Catagories from './Catagories'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

type NavbarProps = {
	currentUser?: User | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
	return (
		<div className='fixed z-10 w-full bg-white shadow-sm'>
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
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Catagories />
		</div>
	)
}

export default Navbar
