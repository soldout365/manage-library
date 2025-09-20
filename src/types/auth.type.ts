import type { UserType } from './user.type'

export interface LoginResponse {
	access_token: string
}

export interface LoginRequest {
	username: string
	password: string
}

export interface AuthState {
	accessToken: string | null
	user: UserType | null

	setToken: (token: string) => void
	setUser: (user: UserType) => void
	clearAuth: () => void
}

// export interface AuthContextType {
// 	accessToken: string | null
// 	// user: UserType | null

// 	// isAuthenticated: boolean

// 	login: (username: string, password: string) => Promise<void>
// 	logout: () => void
// }
