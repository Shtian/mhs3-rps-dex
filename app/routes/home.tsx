import { useState } from "react";

import { EMPTY_FILTERS, FilterBar } from "../components/FilterBar";
import { MonsterCard } from "../components/MonsterCard";
import { filterMonsters } from "../data/filterMonsters";
import { monsters } from "../data/monsters";
import type { Route } from "./+types/home";

const SITE_URL = "https://mhs3-rps-dex.vercel.app";
const DESCRIPTION =
	"Browse and filter all monsters in Monster Hunter Stories 3 by attack type (Power, Speed, Technical), element, and rank. Your quick-reference Kinship Stone companion.";

// biome-ignore lint/correctness/noEmptyPattern: react router
export function meta({}: Route.MetaArgs) {
	return [
		{ title: "MHS3 RPS Dex — Monster Hunter Stories 3 Monster Reference" },
		{ name: "description", content: DESCRIPTION },
		// Open Graph
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: SITE_URL },
		{
			property: "og:title",
			content: "MHS3 RPS Dex — Monster Hunter Stories 3 Monster Reference",
		},
		{ property: "og:description", content: DESCRIPTION },
		{ property: "og:site_name", content: "MHS3 RPS Dex" },
		// Twitter Card
		{ name: "twitter:card", content: "summary" },
		{
			name: "twitter:title",
			content: "MHS3 RPS Dex — Monster Hunter Stories 3 Monster Reference",
		},
		{ name: "twitter:description", content: DESCRIPTION },
		// Canonical
		{ tagName: "link", rel: "canonical", href: SITE_URL },
		// JSON-LD
		{
			"script:ld+json": {
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "MHS3 RPS Dex",
				description: DESCRIPTION,
				url: SITE_URL,
			},
		},
	];
}

export default function Home() {
	const [filters, setFilters] = useState(EMPTY_FILTERS);
	const filteredMonsters = filterMonsters(monsters, filters);

	return (
		<div className="min-h-screen">
			<div className="mx-auto max-w-7xl px-4 py-8">
				<header className="mb-6 flex flex-col gap-4">
					<div>
						<h1 className="font-bold font-heading text-2xl text-foreground tracking-tight">
							MHS3 RPS Dex
						</h1>
					</div>
				</header>

				<div className="mb-6">
					<FilterBar
						filters={filters}
						onChange={setFilters}
						resultCount={filteredMonsters.length}
						totalCount={monsters.length}
					/>
				</div>

				<main>
					{filteredMonsters.length === 0 ? (
						<p className="py-16 text-center text-muted-foreground text-sm">
							No monsters match your filters.
						</p>
					) : (
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
							{filteredMonsters.map((monster) => (
								<MonsterCard key={monster.name} monster={monster} />
							))}
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
