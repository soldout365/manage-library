import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SearchablePublisherSelectProps {
	options: { value: string; label: string }[]
	value?: string
	onValueChange?: (value: string) => void
	placeholder?: string
	searchPlaceholder?: string
	emptyText?: string
	className?: string
	disabled?: boolean
}

export const SearchablePublisherSelect = ({
	options,
	value,
	onValueChange,
	placeholder = 'Chọn nhà xuất bản',
	searchPlaceholder = 'Tìm kiếm nhà xuất bản',
	emptyText = 'Không tìm thấy nhà xuất bản',
	className,
	disabled = false
}: SearchablePublisherSelectProps) => {
	const [open, setOpen] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	const selectedOption = options.find((option) => option.value === value)

	const filteredOptions = searchValue.trim()
		? options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase().trim()))
		: options

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const handleSelectOption = (optionValue: string) => {
		onValueChange?.(optionValue)
		setSearchValue('')
		setOpen(false)
	}

	return (
		<div className='relative w-full'>
			{/* Trigger Button */}
			<button
				type='button'
				disabled={disabled}
				onClick={() => setOpen(!open)}
				className={cn(
					'w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between bg-white',
					{ 'text-muted-foreground': !selectedOption },
					{ 'opacity-50 cursor-not-allowed': disabled },
					className
				)}
			>
				<span>{selectedOption ? selectedOption.label : placeholder}</span>
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
						{filteredOptions.length === 0 ? (
							<div className='px-4 py-2 text-sm text-gray-500'>{emptyText}</div>
						) : (
							filteredOptions.map((option) => (
								<button
									key={option.value}
									type='button'
									onClick={() => handleSelectOption(option.value)}
									className={cn(
										'w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between',
										{ 'bg-gray-50': option.value === value }
									)}
								>
									<span className='text-sm'>{option.label}</span>
									<Check
										className={cn('h-4 w-4', option.value === value ? 'opacity-100' : 'opacity-0')}
									/>
								</button>
							))
						)}
					</div>
				</div>
			)}

			{/* Overlay */}
			{open && <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />}
		</div>
	)
}
