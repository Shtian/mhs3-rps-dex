import { useState } from "react";
import { EMPTY_FILTERS, FilterBar } from "../components/FilterBar";
import { filterMonsters } from "../data/filterMonsters";
import { monsters } from "../data/monsters";
import { AttackType, Element } from "../data/types";
import type { Route } from "./+types/home";

// biome-ignore lint/correctness/noEmptyPattern: react router
export function meta({}: Route.MetaArgs) {
	return [
		{ title: "MHS3 RPS Dex" },
		{ name: "description", content: "Monster Hunter Stories 3 RPS Dex" },
	];
}

const ATTACK_TYPE_COLORS: Record<AttackType, string> = {
	[AttackType.Power]: "bg-red-700 text-red-100",
	[AttackType.Speed]: "bg-blue-700 text-blue-100",
	[AttackType.Technical]: "bg-green-700 text-green-100",
};

const ATTACK_TYPE_BORDER_COLORS: Record<AttackType, string> = {
	[AttackType.Power]: "border-red-500",
	[AttackType.Speed]: "border-blue-500",
	[AttackType.Technical]: "border-green-500",
};

function ElementIcon({
	element,
	size = 16,
}: {
	element: Element;
	size?: number;
}) {
	const icons: Record<Element, string> = {
		[Element.Fire]: "🔥",
		[Element.Water]: "💧",
		[Element.Ice]: "❄️",
		[Element.Thunder]: "⚡",
		[Element.Dragon]: "🐉",
		[Element.NonElemental]: "⚪",
	};
	return (
		<span style={{ fontSize: size }} title={element}>
			{icons[element]}
		</span>
	);
}

function AttackBadge({ type }: { type: AttackType }) {
	return (
		<span
			className={`rounded px-1.5 py-0.5 font-semibold text-xs leading-tight ${ATTACK_TYPE_COLORS[type]}`}
		>
			{type}
		</span>
	);
}

function StarRank({ rank }: { rank: number }) {
	return (
		<div className="flex gap-0.5">
			{Array.from({ length: rank }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static stars
				<span key={i} className="text-xs text-yellow-400 leading-none">
					★
				</span>
			))}
			{Array.from({ length: 7 - rank }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static stars
				<span key={i} className="text-white/10 text-xs leading-none">
					★
				</span>
			))}
		</div>
	);
}

function MonsterCard({ monster }: { monster: (typeof monsters)[0] }) {
	const imgSrc = `/monsters/${monster.imageFilename}`;
	return (
		<div
			className={`group overflow-hidden rounded-xl border border-white/10 bg-[#1a2535] transition-all duration-200 hover:border-white/25 ${ATTACK_TYPE_BORDER_COLORS[monster.defaultAttackType]} border-t-2`}
		>
			{/* Header: image + name + default attack */}
			<div className="p-3 pb-2.5">
				<div className="flex items-center gap-3">
					<div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
						<img
							src={imgSrc}
							alt={monster.name}
							className="h-full w-full object-contain drop-shadow-lg"
							onError={(e) => {
								const img = e.target as HTMLImageElement;
								if (!img.src.endsWith("placeholder.png")) {
									img.src = "/monsters/placeholder.png";
								}
							}}
						/>
					</div>
					<h3 className="min-w-0 flex-1 truncate font-bold text-sm text-white">
						{monster.name}
					</h3>
					<AttackBadge type={monster.defaultAttackType} />
				</div>
			</div>

			{/* Enraged attacks */}
			<div className="border-t border-white/5 bg-red-950/20 px-3 py-1.5">
				<div className="flex items-center gap-2">
					<span className="font-medium text-[10px] text-red-400/70 uppercase tracking-wider">
						Enraged
					</span>
					<div className="flex gap-1">
						{monster.enragedAttackTypes.length > 0 ? (
							monster.enragedAttackTypes.map((type) => (
								<AttackBadge key={type} type={type} />
							))
						) : (
							<span className="text-white/20 text-xs">—</span>
						)}
					</div>
				</div>
			</div>

			{/* Element & weaknesses */}
			<div className="space-y-2 border-t border-white/5 px-3 py-2.5">
				<div className="flex items-center gap-2">
					<span className="w-14 font-medium text-[10px] text-white/40 uppercase tracking-wider">
						Element
					</span>
					<div className="flex items-center gap-1">
						<ElementIcon element={monster.element} size={13} />
						<span className="text-white/70 text-xs">{monster.element}</span>
					</div>
				</div>
				{monster.elementWeaknesses.length > 0 && (
					<div className="flex items-center gap-2">
						<span className="w-14 font-medium text-[10px] text-white/40 uppercase tracking-wider">
							Weak to
						</span>
						<div className="flex gap-1">
							{monster.elementWeaknesses.map((el) => (
								<ElementIcon key={el} element={el} size={13} />
							))}
						</div>
					</div>
				)}
			</div>

			{/* Rank */}
			<div className="flex items-center justify-between border-t border-white/5 bg-white/[0.03] px-3 py-2">
				<span className="font-medium text-[10px] text-white/40 uppercase tracking-wider">
					Rank
				</span>
				<StarRank rank={monster.rank} />
			</div>
		</div>
	);
}

function RpsLegend() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#1a2535] px-4 py-3 text-sm">
			<span className="text-white/50 text-xs uppercase tracking-widest">
				RPS
			</span>
			<div className="flex items-center gap-1.5">
				<span className="rounded bg-red-700/80 px-2 py-0.5 font-semibold text-red-100 text-xs">
					Power
				</span>
				<span className="text-white/40 text-xs">beats</span>
				<span className="rounded bg-green-700/80 px-2 py-0.5 font-semibold text-green-100 text-xs">
					Technical
				</span>
			</div>
			<div className="flex items-center gap-1.5">
				<span className="rounded bg-green-700/80 px-2 py-0.5 font-semibold text-green-100 text-xs">
					Technical
				</span>
				<span className="text-white/40 text-xs">beats</span>
				<span className="rounded bg-blue-700/80 px-2 py-0.5 font-semibold text-blue-100 text-xs">
					Speed
				</span>
			</div>
			<div className="flex items-center gap-1.5">
				<span className="rounded bg-blue-700/80 px-2 py-0.5 font-semibold text-blue-100 text-xs">
					Speed
				</span>
				<span className="text-white/40 text-xs">beats</span>
				<span className="rounded bg-red-700/80 px-2 py-0.5 font-semibold text-red-100 text-xs">
					Power
				</span>
			</div>
		</div>
	);
}

export default function Home() {
	const [filters, setFilters] = useState(EMPTY_FILTERS);
	const filteredMonsters = filterMonsters(monsters, filters);

	return (
		<div className="min-h-screen bg-[#0f1923] text-white">
			<div className="mx-auto max-w-7xl px-4 py-8">
				{/* Header */}
				<header className="mb-6 flex flex-col gap-4">
					<div>
						<h1 className="font-bold text-2xl text-white tracking-tight">
							MHS3 RPS Dex
						</h1>
					</div>
					<RpsLegend />
				</header>

				{/* Filter Bar */}
				<div className="mb-6">
					<FilterBar
						filters={filters}
						onChange={setFilters}
						resultCount={filteredMonsters.length}
						totalCount={monsters.length}
					/>
				</div>

				{/* Grid */}
				<main>
					{filteredMonsters.length === 0 ? (
						<p className="py-16 text-center text-sm text-white/40">
							No monsters match your filters.
						</p>
					) : (
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
