import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
	links: {
		title: string;
		href: string;
		isActive: boolean;
		disabled?: boolean;
	}[];
}

export function TopNav({ className, links, ...props }: TopNavProps) {
	return (
		<>
			<div className="md:hidden">
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Button size="icon" variant="outline">
							<Menu />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="bottom" align="start">
						{links.map(({ title, href, isActive }) => (
							<DropdownMenuItem key={`${title}-${href}`} asChild>
								<Link
									to={href}
									className={!isActive ? 'text-muted-foreground' : ''}
								>
									{title}
								</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<nav
				className={cn(
					'hidden items-center space-x-4 md:flex lg:space-x-6',
					className
				)}
				{...props}
			>
				{links.map(({ title, href, isActive }) => (
					<Link
						key={`${title}-${href}`}
						to={href}
						className={`hover:text-primary text-sm font-medium transition-colors ${
							isActive ? '' : 'text-muted-foreground'
						}`}
					>
						{title}
					</Link>
				))}
			</nav>
		</>
	);
}
