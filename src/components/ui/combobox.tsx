import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
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
	disabled = false
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false)
	const [searchValue, setSearchValue] = useState<string>('')

	const selectedOption = options.find((option) => option.value === value)

	const filteredOptions = React.useMemo(() => {
		if (!searchValue.trim()) return options

		return options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))
	}, [searchValue, options])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger>
				<Button
					type='button' // ← THÊM DÒNG NÀY - QUAN TRỌNG!
					variant='outline'
					role='combobox'
					aria-expanded={open}
					disabled={disabled}
					className={cn(
						'w-full !h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary justify-between',
						{ 'text-muted-foreground': !selectedOption },
						className
					)}
				>
					{selectedOption ? selectedOption.label : placeholder}
					<ChevronsUpDown className='opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0' align='start'>
				<Command>
					<CommandInput
						placeholder={searchPlaceholder}
						className='h-9'
						value={searchValue}
						onValueChange={setSearchValue}
					/>
					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{filteredOptions.map((option) => (
								<CommandItem
									key={option.value}
									value={option.label}
									onSelect={() => {
										onValueChange?.(option.value)
										setOpen(false)
										setSearchValue('')
									}}
								>
									{option.label}
									<Check
										className={cn('ml-auto', value === option.value ? 'opacity-100' : 'opacity-0')}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
