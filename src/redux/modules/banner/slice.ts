import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export enum BannerType {
    SUCCESS = 'success',
    ERROR = 'error',
}

interface BannerState {
    message: string | null
    type: BannerType | null
}

export const initialState: BannerState = {
    message: null,
    type: null,
}

export const SLICE_NAME = 'banner'

export const BannerMessages = {
    onUserAuthenticated: 'The user has being authenticated',
    onUserAuthenticationError: 'We are experiencing some issues authenticating the user',
}

const bannerSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        onUserAuthenticated: (state) => {
            state.message = BannerMessages.onUserAuthenticated
            state.type = BannerType.SUCCESS
        },
        onUserAuthenticationError: (state) => {
            state.message = BannerMessages.onUserAuthenticationError
            state.type = BannerType.ERROR
        },
    },
})

const { actions, reducer } = bannerSlice

export default reducer

export const { onUserAuthenticated, onUserAuthenticationError } = actions

export const getBanner = (state: RootState) => state[SLICE_NAME]
