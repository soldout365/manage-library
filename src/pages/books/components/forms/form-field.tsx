import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { Control, ControllerRenderProps } from 'react-hook-form'

import type { BookSchemeType } from './book-form'

interface FormFieldProps {
	// Comp: (field: ControllerRenderProps<BookSchemeType>) => React.ReactNode;
	children: (field: ControllerRenderProps<BookSchemeType>) => React.ReactNode
	control: Control<BookSchemeType>
	name: keyof BookSchemeType
	label: string
}

const FormFieldComp = ({ children, control, name, label }: FormFieldProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel htmlFor={String(name)} className='block text-sm font-medium text-gray-700 mb-1'>
						{label}
					</FormLabel>
					<FormControl>{children(field)}</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default FormFieldComp
