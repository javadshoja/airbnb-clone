'use client'

import type { FC } from 'react'
import { useState } from 'react'

import { signOut } from 'next-auth/react'
import { AiOutlineMenu } from 'react-icons/ai'

import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useRentModal from '@/app/hooks/useRentModal'
import { User } from '@prisma/client'

import Avatar from '../Avatar'
import MenuItem from './MenuItem'

type UserMenuProps = {
	currentUser?: User | null
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
	const [isOpen, setIsOpen] = useState(false)
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const rentModal = useRentModal()

	const toggleOpen = () => setIsOpen(prev => !prev)

	const onRent = () => {
		if (!currentUser) return loginModal.onOpen()

		rentModal.onOpen()
	}

	return (
		<div className='relative'>
			<div className='flex flex-row items-center gap-3'>
				<div
					onClick={onRent}
					className='
            hidden
            cursor-pointer
            rounded-full
            px-4
            py-3
            text-sm
            font-semibold
            transition
            hover:bg-neutral-100
            md:block
        '
				>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className='
						flex
						cursor-pointer
						flex-row
						items-center
						gap-3
						rounded-full
						border-neutral-200
						p-4
						transition
						hover:shadow-md
						md:px-2
						md:py-1
        '
				>
					<AiOutlineMenu />
					<div className='hidden md:block'>
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className='
						overflow
						absolute
						right-0
						top-14
						w-[20vw]
						rounded-xl
						bg-white
            text-sm
						shadow-md
						md:w-3/4
					'
				>
					<div
						className='
							flex
							cursor-pointer
							flex-col
							'
					>
						{currentUser ? (
							<>
								<MenuItem onClick={() => {}} label='My trips' />
								<MenuItem onClick={() => {}} label='My favorites' />
								<MenuItem onClick={() => {}} label='My reservation' />
								<MenuItem onClick={() => {}} label='My properties' />
								<MenuItem onClick={rentModal.onOpen} label='Airbnb my home' />
								<hr />
								<MenuItem onClick={signOut} label='Logout' />
							</>
						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label='Login' />
								<MenuItem onClick={registerModal.onOpen} label='Sign in' />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default UserMenu
