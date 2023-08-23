import { cn } from '@/libs/utils'
import { FC, ReactNode } from 'react'

type GridProps = {
	className?: string
	children: ReactNode
}

const Grid: FC<GridProps> = ({ className, children }) => {
	return (
		<div
			className={cn(
				`
        grid
        grid-cols-1
        gap-8
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
      `,
				className
			)}
		>
			{children}
		</div>
	)
}

export default Grid
