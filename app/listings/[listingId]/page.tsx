import EmptyState from '@/components/EmptyState'
import { getListingById } from '@/services/listing'
import { getReservations } from '@/services/reservation'
import getCurrentUser from '@/services/user'

import ListingClient from './ListingClient'

type ListingPageParams = {
	listingId?: string
}

const ListingPage = async ({ params }: { params: ListingPageParams }) => {
	const listing = await getListingById(params)
	const reservations = await getReservations(params)
	const currentUser = await getCurrentUser()

	if (!listing) return <EmptyState />

	return (
		<ListingClient
			listing={listing}
			reservations={reservations}
			currentUser={currentUser}
		/>
	)
}

export default ListingPage
