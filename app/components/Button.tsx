'use client'

import type { FC, MouseEvent } from 'react'
import type { IconType } from 'react-icons'
import { cn } from '../libs/utils'

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
			className={cn(
				`
        relative
        w-full
        rounded-lg
				transition
				hover:opacity-80
				disabled:cursor-not-allowed
				disabled:opacity-70
      `,
				`
				border-2
        border-rose-500
        bg-rose-500
        py-3
        text-base
        font-semibold
        text-white
			`,
				{
					border: small,
					'border-black': outline,
					'bg-white': outline,
					'py-1': small,
					'text-sm': small,
					'font-light': small,
					'text-black': outline
				}
			)}
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
