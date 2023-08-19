'use client'

import type { FC } from 'react'
import type { Range, RangeKeyDict } from 'react-date-range'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

type CalendarProps = {
	value: Range
	onChange: (value: RangeKeyDict) => void
	disabledDates?: Date[]
}

const Calendar: FC<CalendarProps> = ({ value, onChange, disabledDates }) => {
	return (
		<DateRange
			rangeColors={['#262626']}
			ranges={[value]}
			date={new Date()}
			onChange={onChange}
			direction='vertical'
			showDateDisplay={false}
			minDate={new Date()}
			disabledDates={disabledDates}
		/>
	)
}
export default Calendar
