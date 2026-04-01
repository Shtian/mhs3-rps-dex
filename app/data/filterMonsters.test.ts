import { describe, expect, it } from "vitest";
import { type FilterState, filterMonsters } from "./filterMonsters";
import { monsters } from "./monsters";
import { AttackType, Element } from "./types";

const emptyFilters: FilterState = {
	search: "",
	defaultAttackTypes: [],
	enragedAttackTypes: [],
	elements: [],
	elementWeaknesses: [],
	ranks: [],
};

describe("filterMonsters", () => {
	describe("text search", () => {
		it("returns all monsters when search is empty", () => {
			const result = filterMonsters(monsters, emptyFilters);
			expect(result).toHaveLength(monsters.length);
		});

		it("matches by exact name", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				search: "Velocidrome",
			});
			expect(result).toHaveLength(1);
			expect(result[0].name).toBe("Velocidrome");
		});

		it("matches by partial name", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				search: "Kut",
			});
			expect(result.map((m) => m.name)).toEqual(
				expect.arrayContaining(["Yian Kut-Ku", "Blue Yian Kut-Ku"]),
			);
			expect(result).toHaveLength(2);
		});

		it("is case-insensitive", () => {
			const lower = filterMonsters(monsters, {
				...emptyFilters,
				search: "velocidrome",
			});
			const upper = filterMonsters(monsters, {
				...emptyFilters,
				search: "VELOCIDROME",
			});
			const mixed = filterMonsters(monsters, {
				...emptyFilters,
				search: "vElOcIdRoMe",
			});
			expect(lower).toHaveLength(1);
			expect(upper).toHaveLength(1);
			expect(mixed).toHaveLength(1);
		});

		it("returns empty array when no name matches", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				search: "zzznomatch",
			});
			expect(result).toHaveLength(0);
		});

		it("trims whitespace from search", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				search: "  Zinogre  ",
			});
			expect(result.some((m) => m.name === "Zinogre")).toBe(true);
		});
	});

	describe("filter by default attack type", () => {
		it("returns only monsters with the specified default attack type", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				defaultAttackTypes: [AttackType.Power],
			});
			expect(result.length).toBeGreaterThan(0);
			expect(
				result.every((m) => m.defaultAttackType === AttackType.Power),
			).toBe(true);
		});

		it("supports multiple default attack types (OR logic)", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				defaultAttackTypes: [AttackType.Power, AttackType.Speed],
			});
			expect(
				result.every(
					(m) =>
						m.defaultAttackType === AttackType.Power ||
						m.defaultAttackType === AttackType.Speed,
				),
			).toBe(true);
		});

		it("returns all monsters when filter is empty", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				defaultAttackTypes: [],
			});
			expect(result).toHaveLength(monsters.length);
		});
	});

	describe("filter by enraged attack type", () => {
		it("includes monster if any enraged type matches", () => {
			// Lagiacrus has enragedAttackTypes: [Speed, Technical]
			const result = filterMonsters(monsters, {
				...emptyFilters,
				enragedAttackTypes: [AttackType.Speed],
			});
			expect(result.some((m) => m.name === "Lagiacrus")).toBe(true);
		});

		it("excludes monsters with 0 enraged types when filter is active", () => {
			// Gore Magala, Gammoth, etc. have no enraged types
			const result = filterMonsters(monsters, {
				...emptyFilters,
				enragedAttackTypes: [AttackType.Power],
			});
			const goreMagala = monsters.find((m) => m.name === "Gore Magala")!;
			expect(goreMagala.enragedAttackTypes).toHaveLength(0);
			expect(result.some((m) => m.name === "Gore Magala")).toBe(false);
		});

		it("matches monster with 2 enraged types if either matches", () => {
			// Namielle has [Speed, Power]
			const bySpeed = filterMonsters(monsters, {
				...emptyFilters,
				enragedAttackTypes: [AttackType.Speed],
			});
			const byPower = filterMonsters(monsters, {
				...emptyFilters,
				enragedAttackTypes: [AttackType.Power],
			});
			expect(bySpeed.some((m) => m.name === "Namielle")).toBe(true);
			expect(byPower.some((m) => m.name === "Namielle")).toBe(true);
		});

		it("returns all monsters when filter is empty", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				enragedAttackTypes: [],
			});
			expect(result).toHaveLength(monsters.length);
		});
	});

	describe("filter by element", () => {
		it("returns only monsters with the specified element", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				elements: [Element.Dragon],
			});
			expect(result.length).toBeGreaterThan(0);
			expect(result.every((m) => m.element === Element.Dragon)).toBe(true);
		});

		it("supports multiple elements (OR logic)", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				elements: [Element.Fire, Element.Ice],
			});
			expect(
				result.every(
					(m) => m.element === Element.Fire || m.element === Element.Ice,
				),
			).toBe(true);
		});

		it("returns all monsters when filter is empty", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				elements: [],
			});
			expect(result).toHaveLength(monsters.length);
		});
	});

	describe("filter by elemental weakness", () => {
		it("returns only monsters weak to the specified element", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				elementWeaknesses: [Element.Dragon],
			});
			expect(result.length).toBeGreaterThan(0);
			expect(
				result.every((m) => m.elementWeaknesses.includes(Element.Dragon)),
			).toBe(true);
		});

		it("includes monster if any weakness matches (OR logic within filter)", () => {
			// Arkveld is only weak to Dragon
			const result = filterMonsters(monsters, {
				...emptyFilters,
				elementWeaknesses: [Element.Dragon, Element.Ice],
			});
			expect(result.some((m) => m.name === "Arkveld")).toBe(true);
		});

		it("returns all monsters when filter is empty", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				elementWeaknesses: [],
			});
			expect(result).toHaveLength(monsters.length);
		});
	});

	describe("filter by star rank", () => {
		it("returns only monsters of the specified rank", () => {
			const result = filterMonsters(monsters, { ...emptyFilters, ranks: [1] });
			expect(result.length).toBeGreaterThan(0);
			expect(result.every((m) => m.rank === 1)).toBe(true);
		});

		it("supports multiple ranks (OR logic)", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				ranks: [1, 2],
			});
			expect(result.every((m) => m.rank === 1 || m.rank === 2)).toBe(true);
		});

		it("returns all monsters when filter is empty", () => {
			const result = filterMonsters(monsters, { ...emptyFilters, ranks: [] });
			expect(result).toHaveLength(monsters.length);
		});
	});

	describe("combined filters (AND logic)", () => {
		it("ANDs search with element filter", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				search: "Rathalos",
				elements: [Element.Fire],
			});
			expect(
				result.every(
					(m) => m.name.includes("Rathalos") && m.element === Element.Fire,
				),
			).toBe(true);
		});

		it("ANDs default attack type and rank filters", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				defaultAttackTypes: [AttackType.Power],
				ranks: [5],
			});
			expect(
				result.every(
					(m) => m.defaultAttackType === AttackType.Power && m.rank === 5,
				),
			).toBe(true);
		});

		it("returns empty array when combined filters match nothing", () => {
			// There are no rank 1 Dragon-element monsters
			const result = filterMonsters(monsters, {
				...emptyFilters,
				elements: [Element.Dragon],
				ranks: [1],
			});
			expect(result).toHaveLength(0);
		});

		it("applies all five filter dimensions together", () => {
			const result = filterMonsters(monsters, {
				search: "Zinogre",
				defaultAttackTypes: [AttackType.Speed],
				enragedAttackTypes: [AttackType.Technical],
				elements: [Element.Thunder],
				elementWeaknesses: [Element.Ice],
				ranks: [5],
			});
			expect(result).toHaveLength(1);
			expect(result[0].name).toBe("Zinogre");
		});
	});

	describe("sort order", () => {
		it("sorts by rank ascending", () => {
			const result = filterMonsters(monsters, emptyFilters);
			for (let i = 1; i < result.length; i++) {
				expect(result[i].rank).toBeGreaterThanOrEqual(result[i - 1].rank);
			}
		});

		it("sorts alphabetically within the same rank", () => {
			const result = filterMonsters(monsters, emptyFilters);
			for (let i = 1; i < result.length; i++) {
				if (result[i].rank === result[i - 1].rank) {
					expect(
						result[i].name.localeCompare(result[i - 1].name),
					).toBeGreaterThanOrEqual(0);
				}
			}
		});

		it("sort is stable across filtered subsets", () => {
			const result = filterMonsters(monsters, {
				...emptyFilters,
				ranks: [3, 4],
			});
			for (let i = 1; i < result.length; i++) {
				if (result[i].rank === result[i - 1].rank) {
					expect(
						result[i].name.localeCompare(result[i - 1].name),
					).toBeGreaterThanOrEqual(0);
				} else {
					expect(result[i].rank).toBeGreaterThan(result[i - 1].rank);
				}
			}
		});
	});
});
