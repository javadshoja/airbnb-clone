import { create } from 'zustand'

type loginModelState = {
	isOpen: boolean
}

type loginModelAction = {
	onOpen: () => void
	onClose: () => void
}

type loginModelStore = loginModelState & loginModelAction

const useLoginModel = create<loginModelStore>(set => ({
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

export default useLoginModel
