import { z } from 'zod'

export const CountrySchema = z.object({
	flag: z.string(),
	label: z.string(),
	latlng: z.array(z.number()),
	region: z.string(),
	value: z.string()
})

export const ListingSchema = z.object({
	category: z.string(),
	location: CountrySchema.nullable(),
	guestCount: z.number(),
	roomCount: z.number(),
	bathroomCount: z.number(),
	imageSrc: z.string(),
	price: z.number(),
	title: z.string(),
	description: z.string()
})
