import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useImageReady } from "@/components/kit/kitMotion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PopWords, { backOut } from "@/components/animation/PopWords";
import NudgeOnLeave from "@/components/animation/NudgeOnLeave";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Member = { name: string; role: string; imageSrc: string; imageAlt?: string };

type TeamTiltedCrewProps = {
  label?: string;
  title?: string;
  members: Member[];
  ariaLabel?: string;
  className?: string;
};

const TILTS = [-4, 5, -6, 3, 6, -3, 4, -5];

const CrewCard = ({ member, i, tilt, reduce }: { member: Member; i: number; tilt: number; reduce: boolean | null }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const ready = useImageReady(ref, inView);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, scale: 0.8, y: 40, rotate: tilt * 2.5 }}
      animate={inView && ready ? { opacity: 1, scale: 1, y: 0, rotate: 0 } : undefined}
      transition={{ duration: 0.5, ease: backOut(2.2), delay: (i % 4) * 0.1 }}
      className="flex w-full flex-col items-center"
    >
      <NudgeOnLeave rotate={tilt} className="flex w-full flex-col items-center">
        <p
          style={{ rotate: `${-tilt * 2.5}deg` }}
          className="relative z-10 -mb-[0.45em] max-w-full text-center text-balance font-[family-name:var(--font-display,var(--font-heading))] text-[length:max(1.05rem,calc(var(--text-h3)*0.8))] leading-[0.9] uppercase text-primary [-webkit-text-stroke:calc(var(--title-stroke,0em)*3)_var(--title-stroke-color,transparent)] [paint-order:stroke_fill] [overflow-wrap:anywhere]"
        >
          {member.name}
        </p>
        <div className="aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] shadow-[0_0_0_clamp(3px,0.35vw,6px)_var(--title-stroke-color,var(--card))]">
          <Media
            src={member.imageSrc}
            alt={member.imageAlt || member.name}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="size-full object-cover"
          />
        </div>
      </NudgeOnLeave>
      <p className="mt-[0.9em] max-w-full text-center text-balance font-[family-name:var(--font-heading)] text-[length:var(--text-body-lg)] leading-[1.05] uppercase [overflow-wrap:anywhere]">
        {member.role}
      </p>
    </motion.div>
  );
};

const TeamTiltedCrew = ({ label, title, members, ariaLabel, className }: TeamTiltedCrewProps) => {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label={ariaLabel || title || "Team"}
      className={cn("relative isolate overflow-x-clip px-[var(--gutter)] py-[var(--section-space)] text-foreground", className)}
    >
      <div className="mx-auto flex w-full max-w-[var(--container)] flex-col items-center">
        {label && (
          <PopWords
            text={label}
            tag="p"
            className="relative z-10 mb-[0.5em] w-fit max-w-full rotate-[5deg] font-[family-name:var(--font-display,var(--font-heading))] text-[length:var(--text-h3)] leading-[0.9] uppercase text-accent [-webkit-text-stroke:calc(var(--title-stroke,0em)*3)_var(--title-stroke-color,transparent)] [paint-order:stroke_fill]"
          />
        )}
        {title && (
          <PopWords
            text={title}
            tag="h2"
            size="calc(var(--text-h1)*0.85)"
            className="w-full max-w-[75vw] text-center text-balance max-md:max-w-full font-[family-name:var(--font-heading)] font-[var(--heading-weight)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] uppercase text-primary [-webkit-text-stroke:var(--title-stroke,0em)_var(--title-stroke-color,transparent)] [paint-order:stroke_fill] [overflow-wrap:break-word]"
          />
        )}

        <ul
          className={cn(
            "flex w-full flex-wrap justify-center gap-x-[calc(var(--gap)*3)] gap-y-[calc(var(--gap)*5)] px-[calc(var(--gap)*0.5)] [--crew-gap:calc(var(--gap)*3)]",
            (label || title) && "mt-[calc(var(--section-space)*0.75)]"
          )}
        >
          {members.map((member, i) => {
            const tilt = TILTS[i % TILTS.length];
            return (
              <li
                key={i}
                className="flex max-w-[19rem] basis-[calc((100%-var(--crew-gap))/2)] md:basis-[calc((100%-2*var(--crew-gap))/3)] lg:basis-[calc((100%-3*var(--crew-gap))/4)]"
              >
                <CrewCard member={member} i={i} tilt={tilt} reduce={reduce} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TeamTiltedCrew;
