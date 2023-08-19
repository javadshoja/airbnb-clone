import type { SafeUser } from '@/types'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { cn } from '../libs/utils'
import useFavorite from '@/hooks/useFavorite'

type HeartButtonProps = {
	listingId: string
	currentUser?: SafeUser | null
}

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
	const { hasFavorited, toggleFavorite } = useFavorite({
		listingId,
		currentUser
	})

	return (
		<div
			onClick={toggleFavorite}
			className='
        relative
        cursor-pointer
        transition
        hover:opacity-80
      '
		>
			<AiOutlineHeart
				size={28}
				className='
          absolute
          -right-[2px]
          -top-[2px]
          fill-white
        '
			/>
			<AiFillHeart
				size={24}
				className={cn('fill-neutral-500/70', {
					'fill-rose-500': hasFavorited
				})}
			/>
		</div>
	)
}
export default HeartButton
