'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const isDark = theme === 'dark';
	const toggleTheme = () => {
		setTheme(isDark ? 'light' : 'dark');
	};

	return (
		<button
			onClick={toggleTheme}
			className='relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors'
			aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}>
			{isDark ? (
				<Sun className='h-[1.2rem] w-[1.2rem] transition-all' />
			) : (
				<Moon className='h-[1.2rem] w-[1.2rem] transition-all' />
			)}
		</button>
	);
}
