import axios from 'axios'
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' }
})

axiosInstance.interceptors.request.use((config) => {
	const authData = localStorage.getItem('authStore')
	if (authData) {
		const token = JSON.parse(authData)?.state?.accessToken
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
	}
	return config
})

export default axiosInstance
