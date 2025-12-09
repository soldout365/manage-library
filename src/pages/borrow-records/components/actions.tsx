import { ChartColumn, File, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Actions = () => {
	return (
		<div className='flex items-center justify-between gap-2'>
			{/* search */}
			<div className='flex items-center gap-2 justify-between flex-1'>
				{/* div */}
				<div className='flex items-center gap-2 flex-1 relative'>
					<Search className='h-4 w-4 absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground' />
					<Input placeholder='Tìm kiếm theo mã, tên hoặc email...' className='pl-10' />
				</div>

				{/* btn */}
				<Button className='gap-2'>
					<Search className='h-4 w-4' />
					Tìm kiếm
				</Button>
			</div>

			{/* export báo cáo */}
			<Button className='gap-2' variant='outline'>
				<File className='h-4 w-4' />
				Tải báo cáo
			</Button>

			{/* export thống kê */}
			<Button className='gap-2' variant='outline'>
				<ChartColumn className='h-4 w-4' />
				Thống kê
			</Button>
		</div>
	)
}

export default Actions
