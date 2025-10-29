import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Edit, Plus, Trash, Upload } from 'lucide-react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import PageHeader from '@/components/page-header'
import PagiantionWapper from '@/components/pagination-wrapper'
import SearchBar from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { useGetReaders } from '@/hooks/readers/use-get-readers'
import { useQueryParams } from '@/hooks/useQueryParam'
import { useGetUsers } from '@/hooks/users/use-get-users'
import type { GetReadersParamsType } from '@/types/reader.type'
import { ERole, type GetUsersParamsType } from '@/types/user.type'
import { useState } from 'react'
import CreateForm from './components/one-for-all-form'
import AdminTable from './components/table/admin-table'
import ReaderTable from './components/table/reader-table'
import { useSearch } from '../../../hooks/useSearch'

const UserManagement = () => {
	const [isCreateSheetOpen, setIsCreateSheetOpen] = useState<boolean>(false)
	const params = useQueryParams()
	const { type = 'reader' } = params

	const navigate = useNavigate()

	const { data: readersData } = useGetReaders(params as GetReadersParamsType, type === 'reader')
	const readers = readersData?.data

	const { data: usersData } = useGetUsers({ ...params, type: ERole.ADMIN } as GetUsersParamsType, type === 'admin')
	const users = usersData?.data

	const currentMeta = type === 'reader' || !type ? readersData?.meta : usersData?.meta
	const currentData = type === 'reader' || !type ? readers?.length : users?.length

	const handleChooseTab = (tab: string) => {
		navigate({
			pathname: '/users',
			search: createSearchParams({
				...params,
				type: tab as ERole,
				page: '1'
			}).toString()
		})
	}

	const handleOpenCreateSheet = () => {
		setIsCreateSheetOpen(!isCreateSheetOpen)
	}

	// handle change page
	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: '/users',
			search: createSearchParams({
				...params,
				page: newPage.toString()
			}).toString()
		})
	}

	const { searchValue, handleKeyPress, handleSearchChange, handleSubmit } = useSearch({
		onKeyPress: (e) => {
			if (e.key === 'Enter') {
				navigate({
					pathname: '/users',
					search: createSearchParams({
						...params,
						page: '1',
						search: searchValue
					}).toString()
				})
			}
		},
		onSubmit: (searchValue) => {
			navigate({
				pathname: '/users',
				search: createSearchParams({
					...params,
					page: '1',
					search: searchValue
				}).toString()
			})
		}
	})

	return (
		<>
			<PageHeader
				title={type === 'reader' ? 'Quản lý độc giả' : 'Quản lý quản trị viên'}
				renderActions={
					<>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant='outline'>
									<Upload className='mr-2 h-4 w-4' />
									Import Excel
								</Button>
							</SheetTrigger>
							<SheetContent side='right' className='!w-[70vw] !max-w-[70vw]'>
								<SheetHeader>
									<SheetTitle>Import người dùng từ Excel</SheetTitle>
								</SheetHeader>
								{/* <div className="px-4">
								<ImportUsersForm
									onSubmit={onImportUsers}
									onCancel={() => setIsImportSheetOpen(false)}
									isLoading={isImporting}
								/>
							</div> */}
							</SheetContent>
						</Sheet>

						<Sheet open={isCreateSheetOpen} onOpenChange={handleOpenCreateSheet}>
							<SheetTrigger>
								<Button>
									<Plus className='mr-2 h-4 w-4' />
									Thêm người dùng
								</Button>
							</SheetTrigger>
							<CreateForm onClose={handleOpenCreateSheet} mode='create' />
						</Sheet>
					</>
				}
			/>

			{/* search bar */}
			<SearchBar
				searchValue={searchValue}
				onSearchChange={handleSearchChange}
				onKeyPress={handleKeyPress}
				onSubmit={handleSubmit}
			/>

			{/* tabs */}
			<Tabs orientation='vertical' value={type} onValueChange={handleChooseTab} className='space-y-4'>
				<div className='w-full overflow-x-auto pb-2'>
					<TabsList>
						<TabsTrigger value='reader'>Độc giả</TabsTrigger>
						<TabsTrigger value='admin'>Quản trị viên</TabsTrigger>
					</TabsList>
				</div>
			</Tabs>
			{/* content */}
			{type === 'reader' && (
				<ReaderTable
					readers={readers || []}
					// renderActions={() => {
					// 	return (
					// 		<div className='flex justify-end space-x-1'>
					// 			<Button
					// 				variant='ghost'
					// 				size='sm'
					// 				className='h-8 w-8 p-0 text-primary hover:text-primary'
					// 			>
					// 				<Edit className='h-4 w-4' />
					// 				<span className='sr-only'>Chỉnh sửa người dùng</span>
					// 			</Button>
					// 			<Button
					// 				variant='ghost'
					// 				size='sm'
					// 				className='h-8 w-8 p-0 text-destructive hover:text-destructive'
					// 			>
					// 				<Trash className='h-4 w-4' />
					// 				<span className='sr-only'>Xóa người dùng</span>
					// 			</Button>
					// 		</div>
					// 	)
					// }}
				/>
			)}
			{type === 'admin' && (
				<AdminTable
					users={users || []}
					// renderActions={() => {
					// 	return (
					// 		<div className='flex justify-end space-x-1'>
					// 			<Button
					// 				variant='ghost'
					// 				size='sm'
					// 				className='h-8 w-8 p-0 text-primary hover:text-primary'
					// 			>
					// 				<Edit className='h-4 w-4' />
					// 				<span className='sr-only'>Chỉnh sửa người dùng</span>
					// 			</Button>
					// 			<Button
					// 				variant='ghost'
					// 				size='sm'
					// 				className='h-8 w-8 p-0 text-destructive hover:text-destructive'
					// 			>
					// 				<Trash className='h-4 w-4' />
					// 				<span className='sr-only'>Xóa người dùng</span>
					// 			</Button>
					// 		</div>
					// 	)
					// }}
				/>
			)}

			{/* pagination */}
			<PagiantionWapper currentData={currentData} onChangePage={handleChangePage} currentMeta={currentMeta} />
		</>
	)
}

export default UserManagement
