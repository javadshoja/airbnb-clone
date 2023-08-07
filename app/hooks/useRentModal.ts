import { create } from 'zustand'

type rentModalState = {
	isOpen: boolean
}

type rentModalAction = {
	onOpen: () => void
	onClose: () => void
}

type rentModalStore = rentModalState & rentModalAction

const useRentModal = create<rentModalStore>(set => ({
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

export default useRentModal
