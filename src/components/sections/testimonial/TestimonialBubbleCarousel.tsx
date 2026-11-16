import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PopWords, { backOut } from "@/components/animation/PopWords";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Review = { quote: string; name: string; source?: string };

type TestimonialBubbleCarouselProps = {
  label?: string;
  title: string;
  items: Review[];
  ariaLabel?: string;
  className?: string;
};

const TILTS = [-2.5, 2, -1.5, 2.5, -2, 1.5];

const TestimonialBubbleCarousel = ({ label, title, items, ariaLabel, className }: TestimonialBubbleCarouselProps) => {
  const reduce = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", duration: 30 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi, sync]);

  return (
    <section
      aria-label={ariaLabel ?? title}
      className={cn("relative isolate overflow-x-clip bg-background py-[var(--section-space)] text-foreground", className)}
    >
      <div className="mx-auto flex w-[var(--container)] flex-col gap-[calc(var(--gap)*2)] md:flex-row md:items-end md:justify-between">
        <div className="flex min-w-0 flex-1 flex-col items-start">
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
        <div className={cn("flex shrink-0 items-center gap-[0.6rem]", !canPrev && !canNext && "md:hidden")}>
          <button
            type="button"
            aria-label="Previous reviews"
            disabled={!canPrev}
            onClick={() => emblaApi?.scrollPrev()}
            className="flex size-[clamp(2.75rem,3.6vw,3.5rem)] cursor-pointer items-center justify-center rounded-[var(--radius-button)] bg-primary text-primary-foreground transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="size-[45%]" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
            disabled={!canNext}
            onClick={() => emblaApi?.scrollNext()}
            className="flex size-[clamp(2.75rem,3.6vw,3.5rem)] cursor-pointer items-center justify-center rounded-[var(--radius-button)] bg-primary text-primary-foreground transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight className="size-[45%]" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <div ref={emblaRef} className="mx-auto mt-[calc(var(--gap)*3)] w-[var(--container)] cursor-grab overflow-hidden px-[0.75rem] py-[1.5rem] active:cursor-grabbing">
        <div className="-ml-[calc(var(--gap)*2.5)] flex touch-pan-y">
          {items.map((item, index) => {
            const tilt = TILTS[index % TILTS.length];
            return (
              <div key={index} className="min-w-0 shrink-0 grow-0 basis-[88%] pl-[calc(var(--gap)*2.5)] sm:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: tilt * 4 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.55, ease: backOut(2.2), delay: (index % 3) * 0.1 }}
                  className="flex h-full flex-col"
                >
                  <div className="kit-card relative flex grow flex-col p-[clamp(1.25rem,2.4vw,2.25rem)]">
                    <p aria-hidden="true" className="h-[0.5em] font-[family-name:var(--font-display,var(--font-heading))] text-[length:var(--text-h2)] leading-[0.8] text-primary">
                      &ldquo;
                    </p>
                    <p className="mt-[0.4em] text-[length:var(--text-body-lg)] leading-[1.2] [overflow-wrap:break-word]">{item.quote}</p>
                    <div aria-hidden="true" className="absolute top-[calc(100%-1px)] left-[14%] h-[clamp(1.25rem,2vw,1.75rem)] w-[clamp(1.5rem,2.6vw,2.25rem)] bg-[inherit] [clip-path:polygon(0_0,100%_0,0_100%)]" />
                  </div>
                  <div className="mt-[clamp(1.9rem,3vw,2.6rem)] flex min-w-0 flex-col items-start gap-[0.5em] pl-[14%]">
                    <h3 className="max-w-full font-[family-name:var(--font-heading)] text-[length:var(--text-h3)] leading-[0.95] uppercase [overflow-wrap:break-word]">{item.name}</h3>
                    {item.source && (
                      <p className="-rotate-[4deg] whitespace-nowrap rounded-[0.35em] bg-secondary px-[0.55em] pt-[0.3em] pb-[0.15em] font-[family-name:var(--font-display,var(--font-heading))] text-[length:var(--text-small)] leading-none uppercase text-secondary-foreground">
                        {item.source}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialBubbleCarousel;
