import { useState } from "react";

import type { FilterState } from "../data/filterMonsters";
import type { Monster } from "../data/types";
import { AttackType, Element } from "../data/types";
import { cn } from "../lib/utils";
import { AttackTypeLabel } from "./AttackTypeIcon";
import { Button } from "./ui/button";

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

function getActiveFilterCount(filters: FilterState): number {
	return (
		filters.defaultAttackTypes.length +
		filters.enragedAttackTypes.length +
		filters.elements.length +
		filters.elementWeaknesses.length +
		filters.ranks.length
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

const ACTIVE_CHIP_CLASS =
	"border-primary bg-primary/15 text-foreground ring-2 ring-primary/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]";

const ATTACK_TYPE_ACTIVE_CLASS: Record<AttackType, string> = {
	[AttackType.Power]:
		"border-red-400/60 bg-red-500/15 text-red-100 ring-red-400/30",
	[AttackType.Speed]:
		"border-blue-400/60 bg-blue-500/15 text-blue-100 ring-blue-400/30",
	[AttackType.Technical]:
		"border-green-400/60 bg-green-500/15 text-green-100 ring-green-400/30",
};

const ATTACK_TYPE_LABELS: Record<AttackType, string> = {
	[AttackType.Power]: "Power",
	[AttackType.Speed]: "Speed",
	[AttackType.Technical]: "Technical",
};

function getActiveFilterLabels(filters: FilterState): string[] {
	return [
		...filters.defaultAttackTypes.map(
			(type) => `Default: ${ATTACK_TYPE_LABELS[type]}`,
		),
		...filters.enragedAttackTypes.map(
			(type) => `Enraged: ${ATTACK_TYPE_LABELS[type]}`,
		),
		...filters.ranks.map((rank) => `Rank: ${rank}`),
		...filters.elements.map((element) => `Element: ${element}`),
		...filters.elementWeaknesses.map((element) => `Weakness: ${element}`),
	];
}

function FilterSection({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<span className="text-muted-foreground text-xs uppercase tracking-widest">
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
	activeClass?: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<Button
			variant="outline"
			size="sm"
			onClick={onClick}
			aria-pressed={active}
			className={cn(
				"min-h-[40px] min-w-[40px] rounded-lg border-border/80 transition-colors",
				active && "font-semibold",
				active && ACTIVE_CHIP_CLASS,
				active && activeClass,
			)}
		>
			{children}
		</Button>
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const hasActiveFilters = !isFiltersEmpty(filters);
	const activeFilterCount = getActiveFilterCount(filters);
	const activeFilterLabels = getActiveFilterLabels(filters);

	return (
		<div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
			<div className="flex items-center gap-2">
				<input
					type="search"
					placeholder="Search monsters..."
					value={filters.search}
					onChange={(e) => onChange({ ...filters, search: e.target.value })}
					className={cn(
						"h-9 w-full min-w-0 rounded-3xl border border-transparent bg-input/50 px-3 py-1 text-base outline-none transition-[color,box-shadow,background-color] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
						"rounded-lg",
					)}
				/>
				<Button
					variant="outline"
					size="sm"
					onClick={() => setIsMenuOpen((open) => !open)}
					aria-expanded={isMenuOpen}
					className="shrink-0 rounded-lg"
				>
					Filters
					{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
				</Button>
			</div>

			{isMenuOpen && (
				<div className="rounded-xl border border-border bg-background/80 p-4 shadow-sm backdrop-blur-sm">
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						<FilterSection label="Default Attack">
							{Object.values(AttackType).map((type) => (
								<ToggleChip
									key={type}
									active={filters.defaultAttackTypes.includes(type)}
									activeClass={ATTACK_TYPE_ACTIVE_CLASS[type]}
									onClick={() =>
										onChange({
											...filters,
											defaultAttackTypes: toggle(
												filters.defaultAttackTypes,
												type,
											),
										})
									}
								>
									<AttackTypeLabel type={type} />
								</ToggleChip>
							))}
						</FilterSection>

						<FilterSection label="Enraged Attack">
							{Object.values(AttackType).map((type) => (
								<ToggleChip
									key={type}
									active={filters.enragedAttackTypes.includes(type)}
									activeClass={ATTACK_TYPE_ACTIVE_CLASS[type]}
									onClick={() =>
										onChange({
											...filters,
											enragedAttackTypes: toggle(
												filters.enragedAttackTypes,
												type,
											),
										})
									}
								>
									<span className="inline-flex items-center gap-1.5">
										<span aria-hidden="true">😡</span>
										<AttackTypeLabel type={type} />
									</span>
								</ToggleChip>
							))}
						</FilterSection>

						<FilterSection label="Rank">
							{([1, 2, 3, 4, 5, 6, 7] as Monster["rank"][]).map((rank) => (
								<ToggleChip
									key={rank}
									active={filters.ranks.includes(rank)}
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
				</div>
			)}

			{activeFilterLabels.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{activeFilterLabels.map((label) => (
						<span
							key={label}
							className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-foreground text-xs"
						>
							{label}
						</span>
					))}
				</div>
			)}

			<div className="flex min-h-8 items-center justify-between gap-3">
				<span className="text-muted-foreground text-xs">
					{resultCount === totalCount
						? `${totalCount} monsters`
						: `${resultCount} of ${totalCount} monsters`}
				</span>
				<Button
					variant="outline"
					size="sm"
					onClick={() => onChange(EMPTY_FILTERS)}
					disabled={!hasActiveFilters}
					className={cn(!hasActiveFilters && "invisible")}
				>
					Clear filters
				</Button>
			</div>
		</div>
	);
}
