'use client'

import useLoginModel from '@/app/hooks/useLoginModal'
import useRegisterModel from '@/app/hooks/useRegisterModel'

import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { FC, useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import Avatar from '../Avatar'
import MenuItem from './MenuItem'

type UserMenuProps = {
	currentUser?: User | null
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
	const [isOpen, setIsOpen] = useState(false)
	const registerModal = useRegisterModel()
	const loginModal = useLoginModel()

	const toggleOpen = useCallback(() => {
		setIsOpen(prev => !prev)
	}, [])

	return (
		<div className='relative'>
			<div className='flex flex-row items-center gap-3'>
				<div
					onClick={() => {}}
					className='
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
        '
				>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className='
						p-4
						md:py-1
						md:px-2
						border-neutral-200
						flex
						flex-row
						items-center
						gap-3
						rounded-full
						cursor-pointer
						hover:shadow-md
						transition
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
						absolute
						rounded-xl
						shadow-md
						w-[20vw]
						md:w-3/4
						bg-white
						overflow
            right-0
						top-14
						text-sm
					'
				>
					<div
						className='
							flex
							flex-col
							cursor-pointer
							'
					>
						{currentUser ? (
							<>
								<MenuItem onClick={() => {}} label='My trips' />
								<MenuItem onClick={() => {}} label='My favorites' />
								<MenuItem onClick={() => {}} label='My reservation' />
								<MenuItem onClick={() => {}} label='My properties' />
								<MenuItem onClick={() => {}} label='Airbnb my home' />
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
