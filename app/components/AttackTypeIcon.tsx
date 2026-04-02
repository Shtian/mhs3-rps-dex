import {
	BodyPartMuscleIcon,
	StarsIcon,
	WorkoutRunIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { AttackType } from "../data/types";
import { cn } from "../lib/utils";

const ATTACK_TYPE_META: Record<
	AttackType,
	{
		icon: typeof BodyPartMuscleIcon;
		gradient: string;
		iconColor: string;
		glow: string;
		iconScale: number;
	}
> = {
	[AttackType.Power]: {
		icon: BodyPartMuscleIcon,
		gradient: "from-[#4f1715] via-[#8a3834] to-[#b95b54]",
		iconColor: "text-[#f5ddd4]",
		glow: "shadow-[0_1px_0_rgba(255,255,255,0.14),0_0_14px_rgba(185,91,84,0.18)]",
		iconScale: 0.6,
	},
	[AttackType.Speed]: {
		icon: WorkoutRunIcon,
		gradient: "from-[#18305d] via-[#3159a0] to-[#5d88da]",
		iconColor: "text-[#e4eeff]",
		glow: "shadow-[0_1px_0_rgba(255,255,255,0.14),0_0_14px_rgba(93,136,218,0.18)]",
		iconScale: 0.58,
	},
	[AttackType.Technical]: {
		icon: StarsIcon,
		gradient: "from-[#264515] via-[#4f7c2c] to-[#77aa47]",
		iconColor: "text-[#edf7bb]",
		glow: "shadow-[0_1px_0_rgba(255,255,255,0.14),0_0_14px_rgba(119,170,71,0.18)]",
		iconScale: 0.56,
	},
};

type AttackTypeIconProps = {
	type: AttackType;
	size?: number;
	decorative?: boolean;
	className?: string;
};

export function AttackTypeIcon({
	type,
	size = 18,
	decorative = false,
	className,
}: AttackTypeIconProps) {
	const meta = ATTACK_TYPE_META[type];
	const frameRadius = Math.max(3, Math.round(size * 0.1));
	const plateSize = size * 0.76;
	const innerSize = Math.max(12, Math.round(size * meta.iconScale));

	return (
		<div
			className={cn("inline-flex shrink-0", className)}
			aria-hidden={decorative}
			role={decorative ? undefined : "img"}
			title={decorative ? undefined : type}
		>
			<span
				className={cn(
					"relative inline-flex items-center justify-center overflow-hidden border border-[#f2ead8] bg-[#12100d] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_0_0_2px_rgba(0,0,0,0.65),0_2px_8px_rgba(0,0,0,0.38)]",
					meta.glow,
				)}
				style={{
					width: size,
					height: size,
					borderRadius: frameRadius,
					transform: "rotate(45deg)",
				}}
			>
				<span className="pointer-events-none absolute inset-[8%] rounded-[2px] border border-black/60 opacity-80" />
				<span
					className={cn(
						"relative inline-flex items-center justify-center overflow-hidden rounded-[2px] border border-black/60 bg-linear-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.18)]",
						meta.gradient,
					)}
					style={{ width: plateSize, height: plateSize }}
				>
					<span className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-black/12" />
					<span style={{ transform: "rotate(-45deg)" }}>
						<HugeiconsIcon
							icon={meta.icon}
							size={innerSize}
							strokeWidth={1.9}
							className={cn(meta.iconColor)}
						/>
					</span>
				</span>
			</span>
		</div>
	);
}

export function AttackTypeLabel({
	type,
	className,
	iconClassName,
}: {
	type: AttackType;
	className?: string;
	iconClassName?: string;
}) {
	return (
		<span className={cn("inline-flex items-center gap-2", className)}>
			<AttackTypeIcon type={type} decorative className={iconClassName} />
			<span>{type}</span>
		</span>
	);
}
