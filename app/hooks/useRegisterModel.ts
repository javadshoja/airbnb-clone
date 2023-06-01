import { create } from 'zustand'

type registerModelState = {
	isOpen: boolean
}

type registerModelAction = {
	onOpen: () => void
	onClose: () => void
}

type registerModelStore = registerModelState & registerModelAction

const useRegisterModel = create<registerModelStore>(set => ({
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

export default useRegisterModel
