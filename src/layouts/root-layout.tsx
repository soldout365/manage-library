import { AppSidebar } from './components/sidebar'
import { Header } from './components/header'
import { Main } from './components/main'
import { Outlet } from 'react-router-dom'
import { ProfileDropdown } from './components/profile-dropdown'
import { SidebarProvider } from '@/components/ui/sidebar'
import { TopNav } from './components/top-nav'
import { cn } from '@/lib/utils'
import { topNav } from './data/top-nav'

const RootLayout = () => {
	return (
		<SidebarProvider defaultOpen={true}>
			<AppSidebar />
			<div
				id='content'
				className={cn(
					'ml-auto w-full max-w-full',
					'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
					'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
					'sm:transition-[width] sm:duration-200 sm:ease-linear',
					'flex h-svh flex-col',
					'group-data-[scroll-locked=1]/body:h-full',
					'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
				)}
			>
				<Header>
					<TopNav links={topNav} />
					<div className='ml-auto flex items-center space-x-4'>
						{/* <Search /> */}
						<ProfileDropdown />
					</div>
				</Header>

				<Main>
					<Outlet />
				</Main>
			</div>
		</SidebarProvider>
	)
}

export default RootLayout
