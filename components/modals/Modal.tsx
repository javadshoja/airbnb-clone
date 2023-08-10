'use client'

import type { FC, ReactElement } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { IoMdClose } from 'react-icons/io'

import { cn } from '@/libs/utils'

import Button from '../Button'

type ModalProps = {
	isOpen?: boolean
	onClose: () => void
	onSubmit: () => void
	title?: string
	body?: ReactElement
	footer?: ReactElement
	actionLabel: string
	disabled?: boolean
	secondaryAction?: () => void
	secondaryActionLabel?: string
}

const Modal: FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryActionLabel
}) => {
	const [showModal, setShowModal] = useState(isOpen)

	useEffect(() => {
		setShowModal(isOpen)
	}, [isOpen])

	const handleClose = useCallback(() => {
		if (disabled) return

		setShowModal(false)
		setTimeout(() => onClose(), 300)
	}, [disabled, onClose])

	const handleSubmit = useCallback(() => {
		if (disabled) return

		onSubmit()
	}, [disabled, onSubmit])

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) return

		secondaryAction()
	}, [disabled, secondaryAction])

	if (!isOpen) return null

	return (
		<div
			className='
				fixed
				inset-0
				z-50
				flex
				items-center
				justify-center
				overflow-x-hidden
				overflow-y-hidden
				bg-neutral-800/70
				outline-none
				focus:outline-none
			'
		>
			<div
				className='
					relative
					mx-auto
					my-3
					h-auto
					w-[98%]
					sm:h-auto
					sm:w-2/3
					md:h-auto
					md:w-1/2
					lg:h-auto
					lg:w-2/5
					xl:w-2/6
				'
			>
				{/* CONTENT */}
				<div
					className={cn(
						`
							translate
							h-full
							duration-300
						`,
						`
							translate-y-full
							opacity-0
						`,
						{
							'translate-y-0': showModal,
							'opacity-100': showModal
						}
					)}
				>
					<div
						className='
							translate
							relative
							flex
							h-full
							w-full
							flex-col
							rounded-lg
							border-0
							bg-white
							shadow-lg
							outline-none
							focus:outline-none
							lg:h-auto
						'
					>
						{/* HEADER */}
						<section
							className='
								item-center
								relative
								flex
								justify-center
								rounded-t
								border-b
								p-3
							'
						>
							<button
								onClick={handleClose}
								className='
									absolute
									left-4
									border-0
									p-1
									transition
									hover:opacity-70
								'
							>
								<IoMdClose size={18} />
							</button>
							<div className='text-lg font-semibold'>{title}</div>
						</section>
						{/* BODY */}
						<section className='relative p-3'>{body}</section>
						{/* FOOTER */}
						<section className='flex flex-col gap-1 p-3'>
							<div
								className='
									flex
									w-full
									flex-row
									items-center
									gap-2
								'
							>
								{secondaryAction && secondaryActionLabel && (
									<Button
										outline
										disabled={disabled}
										label={secondaryActionLabel}
										onClick={handleSecondaryAction}
									/>
								)}
								<Button
									disabled={disabled}
									label={actionLabel}
									onClick={handleSubmit}
								/>
							</div>
							{footer}
						</section>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Modal
