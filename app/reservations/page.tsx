import EmptyState from '@/components/EmptyState'
import { getReservations } from '@/services/reservation'
import getCurrentUser from '@/services/user'

import ReservationsClient from './ReservationsClient'

const ReservationPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser)
		return <EmptyState title='Unauthorized' subtitle='Please login' />

	const reservations = await getReservations({
		authorId: currentUser.id
	})

	if (reservations?.length === 0)
		return (
			<EmptyState
				title='No reservations found'
				subtitle='Looks like you have no reservation on your properties'
			/>
		)

	return (
		<ReservationsClient reservations={reservations} currentUser={currentUser} />
	)
}

export default ReservationPage
