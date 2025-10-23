import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'
import type { UserType } from '@/types/user.type'

interface AdminTableProps {
	users: UserType[]
	renderActions: (user: UserType) => React.ReactNode
}

const AdminTable = ({ users, renderActions }: AdminTableProps) => {
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
									<Badge>{user.accountStatus}</Badge>
								</TableCell>
								<TableCell className='text-right'>{renderActions(user)}</TableCell>
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
		</Table>
	)
}

export default AdminTable
