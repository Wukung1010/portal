import Cookies from 'js-cookie'
import config from '@/config'

const { cookieExpires } = config

export const TOKEN_KEY = 'token'
export const TENANT_KEY = 'tanant'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const setTenant = (tenant) => {
  Cookies.set(TENANT_KEY, tenant, { expires: cookieExpires || 1 })
}

export const getTenant = () => {
  const tenant = Cookies.get(TENANT_KEY)
  if (tenant) return tenant
  else return false
}
