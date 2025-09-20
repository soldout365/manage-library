// File này VẪN CẦN và quan trọng
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserType } from '@/types/user.type'
import type { AuthState } from '@/types/auth.type'

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: null,
			user: null,

			setToken: (token: string) => {
				set({ accessToken: token })
			},
			setUser: (user: UserType) => {
				set({ user })
			},
			clearAuth: () => {
				set({
					accessToken: null,
					user: null
				})
			}
		}),
		{
			name: 'authStore'
		}
	)
)
