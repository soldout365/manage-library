import * as React from 'react'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ComboboxProps {
	options: { value: string; label: string }[]
	value?: string
	onValueChange?: (value: string) => void
	placeholder?: string
	searchPlaceholder?: string
	emptyText?: string
	className?: string
	disabled?: boolean
}

export function Combobox({
	options,
	value,
	onValueChange,
	placeholder = 'Select option...',
	searchPlaceholder = 'Search option...',
	emptyText = 'No option found.',
	className,
	disabled
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false)
	const [searchValue, setSearchValue] = useState<string>('')

	const selectedOption = options.find((option) => option.value === value)

	const filteredOptions = React.useMemo(() => {
		if (!searchValue.trim()) return options
		return options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))
	}, [searchValue, options])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					type='button'
					variant='outline'
					role='combobox'
					aria-expanded={open}
					disabled={disabled}
					className={cn(
						'w-full h-11 justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors',
						'hover:bg-accent hover:text-accent-foreground',
						'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
						'disabled:cursor-not-allowed disabled:opacity-50',
						!selectedOption && 'text-muted-foreground',
						className
					)}
				>
					<span className='truncate'>{selectedOption ? selectedOption.label : placeholder}</span>
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0 shadow-lg' asChild>
				<Command shouldFilter={false}>
					<CommandInput
						placeholder={searchPlaceholder}
						className='h-10 border-none focus:ring-0'
						value={searchValue}
						onValueChange={setSearchValue}
					/>
					<CommandList className='max-h-[300px]'>
						<CommandEmpty className='py-6 text-center text-sm text-muted-foreground'>
							{emptyText}
						</CommandEmpty>
						<CommandGroup>
							{filteredOptions.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={() => {
										onValueChange?.(option.value === value ? '' : option.value)
										setOpen(false)
										setSearchValue('')
									}}
									className={cn(
										'flex items-center gap-2 px-2 py-2 cursor-pointer',
										'hover:bg-accent hover:text-accent-foreground',
										'aria-selected:bg-accent aria-selected:text-accent-foreground'
									)}
								>
									<Check
										className={cn(
											'h-4 w-4 shrink-0 transition-opacity',
											value === option.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
									<span className='flex-1 truncate'>{option.label}</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
