import EmptyState from '@/components/EmptyState'
import { getReservations } from '@/services/reservation'
import getCurrentUser from '@/services/user'

import TripsClient from './TripsClient'

const TripsPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser)
		return <EmptyState title='Unauthorized' subtitle='Please login' />

	const reservations = await getReservations({ userId: currentUser.id })

	if (reservations.length === 0)
		return (
			<EmptyState
				title='No trips found'
				subtitle="Looks like you haven't reserved any trips"
			/>
		)

	return <TripsClient reservations={reservations} currentUser={currentUser} />
}
export default TripsPage
