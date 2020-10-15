import { login } from '../../../api'
import { AppThunk } from '../../store'
import { onUserAuthenticated, onUserAuthenticationError } from '../banner/slice'
import { userReceived } from './slice'

export const authenticate = (body: { email: string; password: string }): AppThunk => async (dispatch) => {
    try {
        const { data: user } = await login(body)
        dispatch(userReceived(user))
        dispatch(onUserAuthenticated())
    } catch (e) {
        dispatch(onUserAuthenticationError())
    }
}
