'use client'

import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'

type ClientOnlyProps = {
	children: ReactNode
}

const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) return null

	return <>{children}</>
}

export default ClientOnly
