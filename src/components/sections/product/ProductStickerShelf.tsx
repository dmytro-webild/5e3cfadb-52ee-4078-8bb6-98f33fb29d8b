import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useImageReady } from "@/components/kit/kitMotion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PopWords, { backOut } from "@/components/animation/PopWords";
import WaveEdge from "@/components/animation/WaveEdge";
import NudgeOnLeave from "@/components/animation/NudgeOnLeave";
import MaskedLineReveal from "@/components/animation/MaskedLineReveal";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Product = {
  name: string;
  price?: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  cutout?: boolean;
  href?: string;
};

type ProductStickerShelfProps = {
  label?: string;
  title: string;
  description?: string;
  items: Product[];
  buyText?: string;
  edges?: "both" | "top" | "bottom" | "none";
  topColor?: string;
  ariaLabel?: string;
  className?: string;
};

const TILTS = [-2.5, 2, -1.5, 3, -3, 1.5];

const ShelfCard = ({ item, index, buyText }: { item: Product; index: number; buyText: string }) => {
  const reduce = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];
  const longest = Math.max(5, ...item.name.split(/\s+/).map((word) => word.length));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const ready = useImageReady(ref, inView);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { scale: 0.8, rotate: tilt * 2.4 }}
      animate={inView && ready ? { scale: 1, rotate: 0 } : undefined}
      transition={{ duration: 0.45, ease: backOut(2.2), delay: (index % 4) * 0.1 }}
      className="flex w-full [container-type:inline-size] sm:w-[calc((100%-var(--shelf-gap))/2)] lg:w-[calc((100%-2*var(--shelf-gap))/3)] xl:w-[calc((100%-3*var(--shelf-gap))/4)]"
    >
      <NudgeOnLeave rotate={tilt} className="flex w-full">
        <article className="kit-card flex w-full flex-col p-[5cqw]">
          <div className="aspect-square w-full overflow-hidden rounded-[var(--radius-image)]">
            <Media
              src={item.imageSrc}
              alt={item.imageAlt || ""}
              aria-hidden={!item.imageAlt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={cn("size-full", item.cutout ? "object-contain p-[4cqw]" : "object-cover")}
            />
          </div>
          <h3
            style={{ fontSize: `min(calc(var(--text-h3)*0.75),${(100 / (longest * 0.72 + 1.4)).toFixed(2)}cqw)` }}
            className="relative z-10 -mt-[0.9em] max-w-full self-center -rotate-[4deg] rounded-[0.35em] bg-primary px-[0.45em] pt-[0.3em] pb-[0.12em] text-center font-[family-name:var(--font-display,var(--font-heading))] leading-[0.9] uppercase text-primary-foreground shadow-[0_0_0_1.2cqw_var(--title-stroke-color,var(--card))] [overflow-wrap:anywhere]"
          >
            {item.name}
          </h3>
          {item.description && (
            <p className="mt-[5cqw] text-center text-[length:var(--text-body)] leading-[1.3] text-muted-foreground">{item.description}</p>
          )}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-[4cqw] pt-[6cqw]">
            {item.price && (
              <p className="whitespace-nowrap font-[family-name:var(--font-heading)] text-[length:min(calc(var(--text-h3)*1.4),12cqw)] leading-[0.95] uppercase text-card-foreground">
                {item.price}
              </p>
            )}
            {item.href && (
              <a href={item.href} className="btn-primary ml-auto min-h-0 py-[0.55em] text-[length:var(--text-body)]">
                {buyText}
              </a>
            )}
          </div>
        </article>
      </NudgeOnLeave>
    </motion.div>
  );
};

const ProductStickerShelf = ({ label, title, description, items, buyText = "Buy now", edges = "both", topColor = "var(--background)", ariaLabel, className }: ProductStickerShelfProps) => {
  const top = edges === "both" || edges === "top";
  const bottom = edges === "both" || edges === "bottom";

  return (
    <section
      aria-label={ariaLabel || title}
      className={cn(
        "relative isolate z-[1] bg-secondary text-secondary-foreground [--wave-h:clamp(5rem,16vw,18.75rem)]",
        top && "pt-[calc(var(--wave-h)*0.6)]",
        bottom && "mb-[calc(var(--wave-h)*0.55)]",
        className
      )}
    >
      {top && <WaveEdge side="top" inside color={topColor} />}
      {bottom && <WaveEdge side="bottom" className="text-secondary" />}

      <div className="relative mx-auto w-full max-w-[var(--container)] px-[var(--gutter)] py-[var(--section-space)]">
        <div className="mx-auto flex max-w-[64rem] flex-col items-center text-center">
          {label && (
            <PopWords
              text={label}
              tag="p"
              className="relative z-10 mb-[0.5em] w-fit max-w-full -rotate-[6deg] font-[family-name:var(--font-display,var(--font-heading))] text-[length:var(--text-h3)] leading-[0.9] uppercase text-accent [-webkit-text-stroke:calc(var(--title-stroke,0.067em)*3)_var(--title-stroke-color,var(--card))] [paint-order:stroke_fill]"
            />
          )}
          <PopWords
            text={title}
            tag="h2"
            size="var(--text-h1)"
            className="w-full text-balance font-[family-name:var(--font-heading)] font-[var(--heading-weight)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] uppercase text-[color:var(--title-stroke-color,var(--card))] [-webkit-text-stroke:var(--title-stroke,0.067em)_color-mix(in_srgb,var(--accent)_30%,transparent)] [paint-order:stroke_fill] [overflow-wrap:break-word]"
          />
          {description && (
            <MaskedLineReveal
              text={description}
              tag="p"
              delay={0.25}
              duration={1.4}
              stagger={0.15}
              from="100%"
              ease={[0.23, 1, 0.32, 1]}
              margin="0px 0px -15% 0px"
              className="mt-[calc(var(--gap)*2)] w-full max-w-[34rem] text-[length:var(--text-body-lg)] leading-[1.35]"
            />
          )}
        </div>

        <div className="mt-[calc(var(--section-space)*0.7)] flex flex-wrap justify-center gap-x-[var(--shelf-gap)] gap-y-[calc(var(--shelf-gap)*1.5)] [--shelf-gap:calc(var(--gap)*2.5)]">
          {items.map((item, index) => (
            <ShelfCard key={index} item={item} index={index} buyText={buyText} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductStickerShelf;
