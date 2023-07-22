import { create } from 'zustand'

type registerModalState = {
	isOpen: boolean
}

type registerModalAction = {
	onOpen: () => void
	onClose: () => void
}

type registerModalStore = registerModalState & registerModalAction

const useRegisterModal = create<registerModalStore>(set => ({
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

export default useRegisterModal
