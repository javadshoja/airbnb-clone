'use client'

import { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModel from '@/app/hooks/useRegisterModel'

export default function UserMenu() {
	const [isOpen, setIsOpen] = useState(false)
	const registerModal = useRegisterModel()

	const toggleOpen = useCallback(() => {
		setIsOpen(prev => !prev)
	}, [])

	const openRegisterModal = useCallback(() => {
		registerModal.onOpen()
	}, [registerModal])

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
						<Avatar />
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className='
						absolute
						rounded-xl
						shadow-md
						w-[40vw]
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
						<>
							<MenuItem onClick={() => {}} label='Login' />
							<MenuItem onClick={openRegisterModal} label='Sign in' />
						</>
					</div>
				</div>
			)}
		</div>
	)
}
