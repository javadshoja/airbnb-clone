'use client'

import type { FC } from 'react'

import type { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

import { cn } from '@/app/libs/utils'

type InputProps = {
	id: string
	label: string
	type?: string
	disabled?: boolean
	formatPrice?: boolean
	required?: boolean
	register: UseFormRegisterReturn<string>
	errors: FieldErrors
}

const Input: FC<InputProps> = ({
	id,
	label,
	type,
	disabled,
	formatPrice,
	required,
	register,
	errors
}) => {
	return (
		<div className='relative w-full'>
			{formatPrice && (
				<BiDollar
					size={24}
					className='
						absolute
            left-2
            top-3
            text-neutral-700
          '
				/>
			)}
			<input
				id={id}
				disabled={disabled}
				{...register}
				placeholder=' '
				type={type}
				required={required}
				className={cn(
					`
          peer
          w-full
          rounded-md
          border-2
          bg-white
          p-4
          pt-4
          font-light
          outline-none
          transition
					disabled:cursor-not-allowed
          disabled:opacity-70
        `,
					`
          border-neutral-300
          pl-4
          focus:border-black
				`,
					{
						'border-rose-500': errors[id],
						'pl-9': formatPrice,
						'focus:border-rose-500': errors[id]
					}
				)}
			/>
			<label
				htmlFor={id}
				className={cn(
					`
          absolute
          top-5
          z-10
					origin-[0]
					-translate-y-4
					transform
					text-sm
					duration-150
					peer-placeholder-shown:translate-y-0
					peer-placeholder-shown:scale-100
					peer-focus:-translate-y-5
					peer-focus:scale-75
        `,
					`
					left-4
					text-zinc-400
				`,
					{
						'left-9': formatPrice,
						'text-rose-500': errors[id]
					}
				)}
			>
				{label}
			</label>
		</div>
	)
}
export default Input
