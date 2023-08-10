import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ListingCard from '@/components/listings/ListingCard'
import { getListings } from './services/listing'
import getCurrentUser from './services/user'

export default async function HomePage() {
	const listings = await getListings()
	const currentUser = await getCurrentUser()

	if (listings?.length === 0) {
		return <EmptyState showReset />
	}
	return (
		<Container>
			<div
				className='
					grid
					grid-cols-1
					gap-8
					sm:grid-cols-2
					md:grid-cols-3
					lg:grid-cols-4
					xl:grid-cols-5
					2xl:grid-cols-6
					'
			>
				{listings?.map(listing => (
					<ListingCard
						key={listing.id}
						listing={listing}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}
