import * as React from 'react'

import { Link } from 'react-router-dom'
import { useSidebar } from '@/components/ui/sidebar'

export function TeamSwitcher({
	teams
}: {
	teams: {
		name: string
		logo: React.ElementType
		plan: string
	}[]
}) {
	const { isMobile } = useSidebar()
	const [activeTeam, setActiveTeam] = React.useState(teams[0])

	return (
		<Link to='/'>
			<button className='data-[state=open]:bg-sidebar-accent w-full flex items-center justify-between gap-2 data-[state=open]:text-sidebar-accent-foreground'>
				<div className='flex aspect-square size-8 items-center justify-center rounded-lg'>
					<img
						src="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1I_ZbgRygJ-yy2fIIlScWrxTZkGuZXThhA&s'"
						width={80}
						height={80}
						className='rounded-full object-cover'
					/>
				</div>
				<div className='grid flex-1 text-left text-sm leading-tight'>
					<span className='truncate font-semibold'>{activeTeam.name}</span>
					<span className='truncate text-xs'>Dang Tien Hung - Admin</span>
				</div>
			</button>
		</Link>
	)
}
