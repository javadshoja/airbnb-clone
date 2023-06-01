'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Logo() {
	const router = useRouter()
	return (
		<Image
			alt='logo'
			className='
				hidden
				md:block
				cursor-pointer
				w-auto
				h-auto
			'
			width={100}
			height={31.25}
			src='/images/logo.png'
			onClick={() => router.push('/')}
		/>
	)
}
