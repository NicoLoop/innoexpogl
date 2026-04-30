import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RocketIcon, ArrowRightIcon, PhoneCallIcon } from "lucide-react";
import { LogoCloud } from "@/components/ui/logo-cloud-3";

export function HeroSection({ onOpenRegister }: { onOpenRegister?: () => void }) {
	return (
		<section className="mx-auto w-full max-w-5xl px-4">
			{/* Top Shades */}
			<div
				aria-hidden="true"
				className="absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block pointer-events-none"
			>
				<div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,rgba(0,0,0,0.08),transparent)] contain-strict" />
			</div>

			{/* X Bold Faded Borders */}
			<div
				aria-hidden="true"
				className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block pointer-events-none"
			>
				<div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
				<div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
			</div>

			{/* main content */}

			<div className="relative flex flex-col items-center justify-center gap-5 pt-32 pb-30">
				{/* X Content Faded Borders */}
				<div
					aria-hidden="true"
					className="absolute inset-0 -z-1 size-full overflow-hidden pointer-events-none"
				>
					<div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-border to-border md:left-8" />
					<div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-border to-border md:right-8" />
					<div className="absolute inset-y-0 left-8 w-px bg-gradient-to-b from-transparent via-border/50 to-border/50 md:left-12" />
					<div className="absolute inset-y-0 right-8 w-px bg-gradient-to-b from-transparent via-border/50 to-border/50 md:right-12" />
				</div>

				<a
					className={cn(
						"group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow",
						"animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards transition-all delay-500 duration-500 ease-out"
					)}
					href="#link"
				>
					<RocketIcon className="size-3 text-muted-foreground" />
					<span className="text-xs">Dare to think different</span>
					<span className="block h-5 border-l" />

					<ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1" />
				</a>

				<h1
					className={cn(
						"animate-in fade-in slide-in-from-bottom-10 text-balance fill-mode-backwards text-center text-4xl tracking-tight delay-100 duration-500 ease-out md:text-5xl lg:text-6xl font-bold font-display"
					)}
				>
					Discover Your Potential  <br /> in Science
				</h1>

				<p className="animate-in fade-in slide-in-from-bottom-10 mx-auto max-w-md fill-mode-backwards text-center text-base text-foreground/80 tracking-wider delay-200 duration-500 ease-out sm:text-lg md:text-xl">
					We help students explore, learn, and grow through mentorship,  <br /> hands-on sessions, and real opportunities to showcase their ideas.
					lead
				</p>

				<div className="animate-in fade-in slide-in-from-bottom-10 flex flex-row flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out z-20">
					<Button onClick={() => document.getElementById('submit')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full" size="lg" variant="secondary">
						<PhoneCallIcon className="size-4 mr-2" />{" "}
						Show Us your Talent
					</Button>
					<Button className="rounded-full " size="lg" onClick={onOpenRegister}>
						Get started{" "}
						<ArrowRightIcon 
						className="size-4 ms-2" />
					</Button>
				</div>
			</div>
		</section>
	);
}

export function LogosSection() {
	return (
		<section className="relative space-y-4 border-t pt-12 pb-16">
			<h2 className="text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
				Trusted by our<span className="text-foreground"> Authorized Partners</span>
			</h2>
			<div className="relative z-10 mx-auto max-w-4xl">
				<LogoCloud logos={logos} />
			</div>
		</section>
	);
}

const logos = [
{
	src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/A2i_logo.png/512px-A2i_logo.png",
	alt: "a2i (Aspire to Innovate) Bangladesh",
},
{
	src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/UNICEF_Logo.png/512px-UNICEF_Logo.png",
	alt: "UNICEF",
},
{
	src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/BRAC_logo.svg/512px-BRAC_logo.svg.png",
	alt: "BRAC",
},
{
	src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Save_the_Children_logo.svg/512px-Save_the_Children_logo.svg.png",
	alt: "Save the Children",
},
{
	src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/World_Bank_Group_logo.svg/512px-World_Bank_Group_logo.svg.png",
	alt: "World Bank",
},
{
	src: "http://www.educationboardresults.gov.bd/images/bd_logo.png",
	alt: "Bangladesh Education Board",
},
{
	src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Ministry_of_Education_Bangladesh_logo.png/512px-Ministry_of_Education_Bangladesh_logo.png",
	alt: "Ministry of Education Bangladesh",
},
{
	src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Bangladesh_Open_University_logo.svg/512px-Bangladesh_Open_University_logo.svg.png",
	alt: "Bangladesh Open University",
},
];


