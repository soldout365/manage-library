import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { ConfirmDialog } from './profile/confirm-dialog'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '@/stores/auth.store'

export function ProfileDropdown() {
	const user = useAuthStore((state) => state.user)
	const { clearAuth } = useAuthStore()
	const [showLogoutDialog, setShowLogoutDialog] = useState(false)

	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger>
					<Button variant='ghost' className='relative bg-transparent hover:bg-transparent'>
						<div className='flex flex-col items-end space-y-1'>
							<p className='text-xs leading-none font-medium'>{user?.username}</p>
							<p className='text-muted-foreground text-[10px] leading-none'>{user?.email}</p>
						</div>
						<Avatar className='h-8 w-8 rounded-full'>
							<AvatarImage
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1I_ZbgRygJ-yy2fIIlScWrxTZkGuZXThhA&s'
								alt='@shadcn'
								className='w-8 h-8 rounded-full object-cover'
							/>
							<AvatarFallback>{user?.username}D</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56' align='end' forceMount>
					<DropdownMenuLabel className='font-normal'>
						<div className='flex flex-col space-y-1'>
							<p className='text-sm leading-none font-medium'>{user?.username}</p>
							<p className='text-muted-foreground text-xs leading-none'>{user?.email}</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link to='/user-info'>
								Quản lý tài khoản
								<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
						Đăng xuất
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<ConfirmDialog
				open={showLogoutDialog}
				onOpenChange={setShowLogoutDialog}
				title='Xác nhận đăng xuất'
				desc='Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?'
				cancelBtnText='Hủy'
				confirmText='Đăng xuất'
				destructive={false}
				handleConfirm={() => {
					clearAuth()
					setShowLogoutDialog(false)
				}}
			/>
		</>
	)
}
