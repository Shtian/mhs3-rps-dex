import type { FilterState } from "../data/filterMonsters";
import type { Monster } from "../data/types";
import { AttackType, Element } from "../data/types";

export const EMPTY_FILTERS: FilterState = {
	search: "",
	defaultAttackTypes: [],
	enragedAttackTypes: [],
	elements: [],
	elementWeaknesses: [],
	ranks: [],
};

function isFiltersEmpty(filters: FilterState): boolean {
	return (
		filters.search === "" &&
		filters.defaultAttackTypes.length === 0 &&
		filters.enragedAttackTypes.length === 0 &&
		filters.elements.length === 0 &&
		filters.elementWeaknesses.length === 0 &&
		filters.ranks.length === 0
	);
}

function toggle<T>(arr: T[], item: T): T[] {
	return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

const ELEMENT_ICONS: Record<Element, string> = {
	[Element.Fire]: "🔥",
	[Element.Water]: "💧",
	[Element.Ice]: "❄️",
	[Element.Thunder]: "⚡",
	[Element.Dragon]: "🐉",
	[Element.NonElemental]: "⚪",
};

const ATTACK_TYPE_ACTIVE_COLORS: Record<AttackType, string> = {
	[AttackType.Power]: "bg-red-700 text-red-100 border-transparent",
	[AttackType.Speed]: "bg-blue-700 text-blue-100 border-transparent",
	[AttackType.Technical]: "bg-green-700 text-green-100 border-transparent",
};

function FilterSection({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<span className="text-white/40 text-xs uppercase tracking-widest">
				{label}
			</span>
			<div className="flex flex-wrap gap-1.5">{children}</div>
		</div>
	);
}

function ToggleChip({
	active,
	activeClass,
	onClick,
	children,
}: {
	active: boolean;
	activeClass: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`min-h-[40px] min-w-[40px] rounded-lg border px-2.5 py-1.5 font-medium text-xs transition-colors ${
				active
					? activeClass
					: "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80"
			}`}
		>
			{children}
		</button>
	);
}

type FilterBarProps = {
	filters: FilterState;
	onChange: (filters: FilterState) => void;
	resultCount: number;
	totalCount: number;
};

export function FilterBar({
	filters,
	onChange,
	resultCount,
	totalCount,
}: FilterBarProps) {
	const hasActiveFilters = !isFiltersEmpty(filters);

	return (
		<div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#1a2535] p-4">
			{/* Search */}
			<input
				type="search"
				placeholder="Search monsters..."
				value={filters.search}
				onChange={(e) => onChange({ ...filters, search: e.target.value })}
				className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
			/>

			{/* Filter sections */}
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				<FilterSection label="Default Attack">
					{Object.values(AttackType).map((type) => (
						<ToggleChip
							key={type}
							active={filters.defaultAttackTypes.includes(type)}
							activeClass={ATTACK_TYPE_ACTIVE_COLORS[type]}
							onClick={() =>
								onChange({
									...filters,
									defaultAttackTypes: toggle(filters.defaultAttackTypes, type),
								})
							}
						>
							{type}
						</ToggleChip>
					))}
				</FilterSection>

				<FilterSection label="Enraged Attack">
					{Object.values(AttackType).map((type) => (
						<ToggleChip
							key={type}
							active={filters.enragedAttackTypes.includes(type)}
							activeClass={ATTACK_TYPE_ACTIVE_COLORS[type]}
							onClick={() =>
								onChange({
									...filters,
									enragedAttackTypes: toggle(filters.enragedAttackTypes, type),
								})
							}
						>
							😡 {type}
						</ToggleChip>
					))}
				</FilterSection>

				<FilterSection label="Rank">
					{([1, 2, 3, 4, 5, 6, 7] as Monster["rank"][]).map((rank) => (
						<ToggleChip
							key={rank}
							active={filters.ranks.includes(rank)}
							activeClass="bg-yellow-600/80 text-yellow-100 border-transparent"
							onClick={() =>
								onChange({ ...filters, ranks: toggle(filters.ranks, rank) })
							}
						>
							★{rank}
						</ToggleChip>
					))}
				</FilterSection>

				<FilterSection label="Element">
					{Object.values(Element).map((el) => (
						<ToggleChip
							key={el}
							active={filters.elements.includes(el)}
							activeClass="bg-white/20 text-white border-transparent"
							onClick={() =>
								onChange({
									...filters,
									elements: toggle(filters.elements, el),
								})
							}
						>
							{ELEMENT_ICONS[el]} {el}
						</ToggleChip>
					))}
				</FilterSection>

				<FilterSection label="Weakness">
					{Object.values(Element).map((el) => (
						<ToggleChip
							key={el}
							active={filters.elementWeaknesses.includes(el)}
							activeClass="bg-white/20 text-white border-transparent"
							onClick={() =>
								onChange({
									...filters,
									elementWeaknesses: toggle(filters.elementWeaknesses, el),
								})
							}
						>
							{ELEMENT_ICONS[el]} {el}
						</ToggleChip>
					))}
				</FilterSection>
			</div>

			{/* Footer: count + clear */}
			<div className="flex items-center justify-between">
				<span className="text-white/50 text-xs">
					{resultCount === totalCount
						? `${totalCount} monsters`
						: `${resultCount} of ${totalCount} monsters`}
				</span>
				{hasActiveFilters && (
					<button
						type="button"
						onClick={() => onChange(EMPTY_FILTERS)}
						className="rounded-lg border border-white/10 px-3 py-1.5 text-white/60 text-xs transition-colors hover:border-white/30 hover:text-white"
					>
						Clear filters
					</button>
				)}
			</div>
		</div>
	);
}
