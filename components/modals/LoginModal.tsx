'use client'

import { useCallback, useState } from 'react'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const LoginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})

type LoginFormValues = z.infer<typeof LoginFormSchema>

const LoginModal = () => {
	const router = useRouter()
	const loginModal = useLoginModal()
	const registerModal = useRegisterModal()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormValues>({
		resolver: zodResolver(LoginFormSchema)
	})

	const onSubmit: SubmitHandler<LoginFormValues> = async data => {
		setIsLoading(true)

		const res = await signIn('credentials', {
			...data,
			redirect: false
		})

		setIsLoading(false)

		if (res?.error) {
			console.error(res.error)
			toast.error('Something went wrong')
			return
		}

		if (!res?.ok) return

		toast.success('Logged in')
		loginModal.onClose()
		router.refresh()
	}

	const onToggle = useCallback(() => {
		loginModal.onClose()
		registerModal.onOpen()
	}, [loginModal, registerModal])

	const bodyContent = (
		<div className='flex flex-col gap-3'>
			<Heading title='Welcome back' subtitle='Login to your account!' center />
			<div className='mx-auto mb-1 text-sm font-semibold text-rose-500'>
				{errors?.email?.message?.toString() ||
					errors?.password?.message?.toString()}
			</div>
			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				register={register('email')}
				errors={errors}
				required
			/>
			<Input
				id='password'
				type='password'
				label='Password'
				disabled={isLoading}
				register={register('password')}
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
					<div>First time using Airbnb?</div>
					<div
						onClick={onToggle}
						className='
							cursor-pointer
							text-neutral-800
							hover:underline
						'
					>
						Create an account
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
