import { PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface User {
    id: string
    name: string
    surname: string
    age: number
}

interface UserState {
    profile: User | null
    authenticating: boolean
}

export const initialState: UserState = {
    profile: null,
    authenticating: false,
}

export const SLICE_NAME = 'user'

const userSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        userReceived: (state, { payload: user }: PayloadAction<User>) => {
            state.profile = user
        },
        clearUser: (state) => {
            state.profile = null
        },
    },
})

const { actions, reducer } = userSlice

export default reducer

export const { userReceived, clearUser } = actions

export const getUserState = (state: RootState) => state[SLICE_NAME]

export const getUserPerofile = createSelector(getUserState, (user) => user.profile)

export const isUserAuthenticated = createSelector(getUserState, (user) => !!user.profile)
