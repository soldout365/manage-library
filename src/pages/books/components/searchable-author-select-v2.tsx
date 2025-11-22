import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SearchableAuthorSelectProps {
	options: { value: string; label: string }[]
	onValueChange: (value: string) => void
	onValueSearch: (value: string) => void
	placeholder?: string
	searchPlaceholder?: string
	emptyText?: string
	className?: string
	disabled?: boolean
	isLoading?: boolean
}

export const SearchableAuthorSelectV2 = ({
	options,
	onValueChange,
	onValueSearch,
	placeholder = 'Chọn tác giả',
	searchPlaceholder = 'Tìm kiếm tác giả',
	emptyText = 'Không tìm thấy tác giả',
	className,
	disabled = false,
	isLoading = false
}: SearchableAuthorSelectProps) => {
	const [open, setOpen] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSearchValue(value)
		onValueSearch(value)
	}

	const handleSelectOption = (optionValue: string) => {
		onValueChange(optionValue)
		setSearchValue('')
		setOpen(false)
	}

	return (
		<div className='relative w-full'>
			{/* Trigger Button */}
			<button
				type='button'
				disabled={disabled}
				onClick={() => {
					setOpen(!open)
				}}
				className={cn(
					'w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between bg-white',
					'text-muted-foreground',
					disabled && 'opacity-50 cursor-not-allowed',
					className
				)}
			>
				<span>{placeholder}</span>
				<ChevronsUpDown className='h-4 w-4 opacity-50' />
			</button>

			{/* Dropdown */}
			{open && (
				<div className='absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg'>
					{/* Search Input */}
					<div className='p-2 border-b'>
						<input
							type='text'
							placeholder={searchPlaceholder}
							value={searchValue}
							onChange={handleSearchChange}
							className='w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary'
							autoFocus
						/>
					</div>

					{/* Options List */}
					<div className='max-h-60 overflow-y-auto'>
						{isLoading ? (
							<div className='px-4 py-2 text-sm text-gray-500'>Đang tải...</div>
						) : options.length === 0 ? (
							<div className='px-4 py-2 text-sm text-gray-500'>{emptyText}</div>
						) : (
							options.map((option) => (
								<button
									key={option.value}
									type='button'
									onClick={() => handleSelectOption(option.value)}
									className='w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between'
								>
									<span className='text-sm'>{option.label}</span>
									<Check className='h-4 w-4 opacity-0' />
								</button>
							))
						)}
					</div>
				</div>
			)}

			{/* Overlay to close dropdown when clicking outside */}
			{open && (
				<div
					className='fixed inset-0 z-40'
					onClick={() => {
						setOpen(false)
					}}
				/>
			)}
		</div>
	)
}
