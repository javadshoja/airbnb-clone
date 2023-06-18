'use client'

import type { FC } from 'react'
import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

type InputProps = {
	id: string
	label: string
	type?: string
	disabled?: boolean
	formatPrice?: boolean
	required?: boolean
	register: UseFormRegister<FieldValues>
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
				{...register(id, { required })}
				placeholder=' '
				type={type}
				className={`
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
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
			/>
			<label
				htmlFor={id}
				className={`
          absolute
          top-5
          z-10
					origin-[0]
					-translate-y-4
					transform
					text-sm
					duration-150
					${formatPrice ? 'left-9' : 'left-4'}
					peer-placeholder-shown:translate-y-0
					peer-placeholder-shown:scale-100
					peer-focus:-translate-y-5
					peer-focus:scale-75
					${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
			>
				{label}
			</label>
		</div>
	)
}
export default Input
