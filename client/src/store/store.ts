import { Action, action, Computed, computed, createStore, createTypedHooks, persist } from "easy-peasy"

interface User {
    walletAddress: string
    isLoggedIn: boolean
}

interface Model {
    user: User
    login: Action<Model, User>
    logout: Action<Model>
}

const appState: Model = {
    user: {
        walletAddress: '',
        isLoggedIn: false
    },
    login: action((state, payload: User) => {
        state.user = payload
    }),
    logout: action((state) => {
        state.user.isLoggedIn = false
        state.user.walletAddress = ''
    })
}

interface StoreModel {
    appState: Model
}

const model: StoreModel = {
    appState
}

const store = createStore(
    persist(model, {
        storage: "localStorage"
    })
)

const { useStoreActions, useStoreDispatch, useStoreState, useStore } = createTypedHooks<StoreModel>()

export { store, useStoreActions, useStoreDispatch, useStoreState, useStore }