'use client'

import { registerUser } from '@/app/actions/user'
import useRegisterModel from '@/app/hooks/useRegisterModel'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

import useLoginModel from '@/app/hooks/useLoginModal'
import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const RegisterSchema = z.object({
	name: z.string().min(3, { message: 'Name most be greater than 3 character' }),
	email: z.string().email(),
	password: z.string().min(6)
})

type RegisterData = z.infer<typeof RegisterSchema>

const RegisterModal = () => {
	const [isLoading, setIsLoading] = useState(false)
	const registerModal = useRegisterModel()
	const loginModal = useLoginModel()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		resolver: zodResolver(RegisterSchema)
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)

		registerUser(data as RegisterData)
			.then(() => {
				toast.success('Register complete successfully')
				registerModal.onClose()
			})
			.catch(() => {
				toast.error('Something went wrong')
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const onToggle = useCallback(() => {
		registerModal.onClose()
		loginModal.onOpen()
	}, [loginModal, registerModal])

	const bodyContent = (
		<div className='flex flex-col gap-3'>
			<Heading title='Welcome to Airbnb' subtitle='Create an account!' center />
			<div className='mx-auto mb-1 text-sm font-semibold text-rose-500'>
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
		<div className='mt-3 flex flex-col gap-4'>
			<hr />
			<Button
				outline
				label='Continue with google'
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label='Continue with Github'
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div
				className='
				mt-3
					text-center font-light
					text-neutral-500
				'
			>
				<div className='flex flex-row items-center justify-center gap-2'>
					<div>Already have an account?</div>
					<div
						onClick={onToggle}
						className='
							cursor-pointer
							text-neutral-800
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
