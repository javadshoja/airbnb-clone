'use client'

import type { FC } from 'react'

import { IconType } from 'react-icons'

import { cn } from '@/app/libs/utils'

type CategoryInputProps = {
	label: string
	icon: IconType
	selected?: boolean
	onClick: (value: string) => void
}

const CategoryInput: FC<CategoryInputProps> = ({
	label,
	icon: Icon,
	selected,
	onClick
}) => {
	return (
		<div
			onClick={() => onClick(label)}
			className={cn(
				`
        transaction
        flex
        cursor-pointer
        flex-col
        gap-3
        rounded-xl
        border-2
        p-3
        hover:border-black
      `,
				`
				border-neutral-200
			`,
				{
					'border-black': selected
				}
			)}
		>
			<Icon size={30} />
			<div className='font-semibold'>{label}</div>
		</div>
	)
}
export default CategoryInput
