'use client'

import type { FC } from 'react'

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type CounterProps = {
	title: string
	subtitle: string
	value: number
	onChange: (value: number) => void
}

const Counter: FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
	const onAdd = () => {
		onChange(value + 1)
	}

	const onReduce = () => {
		if (value === 1) return

		onChange(value - 1)
	}

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-col'>
				<div className='font-medium'>{title}</div>
				<div className='font-light text-gray-600'>{subtitle}</div>
			</div>
			<div className='flex items-center gap-4'>
				<div
					onClick={onReduce}
					className='
            flex
            h-10
            w-10
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border
            border-neutral-400
            text-neutral-600
            transition
            hover:opacity-80
          '
				>
					<AiOutlineMinus />
				</div>
				<div className='text-xl font-light text-neutral-600'>{value}</div>
				<div
					onClick={onAdd}
					className='
            flex
            h-10
            w-10
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border
            border-neutral-400
            text-neutral-600
            transition
            hover:opacity-80
          '
				>
					<AiOutlinePlus />
				</div>
			</div>
		</div>
	)
}

export default Counter
