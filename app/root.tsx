import { GithubIcon as HugeGithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { buttonVariants } from "./components/ui/button";
import { cn } from "./lib/utils";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#09090b" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

function Footer() {
	return (
		<footer className="mt-8 border-border border-t py-4 text-muted-foreground text-xs">
			<div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
				<p className="text-center sm:text-left">
					Monster icons from{" "}
					<a
						href="https://monsterhunter.fandom.com"
						target="_blank"
						rel="noreferrer"
						className="underline hover:text-foreground"
					>
						Monster Hunter Wiki
					</a>{" "}
					licensed under{" "}
					<a
						href="https://creativecommons.org/licenses/by-sa/3.0/"
						target="_blank"
						rel="noreferrer"
						className="underline hover:text-foreground"
					>
						CC BY-SA 3.0
					</a>
					. Not affiliated with or endorsed by Capcom.
				</p>
				<a
					href="https://github.com/Shtian/mhs3-rps-dex"
					target="_blank"
					rel="noreferrer"
					aria-label="View repository on GitHub"
					className={cn(
						buttonVariants({ variant: "ghost", size: "icon-sm" }),
						"self-center text-muted-foreground hover:text-foreground sm:self-auto",
					)}
				>
					<HugeiconsIcon icon={HugeGithubIcon} size={16} strokeWidth={1.8} />
				</a>
			</div>
		</footer>
	);
}

export default function App() {
	return (
		<>
			<Outlet />
			<Footer />
		</>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="container mx-auto p-4 pt-16">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full overflow-x-auto p-4">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
