import type { Monster } from "../data/types";
import { AttackType, Element } from "../data/types";
import { AttackTypeIcon, AttackTypeLabel } from "./AttackTypeIcon";

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
				<span key={i} className="text-muted-foreground/20 text-xs leading-none">
					★
				</span>
			))}
		</div>
	);
}

export function MonsterCard({ monster }: { monster: Monster }) {
	const imgSrc = `/monsters/${monster.imageFilename}`;

	return (
		<div className="group fade-in-0 w-full animate-in overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-muted-foreground/25">
			<div className="p-3 pb-2.5">
				<div className="flex items-center gap-3">
					<div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/20">
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
					<h3 className="min-w-0 flex-1 font-bold text-card-foreground text-sm">
						{monster.name}
					</h3>
					<AttackTypeIcon type={monster.defaultAttackType} size={22} />
				</div>
			</div>

			<div className="border-border/50 border-t bg-red-950/20 px-3 py-1.5">
				<div className="flex items-center gap-2">
					<span className="font-medium text-[10px] text-red-400/70 uppercase tracking-wider">
						Enraged
					</span>
					<div className="flex gap-2">
						{monster.enragedAttackTypes.length > 0 ? (
							monster.enragedAttackTypes.map((type) => (
								<AttackTypeIcon key={type} type={type} size={18} />
							))
						) : (
							<span className="text-muted-foreground/30 text-xs">-</span>
						)}
					</div>
				</div>
			</div>

			<div className="space-y-2 border-border/50 border-t px-3 py-2.5">
				<div className="flex items-center gap-2">
					<span className="w-14 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
						Element
					</span>
					<div className="flex items-center gap-1">
						<ElementIcon element={monster.element} size={13} />
						<span className="text-muted-foreground text-xs">
							{monster.element}
						</span>
					</div>
				</div>
				{monster.elementWeaknesses.length > 0 && (
					<div className="flex items-center gap-2">
						<span className="w-14 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
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

			<div className="flex items-center justify-between border-border/50 border-t bg-muted/10 px-3 py-2">
				<span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
					Rank
				</span>
				<StarRank rank={monster.rank} />
			</div>
		</div>
	);
}

export function RpsLegend() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm">
			<span className="text-muted-foreground text-xs uppercase tracking-widest">
				RPS
			</span>
			<div className="flex items-center gap-1.5">
				<AttackTypeLabel type={AttackType.Power} className="text-xs" />
				<span className="text-muted-foreground text-xs">beats</span>
				<AttackTypeLabel type={AttackType.Technical} className="text-xs" />
			</div>
			<div className="flex items-center gap-1.5">
				<AttackTypeLabel type={AttackType.Technical} className="text-xs" />
				<span className="text-muted-foreground text-xs">beats</span>
				<AttackTypeLabel type={AttackType.Speed} className="text-xs" />
			</div>
			<div className="flex items-center gap-1.5">
				<AttackTypeLabel type={AttackType.Speed} className="text-xs" />
				<span className="text-muted-foreground text-xs">beats</span>
				<AttackTypeLabel type={AttackType.Power} className="text-xs" />
			</div>
		</div>
	);
}
