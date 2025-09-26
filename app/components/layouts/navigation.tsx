import { ThemeToggle } from '@/app/components/general/theme-toggle';
import Link from 'next/link';

export function Navigation() {
	return (
		<nav role='navigation' aria-label='Main navigation'>
			<ul className='flex items-center space-x-6'>
				<li>
					<Link href='/' className='text-foreground hover:text-foreground/80 transition-colors font-medium'>
						Posts
					</Link>
				</li>
				<li>
					<ThemeToggle />
				</li>
			</ul>
		</nav>
	);
}
