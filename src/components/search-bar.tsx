import { Button } from './ui/button'
import { Input } from './ui/input'
import React from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
	searchValue: string
	onSearchChange: (value: string) => void
	onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
	onSubmit?: () => void
}

const SearchBar = ({ searchValue, onSearchChange, onKeyPress, onSubmit }: SearchBarProps) => {
	return (
		<div className='mb-4'>
			<div className='flex gap-2'>
				<div className='relative flex-1'>
					<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
					<Input
						placeholder='Tìm kiếm ...'
						value={searchValue}
						onChange={(e) => onSearchChange(e.target.value)}
						onKeyPress={(e) => onKeyPress(e)}
						className='pl-10'
					/>
				</div>
				{onSubmit && (
					<Button disabled={false} className='px-6' onClick={onSubmit}>
						<Search className='mr-2 h-4 w-4' />
						Tìm kiếm
					</Button>
				)}
			</div>
		</div>
	)
}

export default SearchBar
