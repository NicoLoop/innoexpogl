'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';

export function Header({ onOpenNexus, onOpenRegister }: { onOpenNexus?: () => void; onOpenRegister?: () => void }) {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{
			label: 'Features',
			href: '#features',
		},
		{
			label: 'Projects',
			href: '#projects',
		},
		{
			label: 'About',
			href: '#about',
		},
	];

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('sticky top-0 z-50 w-full border-b border-transparent transition-colors', {
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg':
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
				<div className="flex items-center gap-2.5">
					<WordmarkIcon className="h-8 w-auto text-white mt-[-2px]" />
					<span className="font-display font-bold text-xl text-white tracking-tight italic">Expo<span className="text-zinc-500 not-italic">GL</span></span>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					{links.map((link) => (
						<a key={link.label} className={buttonVariants({ variant: 'ghost' })} href={link.href}>
							{link.label}
						</a>
					))}
					<div className="w-px h-6 bg-border mx-2" />
					<Button variant="ghost" size="sm" onClick={onOpenNexus}>Talk to AI</Button>
					<Button size="sm" onClick={onOpenRegister}>Sign Up</Button>
				</div>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => setOpen(!open)}
					className="md:hidden h-9 w-9"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>
			<MobileMenu open={open} className="flex flex-col justify-between gap-2">
				<div className="grid gap-y-2">
					{links.map((link) => (
						<a
							key={link.label}
							onClick={() => setOpen(false)}
							className={buttonVariants({
								variant: 'ghost',
								className: 'justify-start text-lg',
							})}
							href={link.href}
						>
							{link.label}
						</a>
					))}
				</div>
				<div className="flex flex-col gap-3 pt-6 border-t">
					<Button variant="outline" className="w-full bg-transparent" onClick={onOpenNexus}>
						Talk to AI
					</Button>
					<Button className="w-full" onClick={onOpenRegister}>Sign Up</Button>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!open || !mounted) return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
				'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'size-full p-6',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

export const WordmarkIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="132 265 343 140" fill="currentColor" {...props}>
    <g transform="translate(0.000000,600.000000) scale(0.050000,-0.050000)" stroke="none">
      <path d="M2640 6700 l0 -240 240 0 240 0 0 240 0 240 -240 0 -240 0 0 -240z"/>
      <path d="M5935 6694 l-315 -184 5 -1199 5 -1199 320 -185 320 -186 10 790 10 790 330 190 330 189 5 -785 6 -785 243 -140 c134 -77 287 -165 340 -195 l96 -56 -1 1186 0 1185 -338 193 -338 193 -342 -196 -341 -197 0 388 c0 214 -7 388 -15 388 -8 -1 -157 -84 -330 -185z"/>
      <path d="M4335 6216 l-975 -563 0 -527 0 -526 -120 0 -120 0 0 790 0 790 -240 0 -240 0 0 -1030 0 -1030 365 -1 365 -1 320 -186 320 -186 5 762 6 762 313 180 c172 99 320 183 329 187 10 3 17 -336 17 -753 l0 -760 330 -190 330 -190 0 1518 c0 835 -7 1518 -15 1517 -8 0 -454 -254 -990 -563z"/>
      <path d="M8284 6482 c-155 -54 -244 -133 -324 -292 l-70 -139 0 -911 c0 -1023 2 -1039 147 -1232 209 -276 732 -312 1008 -69 197 173 218 308 211 1356 l-6 856 -70 140 c-146 290 -534 416 -896 291z m359 -500 l47 -38 0 -844 0 -844 -47 -38 c-63 -50 -95 -48 -154 11 l-49 49 0 822 0 822 49 49 c59 59 91 61 154 11z"/>
    </g>
  </svg>
);
