// import { useLogin } from '@/hooks/auth/useLogin'
// import type { AuthContextType, LoginRequest } from '@/types/auth.type'
// import type { UserType } from '@/types/user.type'
// import React, { createContext, useContext, useEffect, useState } from 'react'

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// 	const [user, setUser] = useState<UserType | null>(null)
// 	const [accessToken, setAccessToken] = useState<string | null>(null)
// 	// const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

// 	const { mutate: loginMutation } = useLogin()

// 	const login = async (username: string, password: string): Promise<void> => {
// 		const data: LoginRequest = { username, password }

// 		loginMutation(data, {
// 			onSuccess: async (response) => {
// 				console.log('Login successful:', response)
// 				const { access_token } = response

// 				if (access_token) {
// 					setAccessToken(access_token)
// 					// setIsAuthenticated(true)
// 					localStorage.setItem('token', access_token)
// 				} else {
// 				}
// 			},
// 			onError: (error) => {
// 				setAccessToken(null)
// 				// setIsAuthenticated(false)
// 				console.error('Login failed:', error)
// 			}
// 		})
// 	}
// 	const logout = () => {
// 		setAccessToken(null)
// 		// setIsAuthenticated(false)
// 		localStorage.removeItem('token')
// 	}

// 	useEffect(() => {
// 		const saveToken = localStorage.getItem('token')
// 		if (saveToken) {
// 			setAccessToken(saveToken)
// 			// setIsAuthenticated(true)
// 		}
// 	}, [])

// 	const value: AuthContextType = {
// 		accessToken,
// 		// isAuthenticated,
// 		login,
// 		logout
// 		// user
// 	}
// 	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }
// export const useAuth = () => {
// 	const context = useContext(AuthContext)

// 	if (context === undefined) {
// 		throw new Error('useAuth must be used within an AuthProvider')
// 	}

// 	return context
// }
