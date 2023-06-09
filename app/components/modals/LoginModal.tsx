'use client'

import useLoginModel from '@/app/hooks/useLoginModal'
import useRegisterModel from '@/app/hooks/useRegisterModel'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const LoginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})

const LoginModal = () => {
	const router = useRouter()
	const registerModal = useRegisterModel()
	const loginModal = useLoginModel()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		resolver: zodResolver(LoginFormSchema)
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)

		signIn('credentials', {
			...data,
			redirect: false
		}).then(callback => {
			setIsLoading(false)

			if (callback?.ok) {
				toast.success('Logged in')
				loginModal.onClose()
				router.refresh()
			}

			if (callback?.error) toast.error(callback.error)
		})
	}

	const bodyContent = (
		<div className='flex flex-col gap-3'>
			<Heading title='Welcome back' subtitle='Login to your account!' center />
			<div className='text-sm font-semibold text-rose-500 mb-1 mx-auto'>
				{errors?.name?.message?.toString() ||
					errors?.email?.message?.toString() ||
					errors?.password?.message?.toString()}
			</div>
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
				text-neutral-500
					text-center mt-3
					font-light
				'
			>
				<div className='flex flex-row items-center justify-center gap-2'>
					<div>Already have an account?</div>
					<div
						onClick={loginModal.onClose}
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
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default LoginModal
