import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PopWords from "@/components/animation/PopWords";
import NudgeOnLeave from "@/components/animation/NudgeOnLeave";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type MenuItem = {
  name: string;
  price?: string;
  description?: string;
  tag?: string;
  imageSrc?: string;
  imageAlt?: string;
  cutout?: boolean;
};

type MenuCategory = {
  title?: string;
  items: MenuItem[];
};

type MenuGinghamCardsProps = {
  label?: string;
  title: string;
  categories: MenuCategory[];
  itemsLabel?: string;
  ariaLabel?: string;
  className?: string;
};

const TILTS = [-4, 3, -2, 5, -5, 2];

const MenuCard = ({ item, index }: { item: MenuItem; index: number }) => {
  const reduce = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.72, ease: [0.165, 0.84, 0.44, 1], delay: (index % 3) * 0.1 + Math.floor(index / 3) * 0.05 }}
      className="h-full [container-type:inline-size]"
    >
      <NudgeOnLeave className="h-full">
      <article className="kit-card relative flex h-full flex-col overflow-hidden p-[6cqw]">
        <div className="relative -mx-[6cqw] flex aspect-[5/4] items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-[20cqw] -translate-y-1/2 bg-[conic-gradient(var(--primary)_25%,var(--card)_0_50%,var(--primary)_0_75%,var(--card)_0)] [background-size:20cqw_20cqw]"
          />
          {item.imageSrc && item.cutout && (
            <Media
              src={item.imageSrc}
              alt={item.imageAlt || ""}
              aria-hidden={!item.imageAlt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="relative z-10 h-[88%] w-[80%] object-contain"
            />
          )}
          {item.imageSrc && !item.cutout && (
            <div style={{ rotate: `${tilt}deg` }} className="relative z-10 aspect-[4/3] w-[64%] overflow-hidden rounded-[var(--radius-image)] shadow-[0_0_0_1.6cqw_var(--title-stroke-color,var(--card))]">
              <Media
                src={item.imageSrc}
                alt={item.imageAlt || ""}
                aria-hidden={!item.imageAlt}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="size-full object-cover"
              />
            </div>
          )}
          {item.tag && (
            <p className="absolute left-[6cqw] top-[5cqw] z-20 max-w-[80%] -rotate-[6deg] truncate rounded-[0.4em] bg-accent px-[0.5em] pt-[0.3em] pb-[0.15em] font-[family-name:var(--font-display,var(--font-heading))] text-[length:min(var(--text-h3),7cqw)] leading-[0.9] uppercase text-accent-foreground shadow-[0_0_0_0.9cqw_var(--title-stroke-color,var(--card))]">
              {item.tag}
            </p>
          )}
        </div>
        <div className="mt-[4cqw] flex items-start justify-between gap-[4cqw]">
          <h3 className="min-w-0 font-[family-name:var(--font-heading)] text-[length:min(calc(var(--text-h3)*1.15),8.5cqw)] font-[var(--heading-weight)] leading-[0.95] tracking-[var(--heading-tracking)] uppercase text-primary [overflow-wrap:anywhere]">
            {item.name}
          </h3>
          {item.price && (
            <p className="shrink-0 whitespace-nowrap font-[family-name:var(--font-heading)] text-[length:min(calc(var(--text-h3)*1.15),8.5cqw)] leading-[0.95] uppercase text-card-foreground">
              {item.price}
            </p>
          )}
        </div>
        {item.description && (
          <p className="mt-[3cqw] text-[length:var(--text-body)] leading-[1.3] text-muted-foreground">{item.description}</p>
        )}
      </article>
      </NudgeOnLeave>
    </motion.div>
  );
};

const MenuRow = ({ item, index }: { item: MenuItem; index: number }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.72, ease: [0.165, 0.84, 0.44, 1], delay: (index % 2) * 0.1 }}
      className="border-b-2 border-dashed border-[color-mix(in_srgb,var(--primary)_40%,transparent)] py-[calc(var(--gap)*1.6)]"
    >
      <div className="flex items-start justify-between gap-[calc(var(--gap)*2)]">
        <div className="flex min-w-0 flex-wrap items-center gap-x-[0.6em] gap-y-[0.3em]">
          <h3 className="min-w-0 font-[family-name:var(--font-heading)] text-[length:calc(var(--text-h3)*1.05)] font-[var(--heading-weight)] leading-[0.95] tracking-[var(--heading-tracking)] uppercase text-primary [overflow-wrap:anywhere]">
            {item.name}
          </h3>
          {item.tag && (
            <p className="-rotate-[5deg] whitespace-nowrap rounded-[0.4em] bg-accent px-[0.5em] pt-[0.3em] pb-[0.15em] font-[family-name:var(--font-display,var(--font-heading))] text-[length:var(--text-small)] leading-[0.9] uppercase text-accent-foreground">
              {item.tag}
            </p>
          )}
        </div>
        {item.price && (
          <p className="shrink-0 whitespace-nowrap font-[family-name:var(--font-heading)] text-[length:calc(var(--text-h3)*1.05)] leading-[0.95] uppercase">{item.price}</p>
        )}
      </div>
      {item.description && (
        <p className="mt-[0.5em] max-w-[34rem] text-[length:var(--text-body)] leading-[1.3] text-muted-foreground">{item.description}</p>
      )}
    </motion.div>
  );
};

const MenuGinghamCards = ({ label, title, categories, itemsLabel = "items", ariaLabel, className }: MenuGinghamCardsProps) => {
  const total = categories.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <section
      aria-label={ariaLabel || title}
      data-gallery
      className={cn("relative isolate bg-background px-[var(--gutter)] py-[var(--section-space)] text-foreground", className)}
    >
      <div className="mx-auto w-full max-w-[var(--container)]">
        <div className="flex flex-wrap items-end justify-between gap-x-[calc(var(--gap)*3)] gap-y-[var(--gap)]">
          <div className="min-w-0 max-w-[60rem] flex-1">
            {label && (
              <PopWords
                text={label}
                tag="p"
                className="relative z-10 mb-[0.5em] w-fit max-w-full -rotate-[7deg] font-[family-name:var(--font-display,var(--font-heading))] text-[length:var(--text-h3)] leading-[0.9] uppercase text-accent [-webkit-text-stroke:calc(var(--title-stroke,0em)*3)_var(--title-stroke-color,transparent)] [paint-order:stroke_fill]"
              />
            )}
            <PopWords
              text={title}
              tag="h2"
              size="var(--text-h1)"
              className="w-full text-balance font-[family-name:var(--font-heading)] font-[var(--heading-weight)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] uppercase text-primary [-webkit-text-stroke:var(--title-stroke,0em)_var(--title-stroke-color,transparent)] [paint-order:stroke_fill] [overflow-wrap:break-word]"
            />
          </div>
          <p aria-hidden="true" className="whitespace-nowrap text-[length:var(--text-body-lg)] uppercase">
            {total} {itemsLabel}
          </p>
        </div>

        <div className="mt-[calc(var(--section-space)*0.6)] flex flex-col gap-[calc(var(--section-space)*0.6)]">
          {categories.map((category, c) => {
            const cards = category.items.some((item) => item.imageSrc);
            return (
              <div key={c}>
                {category.title && (
                  <div className="mb-[calc(var(--gap)*2)] flex flex-wrap items-baseline gap-x-[0.6em]">
                    <h3 className="text-balance font-[family-name:var(--font-heading)] text-[length:var(--text-h2)] font-[var(--heading-weight)] leading-[0.9] tracking-[var(--heading-tracking)] uppercase text-primary [-webkit-text-stroke:calc(var(--title-stroke,0em)*0.8)_var(--title-stroke-color,transparent)] [paint-order:stroke_fill] [overflow-wrap:break-word]">
                      {category.title}
                    </h3>
                    <p aria-hidden="true" className="whitespace-nowrap text-[length:var(--text-body)] uppercase text-muted-foreground">
                      {category.items.length} {itemsLabel}
                    </p>
                  </div>
                )}
                {cards ? (
                  <div className="grid grid-cols-1 gap-[calc(var(--gap)*2)] md:grid-cols-2 lg:grid-cols-3">
                    {category.items.map((item, index) => (
                      <MenuCard key={index} item={item} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-x-[calc(var(--gap)*5)] md:grid-cols-2">
                    {category.items.map((item, index) => (
                      <MenuRow key={index} item={item} index={index} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MenuGinghamCards;
