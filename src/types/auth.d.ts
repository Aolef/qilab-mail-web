type UserType = 'ADMIN' | 'TENANT'

interface LoginRequest {
  username: string
  password: string
  userType: UserType
}

interface LoginResponse {
  token: string
  expiresIn: number
  userId: number
  name: string
  userType: UserType
  tenantId: number
}
