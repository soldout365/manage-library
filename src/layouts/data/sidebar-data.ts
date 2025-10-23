import {
	BookOpen,
	BookOpenCheck,
	Building2,
	Calendar,
	Command,
	LayoutDashboard,
	Library,
	MapPin,
	PenTool,
	Receipt,
	User,
	Users
} from 'lucide-react'

import type { SidebarData } from '@/types/layout.type'

export const sidebarData: SidebarData = {
	user: {
		name: '123',
		email: '123',
		avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1I_ZbgRygJ-yy2fIIlScWrxTZkGuZXThhA&s'
	},
	teams: [
		{
			name: 'Manage Library',
			logo: Command,
			plan: 'Vite + ShadcnUI'
		}
	],
	navGroups: [
		{
			title: 'Tổng quan',
			items: [
				{
					title: 'Dashboard',
					url: '/',
					icon: LayoutDashboard
				},
				{
					title: 'Quản lý người dùng',
					url: '/users',
					icon: User
				},
				{
					title: 'Cài đặt quyền mượn sách',
					icon: Users,
					url: '/reader-types'
				}
			]
		},
		{
			title: 'Quản lý danh mục',
			items: [
				{
					title: 'Quản lý tác giả',
					icon: PenTool,
					url: '/authors'
				},
				{
					title: 'Quản lý nhà xuất bản',
					icon: Building2,
					url: '/publishers'
				},
				{
					title: 'Quản lý thể loại',
					icon: Library,
					url: '/book-categories'
				},
				{
					title: 'Quản lý vị trí kệ sách',
					icon: MapPin,
					url: '/locations'
				}
				// {
				// 	title: 'Quản lý độc giả',
				// 	icon: Users2,
				// 	url: '/readers',
				// },
			]
		},
		{
			title: 'Quản lý sách',
			items: [
				{
					title: 'Thông tin sách',
					icon: BookOpen,
					url: '/books'
				}
			]
		},
		{
			title: 'Giao dịch thư viện',
			items: [
				{
					title: 'Mượn trả sách',
					icon: BookOpenCheck,
					url: '/borrow-records'
				},
				{
					title: 'Đặt trước sách',
					icon: Calendar,
					url: '/reservations'
				},
				{
					title: 'Quản lý phạt',
					icon: Receipt,
					url: '/fines'
				}
			]
		}
	]
}
