import { request } from "@/api/request"
import type { IRefreshServiceParams, ISignInProps, ISignInServiceParams, RefreshProps, UserProps } from "./type"

export const AUTH_API = {
    LOGIN: '/auth/login',
    CURRENT_USER: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh'
}

const login = async(payload: ISignInServiceParams): Promise<ISignInProps> => {
    return request<ISignInServiceParams, ISignInProps>(AUTH_API.LOGIN, 'public', payload, 'POST')
}

const getCurrentUser = async(): Promise<UserProps> => {
    return request<void, ISignInProps>(AUTH_API.CURRENT_USER, 'private')
}

const getRefreshToken = async(payload: IRefreshServiceParams): Promise<RefreshProps> => {
    return request<IRefreshServiceParams, RefreshProps>(AUTH_API.REFRESH_TOKEN, 'private', payload, 'POST')
}

const authService = {
    login,
    getCurrentUser,
    getRefreshToken
}

export default authService