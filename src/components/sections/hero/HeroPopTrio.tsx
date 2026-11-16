import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PopWords, { backOut } from "@/components/animation/PopWords";
import PeelSticker from "@/components/animation/PeelSticker";
import NudgeOnLeave from "@/components/animation/NudgeOnLeave";
import MaskedLineReveal from "@/components/animation/MaskedLineReveal";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Photo = { imageSrc: string; imageAlt?: string };

type HeroPopTrioProps = {
  label?: string;
  title: string;
  description?: string;
  cta?: { text: string; href: string };
  items: Photo[];
  sticker?: Photo & { cutout?: boolean };
  introDelay?: number;
  ariaLabel?: string;
  className?: string;
};

const SLOTS = [
  { tilt: -7, place: "lg:left-[3vw] lg:top-[24%] lg:w-[16vw]" },
  { tilt: 6, place: "lg:right-[3vw] lg:top-[13%] lg:w-[15vw]" },
  { tilt: -4, place: "lg:right-[11vw] lg:bottom-[5%] lg:w-[12.5vw]" },
  { tilt: 5, place: "lg:left-[12vw] lg:bottom-[4%] lg:w-[11.5vw]" },
];

const HeroPopTrio = ({ label, title, description, cta, items, sticker, introDelay = 0, ariaLabel, className }: HeroPopTrioProps) => {
  const reduce = useReducedMotion();
  const photos = items.slice(0, SLOTS.length);

  return (
    <section
      aria-label={ariaLabel || "Hero"}
      className={cn("relative isolate overflow-x-clip pt-[calc(var(--section-space)*1.5)] pb-[var(--section-space)] text-foreground lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center", className)}
    >
      <div className="relative z-10 mx-auto flex w-[var(--container)] flex-col items-center text-center">
        {label && (
          <PopWords
            text={label}
            tag="p"
            immediate
            delay={introDelay}
            className="relative z-10 mb-[0.5em] w-fit max-w-full -rotate-[5deg] font-[family-name:var(--font-display,var(--font-heading))] text-[length:var(--text-h3)] leading-[0.9] uppercase text-primary [-webkit-text-stroke:calc(var(--title-stroke,0em)*3)_var(--title-stroke-color,transparent)] [paint-order:stroke_fill]"
          />
        )}
        <PopWords
          text={title}
          tag="h1"
          immediate
          delay={introDelay + 0.15}
          size="var(--hero-size)"
          className="w-full max-w-full text-balance lg:max-w-[60vw] [--hero-size:min(var(--text-display),15vw)] lg:[--hero-size:min(var(--text-display),10.5vw)] font-[family-name:var(--font-heading)] font-[var(--heading-weight)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] uppercase text-primary [-webkit-text-stroke:var(--title-stroke,0em)_var(--title-stroke-color,transparent)] [paint-order:stroke_fill] [overflow-wrap:break-word]"
        />
        {description && (
          <MaskedLineReveal
            text={description}
            tag="p"
            immediate
            delay={introDelay + 0.4}
            duration={1.4}
            stagger={0.15}
            from="100%"
            ease={[0.23, 1, 0.32, 1]}
            className="mt-[calc(var(--gap)*2)] w-full max-w-[38rem] text-[length:var(--text-body-lg)] leading-[1.35]"
          />
        )}
        {cta && (
          <a href={cta.href} className="btn-primary mt-[calc(var(--gap)*2.5)]">
            {cta.text}
          </a>
        )}
      </div>

      <div className="relative mx-auto mt-[calc(var(--gap)*4)] flex w-[var(--container)] justify-center lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:w-full">
        {photos.map((item, index) => {
          const slot = SLOTS[index];
          return (
            <motion.div
              key={index}
              initial={reduce ? false : { opacity: 0, scale: 0.4, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: backOut(2.2), delay: introDelay + 0.45 + index * 0.1, opacity: { duration: 0.25, delay: introDelay + 0.45 + index * 0.1 } }}
              className={cn(
                "relative w-[30%] max-w-[15rem] lg:pointer-events-auto lg:absolute lg:max-w-none",
                index % 2 ? "mt-[calc(var(--gap)*3)] -ml-[2%]" : "-ml-[2%] first:ml-0",
                "lg:m-0",
                slot.place
              )}
            >
              <NudgeOnLeave rotate={slot.tilt} className="aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] shadow-[0_0_0_clamp(4px,0.45vw,7px)_var(--title-stroke-color,var(--card))]">
                <Media src={item.imageSrc} alt={item.imageAlt || ""} aria-hidden={!item.imageAlt} draggable={false} className="size-full object-cover" decoding="async" />
              </NudgeOnLeave>
            </motion.div>
          );
        })}
        {sticker && (
          <PeelSticker
            imageSrc={sticker.imageSrc}
            imageAlt={sticker.imageAlt}
            cutout={sticker.cutout}
            rotate={-8}
            delay={introDelay + 0.8}
            scrub={sticker.cutout ? [-1.2, 0.3] : undefined}
            className={cn(
              "absolute -top-[6vw] left-[6%] z-10 aspect-square w-[18vw] max-w-[8rem] lg:pointer-events-auto lg:max-w-none",
              photos.length < SLOTS.length ? "lg:top-auto lg:bottom-[9%] lg:left-[12vw] lg:w-[10.5vw]" : "lg:top-[16%] lg:left-[14.5vw] lg:w-[8vw]"
            )}
          />
        )}
      </div>
    </section>
  );
};

export default HeroPopTrio;
