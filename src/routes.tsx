import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/authentication/login/page'
import PublicRouter from './components/PublicRouter'
import PrivateRouter from './components/PrivateRouter'
import ChangePassPage from './pages/authentication/change-password/page'
import ForgotPassPage from './pages/authentication/forgot-password/page'
import ResetPassPage from './pages/authentication/reset-password/page'
import Dashboard from './pages/home/home'
import UserInfoPage from './pages/home/user-info/page'
import UserManagement from './pages/(managements)/users/page'
import RootLayout from './layouts/root-layout'
import ReaderTypesPage from './pages/reader-types/page'
import ManageAuthors from './pages/(managements)/authors/page'
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
		path: '/forgot-password',
		element: <ForgotPassPage />
	},
	{
		path: '/reset-password',
		element: <ResetPassPage />
	},

	{
		path: '/change-password',
		element: (
			<PrivateRouter>
				<ChangePassPage />
			</PrivateRouter>
		)
	},
	{
		path: '/',
		element: (
			<PrivateRouter>
				<RootLayout />
			</PrivateRouter>
		),
		children: [
			{
				index: true,
				element: <Dashboard />
			},
			{
				path: '/users',
				element: <UserManagement />
			},
			{
				path: '/user-info',
				element: <UserInfoPage />
			},
			{
				path: '/reader-types',
				element: <ReaderTypesPage />
			},
			{
				path: '/authors',
				element: <ManageAuthors />
			}
		]
	}
])
export default routes
