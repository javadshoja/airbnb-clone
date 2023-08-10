'use client'

import type { FC } from 'react'
import { useMemo } from 'react'

import Select from 'react-select'
import { z } from 'zod'

import useCountries from '@/hooks/useCountries'
import { CountrySchema } from '@/app/libs/schemas'

export type CountrySelectValue = z.infer<typeof CountrySchema>

type CountrySelectProps = {
	value?: CountrySelectValue | null
	onChange: (value: CountrySelectValue) => void
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
	const { getAll } = useCountries()

	const options = useMemo(() => getAll(), [getAll])

	return (
		<div>
			<Select
				placeholder='Anywhere'
				isClearable
				options={options}
				onChange={value => onChange(value as CountrySelectValue)}
				formatOptionLabel={option => (
					<div className='flex items-center gap-3'>
						<div>{option.flag}</div>
						<div>
							{option.label}
							<span className='ml-1 text-neutral-500'>{option.region}</span>
						</div>
					</div>
				)}
				classNames={{
					control: () => 'p-2 border-2',
					input: () => 'text-lg',
					option: () => 'text-lg'
				}}
				theme={theme => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: 'black',
						primary25: '#ffe4e6'
					}
				})}
			/>
		</div>
	)
}
export default CountrySelect
