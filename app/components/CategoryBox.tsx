'use client'

import { FC, useCallback } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { IconType } from 'react-icons'

type CategoryBoxProps = {
	icon: IconType
	label: string
	selected?: boolean
}

const CategoryBox: FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
	const router = useRouter()
	const params = useSearchParams()

	const handleClick = useCallback(() => {
		const currentQuery = params ? qs.parse(params.toString()) : {}

		const updatedQuery: any = {
			...currentQuery,
			category: label
		}

		if (params?.get('category') === label) delete updatedQuery.category

		const url = qs.stringifyUrl(
			{
				url: '/',
				query: updatedQuery
			},
			{ skipNull: true }
		)

		router.push(url)
	}, [label, params, router])

	return (
		<div
			onClick={handleClick}
			className={`
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        gap-2
        border-b-2
        p-3
				transition
        hover:text-neutral-800
        ${selected ? 'border-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
		>
			<Icon size={22} />
			<div className='text-sm font-medium'>{label}</div>
		</div>
	)
}
export default CategoryBox
