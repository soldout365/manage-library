import { useEffect, useState } from 'react'

import { useQueryParams } from '@/hooks/useQueryParam'

interface UseSearchProps {
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	onSubmit?: (searchValue: string) => void
}

export const useSearch = ({ onKeyPress, onSubmit }: UseSearchProps) => {
	const params = useQueryParams()
	const { search } = params

	const [searchValue, setSearchValue] = useState<string>('')

	useEffect(() => {
		if (search) {
			setSearchValue(search as string)
		}
	}, [search])

	const handleSearchChange = (value: string) => {
		setSearchValue(value)
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		onKeyPress?.(e)
	}

	const handleSubmit = () => {
		onSubmit?.(searchValue)
	}

	return { searchValue, handleSearchChange, handleKeyPress, handleSubmit }
}
