'use client'

import type { FC } from 'react'

import type { Range } from 'react-date-range'

import Button from '../Button'
import Calendar from '../inputs/Calendar'

type ListingReservationProps = {
	price: number
	totalPrice: number
	dateRange: Range
	onChangeDate: (value: Range) => void
	onSubmit: () => void
	disabled?: boolean
	disabledDates: Date[]
}

export const ListingReservation: FC<ListingReservationProps> = ({
	price,
	totalPrice,
	dateRange,
	onChangeDate,
	onSubmit,
	disabled,
	disabledDates
}) => {
	return (
		<div
			className='
        overflow-hidden
        rounded-xl
        border
        border-neutral-200
        bg-white
      '
		>
			<div className='flex items-center gap-1 p-4'>
				<div className='text-2xl font-semibold'>$ {price}</div>
				<div className='font-light text-neutral-600'>night</div>
			</div>
			<hr />
			<Calendar
				value={dateRange}
				disabledDates={disabledDates}
				onChange={value => onChangeDate(value.selection)}
			/>
			<hr />
			<div className='p-4'>
				<Button disabled={disabled} label='Reserve' onClick={onSubmit} />
			</div>
			<div
				className='
          flex
          items-center
          justify-center
          p-4
          text-lg
          font-semibold
        '
			>
				<div>Total</div>
				<div>$ {totalPrice}</div>
			</div>
		</div>
	)
}
