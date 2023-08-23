'use client'

import useCountries from '@/hooks/useCountries'
import useSearchModal from '@/hooks/useSearchModal'
import { differenceInDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'

export default function Search() {
	const searchModal = useSearchModal()
	const params = useSearchParams()
	const { getByValue } = useCountries()

	const locationValue = params.get('locationValue')
	const startDate = params.get('startDate')
	const endDate = params.get('endDate')
	const guestCount = params.get('guestCount')

	const locationLabel = useMemo(() => {
		if (locationValue) return getByValue(locationValue)?.label

		return 'Anywhere'
	}, [getByValue, locationValue])

	const durationLabel = useMemo(() => {
		if (startDate && endDate) {
			const start = new Date(startDate)
			const end = new Date(endDate)

			let diff = differenceInDays(end, start)

			if (diff === 0) diff = 1

			return `${diff} Days`
		}

		return 'Any Week'
	}, [startDate, endDate])

	const guestLabel = useMemo(() => {
		if (guestCount) return `${guestCount} Guests`

		return 'Add Guests'
	}, [guestCount])

	return (
		<div
			onClick={searchModal.onOpen}
			className='
        w-full
        cursor-pointer
        rounded-full
        border
        py-2
        shadow-sm
        hover:shadow-md
        md:w-auto
      '
		>
			<div
				className='
          flex-rew
          flex
          items-center
          justify-between'
			>
				<div className='px-6 text-sm font-semibold'>{locationLabel}</div>
				<div
					className='
            hidden
            flex-1
            border-x
            px-6
            text-center
            text-sm
            font-semibold
            sm:block
        '
				>
					{durationLabel}
				</div>
				<div
					className='
            flex
            flex-row
            items-center
            gap-3
            pl-6
            pr-2
            text-sm
            text-gray-600
        '
				>
					<div className='hidden sm:block'>{guestLabel}</div>
					<div
						className='
              rounded-full
              bg-rose-500
              p-2
              text-white
            '
					>
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	)
}
