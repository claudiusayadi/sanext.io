import Link from 'next/link';

export function Logo() {
	return (
		<Link href="/" className="flex items-center space-x-2">
			<figure className="flex items-center space-x-2">
				<picture>
					<img
						src="/logo.svg"
						alt="Dovely Logo"
						width={32}
						height={32}
						className="h-8 w-8"
					/>
				</picture>
				<figcaption className="text-xl font-bold text-foreground">
					Dovely
				</figcaption>
			</figure>
		</Link>
	);
}
