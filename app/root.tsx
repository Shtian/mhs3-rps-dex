import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
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
		<footer className="mt-8 border-border border-t py-4 text-center text-muted-foreground text-xs">
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
