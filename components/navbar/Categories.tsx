'use client'

import { Suspense } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import {
	GiBarn,
	GiBoatFishing,
	GiCactus,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiIsland,
	GiWindmill
} from 'react-icons/gi'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'

import CategoryBox from '../CategoryBox'
import Container from '../Container'

export const categories = [
	{
		label: 'Beach',
		icon: TbBeach,
		description: 'This property is close to beach!'
	},
	{
		label: 'Windmills',
		icon: GiWindmill,
		description: 'This property is close to Windmills!'
	},
	{
		label: 'Modern',
		icon: MdOutlineVilla,
		description: 'This property is modern!'
	},
	{
		label: 'Countryside',
		icon: TbMountain,
		description: 'This property is in the countryside!'
	},
	{
		label: 'Pool',
		icon: TbPool,
		description: 'This property is a pool!'
	},
	{
		label: 'Island',
		icon: GiIsland,
		description: 'This property is on an island!'
	},
	{
		label: 'Lake',
		icon: GiBoatFishing,
		description: 'This property is close to a lake!'
	},
	{
		label: 'Skiing',
		icon: FaSkiing,
		description: 'This property is has skiing activities!'
	},
	{
		label: 'Castle',
		icon: GiCastle,
		description: 'This property is in castle!'
	},
	{
		label: 'Camping',
		icon: BsSnow,
		description: 'This property has camping activities!'
	},
	{
		label: 'Arctic',
		icon: GiForestCamp,
		description: 'This property has camping activities!'
	},
	{
		label: 'Cave',
		icon: GiCaveEntrance,
		description: 'This property is in a cave!'
	},
	{
		label: 'Desert',
		icon: GiCactus,
		description: 'This property is in a desert!'
	},
	{
		label: 'Barns',
		icon: GiBarn,
		description: 'This property is in a barn!'
	},
	{
		label: 'Lux',
		icon: IoDiamond,
		description: 'This property is luxurious!'
	}
]

const Categories = () => {
	const params = useSearchParams()
	const category = params?.get('category')
	const pathname = usePathname()

	const isMainPage = pathname === '/'

	if (!isMainPage) return null

	return (
		<Container>
			<div
				className='
          flex
          items-center
          justify-between
          overflow-x-auto
          pt-4
        '
			>
				<Suspense>
					{categories.map(item => (
						<CategoryBox
							key={item.label}
							label={item.label}
							icon={item.icon}
							selected={category === item.label}
						/>
					))}
				</Suspense>
			</div>
		</Container>
	)
}
export default Categories
