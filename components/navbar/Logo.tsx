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
				h-auto
				w-auto
				cursor-pointer
				md:block
			'
			width={100}
			height={31.25}
			src='/images/logo.png'
			onClick={() => router.push('/')}
		/>
	)
}
