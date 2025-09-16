import { request } from "@/api/request"
import type { ISignInProps, ISignInServiceParams, UserProps } from "./type"

export const AUTH_API = {
    LOGIN: '/auth/login',
    CURRENT_USER: '/auth/me'
}

const login = async(payload: ISignInServiceParams): Promise<ISignInProps> => {
    return request<ISignInProps>(AUTH_API.LOGIN, 'public', payload, 'POST')
}

const getCurrentUser = async(): Promise<UserProps> => {
    return request<ISignInProps>(AUTH_API.CURRENT_USER, 'private')
}

const authService = {
    login,
    getCurrentUser
}

export default authService