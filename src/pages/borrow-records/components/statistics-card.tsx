import { AlertTriangle, BookOpen, Calendar, CircleCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useStatBorrowRecord } from '@/hooks/borrow-records/use-stat-borrow-record'

interface StatisticCardProps {
	id: number
	title: string
	icon: React.ElementType
	value?: number
	desc: string
	className?: string
}

const StatisticsCard = () => {
	const { data: statBorrowRecord } = useStatBorrowRecord()

	const statistics: StatisticCardProps[] = [
		{
			id: 1,
			title: 'Đang mượn',
			icon: BookOpen,
			value: statBorrowRecord?.borrowed,
			desc: 'Số lượng sách đang mượn',
			className: 'text-blue-500'
		},
		{
			id: 2,
			title: 'Đã trả',
			icon: CircleCheck,
			value: statBorrowRecord?.returned,
			desc: 'Sách đã được trả',
			className: 'text-green-500'
		},
		{
			id: 3,
			title: 'Đã gia hạn',
			icon: Calendar,
			value: statBorrowRecord?.renewed,
			desc: 'Yêu cầu đã được gia hạn',
			className: 'text-purple-500'
		},
		{
			id: 4,
			title: 'Quá hạn',
			icon: AlertTriangle,
			value: statBorrowRecord?.overdue,
			desc: 'Sách mượn quá hạn',
			className: 'text-red-500'
		}
	]

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
			{statistics.map((stat) => (
				<StatisticCard key={stat.id} stat={stat} />
			))}
		</div>
	)
}

export default StatisticsCard

const StatisticCard = ({ stat }: { stat: StatisticCardProps }) => {
	return (
		<Card>
			<CardHeader className='flex items-center justify-between '>
				<CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
				<span>
					<stat.icon size={16} className={stat.className} />
				</span>
			</CardHeader>

			<CardContent>
				<div className='text-2xl font-bold'>{stat.value}</div>
				<span className='text-xs text-muted-foreground'>{stat.desc}</span>
			</CardContent>
		</Card>
	)
}
