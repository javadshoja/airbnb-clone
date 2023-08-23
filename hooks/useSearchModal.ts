import { create } from 'zustand'

type searchModalState = {
	isOpen: boolean
}

type searchModalAction = {
	onOpen: () => void
	onClose: () => void
}

type searchModalStore = searchModalState & searchModalAction

const useSearchModal = create<searchModalStore>(set => ({
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

export default useSearchModal
