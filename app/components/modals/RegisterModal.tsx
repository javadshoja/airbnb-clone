'use client'

import useRegisterModel from '@/app/hooks/useRegisterModel'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { ReactNode, useState } from 'react'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'

const RegisterFormSchema = z.object({
	name: z.string().min(3, { message: 'Name most be greater than 3 character' }),
	email: z.string().email(),
	password: z.string().min(6)
})

const RegisterModal = () => {
	const [isLoading, setIsLoading] = useState(false)
	const registerModal = useRegisterModel()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		resolver: zodResolver(RegisterFormSchema)
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)

		axios
			.post('/api/register', data)
			.then(() => {
				registerModal.onClose()
			})
			.catch(error => {
				toast.error('Something went wrong')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const bodyContent = (
		<div className='flex flex-col gap-3'>
			<Heading title='Welcome to Airbnb' subtitle='Create an account!' center />
			<div className='text-sm font-semibold text-rose-500 mb-1 mx-auto'>
				{errors?.name?.message?.toString() ||
					errors?.email?.message?.toString() ||
					errors?.password?.message?.toString()}
			</div>
			<Input
				id='name'
				label='Name'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>

			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='password'
				type='password'
				label='Password'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />
			<Button
				outline
				label='Continue with google'
				icon={FcGoogle}
				onClick={() => {}}
			/>
			<Button
				outline
				label='Continue with Github'
				icon={AiFillGithub}
				onClick={() => {}}
			/>
			<div
				className='
				text-neutral-500
					text-center mt-3
					font-light
				'
			>
				<div className='flex flex-row items-center justify-center gap-2'>
					<div>Already have an account?</div>
					<div
						onClick={registerModal.onClose}
						className='
							text-neutral-800
							cursor-pointer
							hover:underline
						'
					>
						Login
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title='Register'
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default RegisterModal
