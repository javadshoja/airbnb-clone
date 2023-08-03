import type { FC } from 'react'
import { cn } from '../libs/utils'

type HeadingProps = {
	title: string
	subtitle?: string
	center?: boolean
}

const Heading: FC<HeadingProps> = ({ title, subtitle, center }) => {
	return (
		<div className={cn('text-start', { 'text-center': center })}>
			<div className='text-2xl font-bold'>{title}</div>
			<div className='mt-2 font-light text-neutral-500'>{subtitle}</div>
		</div>
	)
}
export default Heading
