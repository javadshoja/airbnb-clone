'use client'

import EmptyState from '@/components/EmptyState'
import { FC, useEffect } from 'react'

type ErrorStateProps = {
	error: Error
}

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
	useEffect(() => {
		console.error(error)
	}, [error])

	return <EmptyState title='Uh Oh' subtitle='Something went wrong!' />
}

export default ErrorState
