import Actions from './components/actions'
import PageHeader from '@/components/page-header'
import StatisticsCard from './components/statistics-card'
import Tabs from './tab'

const BorrowRecords = () => {
	return (
		<>
			<PageHeader title='Quản lý mượn sách' renderActions={<></>} />

			<div className='space-y-4'>
				<StatisticsCard />

				<Actions />

				<Tabs />
			</div>
		</>
	)
}

export default BorrowRecords
