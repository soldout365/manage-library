import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import type { UserType } from '@/types/user.type'
import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'lucide-react'
import { useState } from 'react'
import { useDeleteUser } from '@/hooks/users/use-delete-user'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/apis/user.api'
import { Sheet } from '@/components/ui/sheet'
import CreateForm from '../create-form'

interface AdminTableProps {
	users: UserType[]
	// renderActions: (user: UserType) => React.ReactNode
}

const AdminTable = ({
	users
	//  renderActions
}: AdminTableProps) => {
	const queryClient = useQueryClient()

	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState<UserType | null>(null)

	const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()

	const handleDeleteClick = (user: UserType) => {
		setSelectedUser(user)
		setIsDeleteDialogOpen(true)
	}

	const handleDelete = () => {
		if (!selectedUser) return

		deleteUser(selectedUser.id, {
			onSuccess: () => {
				toast.success('Xóa quản trị viên thành công')
				queryClient.invalidateQueries({ queryKey: [userApi.getUsers.name] })
				setIsDeleteDialogOpen(false)
				setSelectedUser(null)
			},
			onError: () => {
				toast.error('Có lỗi xảy ra khi xóa quản trị viên')
			}
		})
	}
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Mã người dùng</TableHead>
					<TableHead>Tên người dùng</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Quyền</TableHead>
					<TableHead>Trạng thái</TableHead>
					<TableHead className='text-right'>Hành động</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users && users.length > 0 ? (
					users.map((user) => {
						return (
							<TableRow key={user.id}>
								<TableCell className='font-medium'>{user.userCode}</TableCell>
								<TableCell>{user.username}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>
									<Badge
										className={
											user.accountStatus === 'active'
												? 'bg-green-500 text-white'
												: user.accountStatus === 'suspended'
													? 'bg-yellow-500 text-black'
													: 'bg-red-500 text-white'
										}
									>
										{user.accountStatus}
									</Badge>
								</TableCell>
								<TableCell className='text-right'>
									{/* {renderActions(user)} */}
									<div className='flex justify-end space-x-1'>
										<Button
											variant='ghost'
											size='sm'
											className='h-8 w-8 p-0 text-primary hover:text-primary'
											onClick={() => {
												setSelectedUser(user)
												setIsEditDialogOpen(true)
											}}
										>
											<Edit className='h-4 w-4' />
											<span className='sr-only'>Chỉnh sửa người dùng</span>
										</Button>
										<Button
											variant='ghost'
											size='sm'
											className='h-8 w-8 p-0 text-destructive hover:text-destructive'
											onClick={() => handleDeleteClick(user)}
										>
											<Trash className='h-4 w-4' />
											<span className='sr-only'>Xóa người dùng</span>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						)
					})
				) : (
					<TableRow>
						<TableCell className='text-center py-8' colSpan={9}>
							Không có người dùng nào
						</TableCell>
					</TableRow>
				)}
			</TableBody>
			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Xác nhận xóa </AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc chắn muốn xóa "{selectedUser?.userCode}"? Hành động này không thể hoàn tác.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Hủy</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isDeleting}
							className='bg-red-600 hover:bg-red-700'
						>
							{isDeleting ? 'Đang xóa...' : 'Xóa'}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>{' '}
			{/** edit form */}
			{selectedUser && (
				<Sheet open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
					<CreateForm
						mode='edit-admin'
						userId={selectedUser.id}
						defaultValues={{
							userCode: selectedUser.userCode,
							username: selectedUser.username,
							email: selectedUser.email,
							password: '',
							role: 'admin',
							accountStatus: selectedUser.accountStatus || 'active'
						}}
						onClose={() => setIsEditDialogOpen(false)}
					/>
				</Sheet>
			)}
		</Table>
	)
}

export default AdminTable
