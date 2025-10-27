interface PageHeaderProps {
	title: string
	renderActions: React.ReactNode
}

const PageHeader = ({ title = '', renderActions }: PageHeaderProps) => {
	return (
		<div className='mb-2 flex items-center justify-between space-y-2'>
			<h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
			<div className='flex items-center space-x-2'>{renderActions}</div>
		</div>
	)
}

export default PageHeader
