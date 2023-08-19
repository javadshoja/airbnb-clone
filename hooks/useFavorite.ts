import { SafeUser } from '@/types'
import { useRouter } from 'next/navigation'
import useLoginModal from './useLoginModal'
import { MouseEvent, useCallback, useMemo } from 'react'
import { trytm } from '@bdsqqq/try'
import { addFavorite, deleteFavorite } from '@/app/actions/favorite'
import { toast } from 'react-hot-toast'

type UserFavorite = {
	listingId: string
	currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: UserFavorite) => {
	const router = useRouter()
	const loginModal = useLoginModal()

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || []

		return list.includes(listingId)
	}, [currentUser, listingId])

	const toggleFavorite = useCallback(
		async (e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation()

			if (!currentUser) return loginModal.onOpen()

			const action = hasFavorited ? deleteFavorite : addFavorite

			const [, error] = await trytm(action(listingId))

			if (error) {
				toast.error('Something went wrong')
				return
			}

			router.refresh()
			toast.success('Success')
		},
		[currentUser, hasFavorited, listingId, loginModal, router]
	)

	return { hasFavorited, toggleFavorite } as const
}

export default useFavorite
