import { Logo } from './logo';
import { Navigation } from './navigation';

export function Header() {
	return (
		<header
			className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
			role='banner'>
			<div className='container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4'>
				<Logo />
				<Navigation />
			</div>
		</header>
	);
}
