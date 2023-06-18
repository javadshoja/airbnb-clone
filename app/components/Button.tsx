'use client'

import type { FC, MouseEvent } from 'react'
import type { IconType } from 'react-icons'

type ButtonProps = {
	label: string
	onClick: (e: MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
	outline?: boolean
	small?: boolean
	icon?: IconType
}
const Button: FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	small,
	icon: Icon
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
        relative
        w-full
        rounded-lg
        transition
        hover:opacity-80
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-base'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border' : 'border-2'}
      `}
		>
			{Icon && (
				<Icon
					size={24}
					className='
            absolute
            left-4
            top-3
          '
				/>
			)}
			{label}
		</button>
	)
}
export default Button
