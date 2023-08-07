'use client'

import type { FC } from 'react'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPause } from 'react-icons/tb'

import { env } from '@/env.mjs'

declare global {
	var cloudinary: any
}

type ImageUploadProps = {
	value: string
	onChange: (value: string) => void
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }) => {
	const handleUpload = (result: any) => {
		onChange(result.info.secure_url)
	}
	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset={env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			options={{
				maxFiles: 1
			}}
		>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className='
              relative
              flex
              cursor-pointer
              flex-col
              items-center
              justify-center
              gap-4
              border-2
              border-dashed
              border-neutral-300
              p-16
              text-neutral-600
              transition
              hover:opacity-70
            '
					>
						<TbPhotoPause size={50} />
						<div className='text-lg font-semibold'>Click to Upload</div>
						{value && (
							<div className='absolute inset-0 h-full w-full'>
								<Image
									alt='Upload'
									fill
									style={{
										objectFit: 'cover'
									}}
									src={value}
								/>
							</div>
						)}
					</div>
				)
			}}
		</CldUploadWidget>
	)
}
export default ImageUpload
