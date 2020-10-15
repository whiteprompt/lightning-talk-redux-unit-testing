import { PayloadAction, combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { ThunkAction } from 'redux-thunk'

import banner, { initialState as bannerInitialState } from './modules/banner/slice'
import user, { initialState as userInitialState } from './modules/user/slice'

export const appInitialState = {
    banner: bannerInitialState,
    user: userInitialState,
}

export const reducers = {
    banner,
    user,
}

const rootReducer = combineReducers(reducers)

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({})] as const, // prevent this from becoming just `Array<Middleware>`
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<Promise<void>, RootState, never, PayloadAction<any>>

export type AppDispatch = typeof store.dispatch

export default store
