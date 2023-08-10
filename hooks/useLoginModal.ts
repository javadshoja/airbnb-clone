import { create } from 'zustand'

type loginModalState = {
	isOpen: boolean
}

type loginModalAction = {
	onOpen: () => void
	onClose: () => void
}

type loginModalStore = loginModalState & loginModalAction

const useLoginModal = create<loginModalStore>(set => ({
	isOpen: false,
	onOpen: () =>
		set(() => ({
			isOpen: true
		})),
	onClose: () =>
		set(() => ({
			isOpen: false
		}))
}))

export default useLoginModal
