'use client'

import { useMemo, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import { createListing } from '@/app/actions/listing'
import useRentModal from '@/hooks/useRentModal'
import { ListingSchema } from '@/libs/schemas'
import { trytm } from '@bdsqqq/try'
import { zodResolver } from '@hookform/resolvers/zod'

import Heading from '../Heading'
import CategoryInput from '../inputs/CategoryInput'
import Counter from '../inputs/Counter'
import CountrySelect from '../inputs/CountrySelect'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input'
import { categories } from '../navbar/Categories'
import Modal from './Modal'

enum STEPS {
	CATEGORY,
	LOCATION,
	INFO,
	IMAGES,
	DESCRIPTION,
	PRICE
}

const RentFormSchema = ListingSchema

type RentFormValues = z.infer<typeof RentFormSchema>

const RentModal = () => {
	const router = useRouter()
	const rentModal = useRentModal()

	const [step, setStep] = useState(STEPS.CATEGORY)

	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset
	} = useForm<RentFormValues>({
		resolver: zodResolver(RentFormSchema),
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: ''
		}
	})

	const category = watch('category')
	const location = watch('location')
	const guestCount = watch('guestCount')
	const roomCount = watch('roomCount')
	const bathroomCount = watch('bathroomCount')
	const imageSrc = watch('imageSrc')

	const Map = useMemo(
		() =>
			dynamic(() => import('../Map'), {
				ssr: false
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location]
	)

	const setCustomValue = (
		name: keyof RentFormValues,
		value: RentFormValues[typeof name]
	) => {
		setValue(name, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true
		})
	}

	const onBack = () => {
		setStep(prev => prev - 1)
	}

	const onNext = () => {
		setStep(prev => prev + 1)
	}

	const onSubmit: SubmitHandler<RentFormValues> = async data => {
		if (step !== STEPS.PRICE) return onNext()

		setIsLoading(true)

		console.log(data)

		const [res, error] = await trytm(createListing(data))

		if (error) {
			console.error(error)
			toast.error('Something went wrong.')
		} else {
			toast.success('Listing Created!')
			router.refresh()
			reset()
			setStep(STEPS.CATEGORY)
			rentModal.onClose()
		}

		setIsLoading(false)
	}

	const actionLabel = () => (step === STEPS.PRICE ? 'Create' : 'Next')

	const secondaryActionLabel = () =>
		step === STEPS.CATEGORY ? undefined : 'Back'

	let bodyContent = (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Which of these best describes your place?'
				subtitle='Pick a category'
			/>
			<div
				className='
					grid
					max-h-[50vh]
					grid-cols-1
					gap-2
					overflow-y-auto
					md:grid-cols-2
				'
			>
				{categories.map(item => (
					<div key={item.label} className='col-span-1'>
						<CategoryInput
							onClick={category => setCustomValue('category', category)}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	)

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='Where is your place located?'
					subtitle='Help guests find you!'
				/>
				<CountrySelect
					value={location}
					onChange={value => setCustomValue('location', value)}
				/>
				<Map center={location?.latlng} />
			</div>
		)
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='Share some basics about yor place'
					subtitle='What amenities do you have?'
				/>
				<Counter
					title='Guests'
					subtitle='How many guests do you allow?'
					value={guestCount}
					onChange={value => setCustomValue('guestCount', value)}
				/>
				<br />
				<Counter
					title='Rooms'
					subtitle='How many rooms do you have?'
					value={roomCount}
					onChange={value => setCustomValue('roomCount', value)}
				/>
				<br />
				<Counter
					title='Bathrooms'
					subtitle='How many bathrooms do you have'
					value={bathroomCount}
					onChange={value => setCustomValue('bathroomCount', value)}
				/>
			</div>
		)
	}

	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='Add a photo of your place'
					subtitle='Show guests what your place looks like!'
				/>
				<ImageUpload
					value={imageSrc}
					onChange={value => setCustomValue('imageSrc', value)}
				/>
			</div>
		)
	}

	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='How would you describe your place?'
					subtitle='Short and sweet works best!'
				/>
				<div className='mx-auto mb-1 text-sm font-semibold text-rose-500'>
					{errors?.title?.message?.toString()}
				</div>
				<Input
					id='title'
					label='Title'
					disabled={isLoading}
					register={register('title')}
					errors={errors}
					required
				/>
				<hr />
				<div className='mx-auto mb-1 text-sm font-semibold text-rose-500'>
					{errors?.description?.message?.toString()}
				</div>
				<Input
					id='description'
					label='Description'
					disabled={isLoading}
					register={register('description')}
					errors={errors}
					required
				/>
			</div>
		)
	}

	if (step === STEPS.PRICE) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='Now, set your price'
					subtitle='How much do you charge per night'
				/>
				<div className='mx-auto mb-1 text-sm font-semibold text-rose-500'>
					{errors?.price?.message?.toString()}
				</div>
				<Input
					id='price'
					label='Price'
					formatPrice
					type='number'
					register={register('price', { valueAsNumber: true })}
					errors={errors}
					required
				/>
			</div>
		)
	}

	return (
		<Modal
			title='Airbnb your home!'
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			actionLabel={actionLabel()}
			secondaryActionLabel={secondaryActionLabel()}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	)
}
export default RentModal
