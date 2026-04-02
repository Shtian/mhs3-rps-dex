import type { AttackType, Element, Monster } from "./types";

export type FilterState = {
	search: string;
	defaultAttackTypes: AttackType[];
	enragedAttackTypes: AttackType[];
	elements: Element[];
	elementWeaknesses: Element[];
	ranks: Monster["rank"][];
};

export function filterMonsters(
	monsters: Monster[],
	filters: FilterState,
): Monster[] {
	const {
		search,
		defaultAttackTypes,
		enragedAttackTypes,
		elements,
		elementWeaknesses,
		ranks,
	} = filters;

	const query = search.trim().toLowerCase();

	const result = monsters.filter((m) => {
		if (query && !m.name.toLowerCase().includes(query)) return false;
		if (
			defaultAttackTypes.length > 0 &&
			!defaultAttackTypes.includes(m.defaultAttackType)
		)
			return false;
		if (
			enragedAttackTypes.length > 0 &&
			!enragedAttackTypes.some((t) => m.enragedAttackTypes.includes(t))
		)
			return false;
		if (elements.length > 0 && !elements.includes(m.element)) return false;
		if (
			elementWeaknesses.length > 0 &&
			!elementWeaknesses.some((w) => m.elementWeaknesses.includes(w))
		)
			return false;
		if (ranks.length > 0 && !ranks.includes(m.rank)) return false;
		return true;
	});

	result.sort((a, b) => a.name.localeCompare(b.name));

	return result;
}
