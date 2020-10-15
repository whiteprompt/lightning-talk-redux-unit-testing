import axios, { AxiosResponse } from 'axios'
import { User } from '../redux/modules/user/slice'

export const login = async (body: { email: string; password: string }): Promise<AxiosResponse<User>> =>
    await axios.post('/user', body)
