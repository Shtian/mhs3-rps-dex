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
		[Element.NonElemental]: "⬜",
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
			className={`flex flex-col gap-2 rounded-xl border border-white/10 bg-[#1a2535] p-3 transition-colors hover:border-white/20 ${ATTACK_TYPE_BORDER_COLORS[monster.defaultAttackType]} border-t-2`}
		>
			{/* Icon */}
			<div className="flex justify-center">
				<img
					src={imgSrc}
					alt={monster.name}
					className="h-16 w-16 object-contain drop-shadow-lg"
					onError={(e) => {
						(e.target as HTMLImageElement).style.opacity = "0.2";
					}}
				/>
			</div>

			{/* Name & Rank */}
			<div className="flex flex-col gap-1">
				<span className="text-center font-semibold text-sm text-white leading-tight">
					{monster.name}
				</span>
				<div className="flex justify-center">
					<StarRank rank={monster.rank} />
				</div>
			</div>

			{/* Element */}
			<div className="flex items-center justify-center gap-1">
				<ElementIcon element={monster.element} size={14} />
				<span className="text-white/60 text-xs">{monster.element}</span>
			</div>

			{/* Attack Types */}
			<div className="flex flex-col gap-1">
				<div className="flex flex-wrap justify-center gap-1">
					<AttackBadge type={monster.defaultAttackType} />
				</div>
				{monster.enragedAttackTypes.length > 0 && (
					<div className="flex flex-wrap justify-center gap-1">
						{monster.enragedAttackTypes.map((type) => (
							<span
								key={type}
								className={`rounded border px-1.5 py-0.5 text-white/60 text-xs leading-tight ${ATTACK_TYPE_COLORS[type].split(" ")[0]}/20 border-current`}
							>
								😡 {type}
							</span>
						))}
					</div>
				)}
			</div>

			{/* Weaknesses */}
			{monster.elementWeaknesses.length > 0 && (
				<div className="flex items-center justify-center gap-1">
					<span className="text-white/40 text-xs">Weak:</span>
					<div className="flex gap-1">
						{monster.elementWeaknesses.map((el) => (
							<ElementIcon key={el} element={el} size={13} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}

const sortedMonsters = [...monsters].sort((a, b) => {
	if (a.rank !== b.rank) return a.rank - b.rank;
	return a.name.localeCompare(b.name);
});

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
	return (
		<div className="min-h-screen bg-[#0f1923] text-white">
			<div className="mx-auto max-w-7xl px-4 py-8">
				{/* Header */}
				<header className="mb-8 flex flex-col gap-4">
					<div>
						<h1 className="font-bold text-2xl text-white tracking-tight">
							MHS3 RPS Dex
						</h1>
						<p className="text-sm text-white/50">
							{sortedMonsters.length} monsters
						</p>
					</div>
					<RpsLegend />
				</header>

				{/* Grid */}
				<main>
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{sortedMonsters.map((monster) => (
							<MonsterCard key={monster.name} monster={monster} />
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
