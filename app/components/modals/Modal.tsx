'use client'

import type { FC, ReactElement } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
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
				flex
				justify-center
				items-center
				overflow-x-hidden
				overflow-y-hidden
				fixed
				inset-0
				z-50
				outline-none
				focus:outline-none
				bg-neutral-800/70
			'
		>
			<div
				className='
					relative
					w-[98%]
					sm:w-2/3
					md:w-1/2
					lg:w-2/5
					xl:w-2/6
					my-3
					mx-auto
					h-auto
					sm:h-auto
					lg:h-auto
					md:h-auto
				'
			>
				{/* CONTENT */}
				<div
					className={`
							translate
							duration-300
							h-full
							${showModal ? 'translate-y-0' : 'translate-y-full'}
							${showModal ? 'opacity-100' : 'opacity-0'}
						`}
				>
					<div
						className='
							translate
							h-full
							lg:h-auto
							border-0
							rounded-lg
							shadow-lg
							relative
							flex
							flex-col
							w-full
							bg-white
							outline-none
							focus:outline-none
						'
					>
						{/* HEADER */}
						<section
							className='
								flex
								item-center
								p-3
								rounded-t
								justify-center
								relative
								border-b
							'
						>
							<button
								onClick={handleClose}
								className='
									p-1
									border-0
									hover:opacity-70
									transition
									absolute
									left-4
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
									flex-row
									items-center
									gap-2
									w-full
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
