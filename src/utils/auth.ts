const TOKEN_KEY = 'qilab_token'
const USER_INFO_KEY = 'qilab_user_info'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getUserInfo(): LoginResponse | null {
  const info = localStorage.getItem(USER_INFO_KEY)
  return info ? (JSON.parse(info) as LoginResponse) : null
}

export function setUserInfo(info: LoginResponse): void {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(info))
}

export function removeUserInfo(): void {
  localStorage.removeItem(USER_INFO_KEY)
}
