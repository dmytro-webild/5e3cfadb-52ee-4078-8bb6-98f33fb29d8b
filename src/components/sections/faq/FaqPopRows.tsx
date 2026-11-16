import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PopWords, { backOut } from "@/components/animation/PopWords";
import WaveEdge from "@/components/animation/WaveEdge";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FaqItem = { question: string; answer: string };

type FaqPopRowsProps = {
  label?: string;
  title: string;
  items: FaqItem[];
  edges?: "both" | "top" | "bottom" | "none";
  topColor?: string;
  ariaLabel?: string;
  className?: string;
};

const TILTS = [-3, 2.5, -2, 3];

const FaqPopRows = ({ label, title, items, edges = "both", topColor = "var(--background)", ariaLabel, className }: FaqPopRowsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const kitMotion = useKitMotion();
  const uid = useId();
  const top = edges === "both" || edges === "top";
  const bottom = edges === "both" || edges === "bottom";

  return (
    <section
      aria-label={ariaLabel ?? title}
      className={cn(
        "relative isolate z-[1] bg-secondary text-secondary-foreground [--wave-h:clamp(5rem,16vw,18.75rem)]",
        top && "pt-[calc(var(--wave-h)*0.6)]",
        bottom && "mb-[calc(var(--wave-h)*0.55)]",
        className
      )}
    >
      {top && <WaveEdge side="top" inside color={topColor} />}
      {bottom && <WaveEdge side="bottom" className="text-secondary" />}

      <div className="relative mx-auto flex w-[var(--container)] flex-col items-center py-[var(--section-space)]">
        {label && (
          <PopWords
            text={label}
            tag="p"
            className="relative z-10 mb-[0.5em] w-fit max-w-full -rotate-[7deg] px-[0.2em] font-[family-name:var(--font-display,var(--font-heading))] text-[length:var(--text-h3)] leading-[0.9] uppercase text-accent [-webkit-text-stroke:calc(var(--title-stroke,0.067em)*3)_var(--title-stroke-color,var(--card))] [paint-order:stroke_fill]"
          />
        )}
        <PopWords
          text={title}
          tag="h2"
          size="var(--text-h1)"
          className="w-full text-balance text-center font-[family-name:var(--font-heading)] font-[var(--heading-weight)] leading-[var(--heading-leading)] tracking-[var(--heading-tracking)] uppercase text-[color:var(--title-stroke-color,var(--card))] [-webkit-text-stroke:var(--title-stroke,0.067em)_color-mix(in_srgb,var(--accent)_30%,transparent)] [paint-order:stroke_fill] [overflow-wrap:break-word]"
        />

        <div className="mt-[calc(var(--section-space)*0.5)] flex w-full max-w-[60rem] flex-col gap-[calc(var(--gap)*1.25)]">
          {items.map((item, index) => {
            const open = openIndex === index;
            const tilt = TILTS[index % TILTS.length];
            return (
              <motion.div
                key={index}
                initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: tilt }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.5, ease: backOut(2.2), delay: (index % 4) * 0.06 }}
                className="kit-card overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${uid}-${index}`}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-[1rem] px-[clamp(1.1rem,2.2vw,2rem)] py-[clamp(1rem,1.6vw,1.5rem)] text-left"
                >
                  <h3 className="min-w-0 font-[family-name:var(--font-heading)] text-[length:var(--text-h3)] leading-[1] uppercase [overflow-wrap:break-word]">{item.question}</h3>
                  <div
                    aria-hidden="true"
                    className={cn(
                      "relative size-[clamp(2.25rem,3vw,2.75rem)] shrink-0 rounded-full bg-primary text-primary-foreground transition-transform duration-500 ease-[cubic-bezier(0.34,1.9,0.64,1)]",
                      open && "rotate-[135deg]"
                    )}
                  >
                    <div className="absolute top-1/2 left-1/2 h-[2.5px] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                    <div className="absolute top-1/2 left-1/2 h-[44%] w-[2.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`${uid}-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: kitMotion.base * 0.7, ease: kitMotion.ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[46rem] px-[clamp(1.1rem,2.2vw,2rem)] pb-[clamp(1.1rem,1.8vw,1.75rem)] text-[length:var(--text-body-lg)] leading-[1.25] text-muted-foreground">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqPopRows;
