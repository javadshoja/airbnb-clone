import Image from 'next/image'

export default function Avatar() {
	return (
		<Image
			className='rounded-full'
			height={30}
			width={30}
			src='/images/placeholder.jpg'
			alt='Avatar'
		/>
	)
}
