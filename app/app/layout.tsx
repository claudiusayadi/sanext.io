import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/app/components/general/theme-provider';
import { Header } from '@/app/components/layouts/header';
import { StructuredData } from '@/app/components/general/structured-data';
import Footer from '@/app/components/layouts/footer';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL('https://dovely.live'),
	title: {
		default: 'Dovely - Modern Web Development Blog',
		template: '%s | Dovely',
	},
	description:
		'Discover the latest in web development, AI, architecture, frontend technologies, and security best practices. Expert insights and tutorials for modern developers.',
	keywords: [
		'web development',
		'javascript',
		'typescript',
		'react',
		'next.js',
		'AI',
		'frontend',
		'backend',
		'security',
	],
	authors: [{ name: 'Dovely Team' }],
	creator: 'Dovely',
	publisher: 'Dovely',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://dovely.live',
		siteName: 'Dovely',
		title: 'Dovely - Modern Web Development Blog',
		description:
			'Discover the latest in web development, AI, architecture, frontend technologies, and security best practices.',
		images: [
			{
				url: '/og-image.svg',
				width: 1200,
				height: 630,
				alt: 'Dovely - Modern Web Development Blog',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Dovely - Modern Web Development Blog',
		description:
			'Discover the latest in web development, AI, architecture, frontend technologies, and security best practices.',
		images: ['/og-image.svg'],
		creator: '@dovely',
	},
	alternates: {
		canonical: 'https://dovely.live',
	},
	verification: {
		google: 'your-google-verification-code', // Add your Google Search Console verification code
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' dir='ltr'>
			<head>
				<StructuredData type='website' data={{}} />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<a
					href='#main-content'
					className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background text-foreground px-4 py-2 rounded-md z-50'>
					Skip to main content
				</a>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<div className='min-h-screen flex flex-col'>
						<Header />
						<main id='main-content' role='main' className='flex-1'>
							{children}
						</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
