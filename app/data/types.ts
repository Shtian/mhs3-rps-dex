export enum AttackType {
	Power = "Power",
	Speed = "Speed",
	Technical = "Technical",
}

export enum Element {
	Fire = "Fire",
	Water = "Water",
	Ice = "Ice",
	Thunder = "Thunder",
	Dragon = "Dragon",
	NonElemental = "Non-Elemental",
}

export type Monster = {
	name: string;
	imageFilename: string;
	rank: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	element: Element;
	defaultAttackType: AttackType;
	enragedAttackTypes: AttackType[];
	elementWeaknesses: Element[];
};
