import { useMemo } from "react";

import type { Monster } from "../data/types";
import { cn } from "../lib/utils";
import { ACTIVE_CHIP_CLASS } from "./FilterBar";
import { Button } from "./ui/button";

const ALL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type AlphabetBarProps = {
	monsters: Monster[];
	activeLetter: string;
	onLetterClick: (letter: string) => void;
};

export function AlphabetBar({
	monsters,
	activeLetter,
	onLetterClick,
}: AlphabetBarProps) {
	const availableLetters = useMemo(
		() => new Set(monsters.map((m) => m.name[0].toUpperCase())),
		[monsters],
	);

	return (
		<div className="flex flex-wrap gap-1">
			{ALL_LETTERS.map((letter) => {
				const available = availableLetters.has(letter);
				const active = activeLetter.toUpperCase() === letter;
				return (
					<Button
						key={letter}
						variant="outline"
						size="sm"
						onClick={() => onLetterClick(letter)}
						aria-pressed={active}
						disabled={!available}
						className={cn(
							"min-h-[36px] min-w-[36px] rounded-lg border-border/80 font-mono text-sm transition-colors",
							active && "font-semibold",
							active && ACTIVE_CHIP_CLASS,
							!available && "opacity-25",
						)}
					>
						{letter}
					</Button>
				);
			})}
		</div>
	);
}
