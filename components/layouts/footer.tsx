import Link from 'next/link';

function Footer() {
	return (
		<footer role='contentinfo' className='border-t border-border/40 py-6 md:py-0 mt-auto'>
			<div className='container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4'>
				<p className='text-sm text-muted-foreground'>© 2024 Dovely. All rights reserved.</p>
				<nav aria-label='Footer navigation'>
					<ul className='flex items-center space-x-4 text-sm text-muted-foreground'>
						<li>
							<Link href='/privacy' className='hover:text-foreground transition-colors'>
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link href='/terms' className='hover:text-foreground transition-colors'>
								Terms of Service
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
}

export default Footer;
