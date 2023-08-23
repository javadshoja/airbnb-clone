import EmptyState from '@/components/EmptyState'
import { getFavoriteListings } from '@/services/favorite'
import getCurrentUser from '@/services/user'

import FavoritesClient from './FavoritesClient'

const FavoritesPage = async () => {
	const listings = await getFavoriteListings()
	const currentUser = await getCurrentUser()

	if (listings.length === 0)
		return (
			<EmptyState
				title='No favorites found'
				subtitle='Looks like you have no favorite listings.'
			/>
		)

	return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default FavoritesPage
