import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home'
import LoginPage from './pages/login/page'
import PublicRouter from './components/PublicRouter'
import PrivateRouter from './components/PrivateRouter'
const routes = createBrowserRouter([
	{
		path: '/login',
		element: (
			<PublicRouter>
				<LoginPage />
			</PublicRouter>
		)
	},
	{
		path: '/',
		element: (
			<PrivateRouter>
				<HomePage />
			</PrivateRouter>
		)
	}
])
export default routes
