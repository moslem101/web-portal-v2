import { setCookie, getCookie, deleteCookie, cookieNames } from './cookie'

export function setAccessToken(token: string, expiresIn?: number) {
  const options = expiresIn ? { maxAge: expiresIn } : {}
  setCookie(cookieNames.USER_ACCESS_TOKEN, token, options)
}

export function getAccessToken(): string {
  return getCookie(cookieNames.USER_ACCESS_TOKEN)
}

export function setUserAccount(accountData: string) {
  setCookie(cookieNames.USER_ACCOUNT, accountData)
}

export function clearAuth() {
  deleteCookie(cookieNames.USER_ACCESS_TOKEN)
  deleteCookie(cookieNames.USER_ACCOUNT)
}
