import { useEffect, useRef, useState } from "react";
import { motion, useAnimate, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PopWords from "@/components/animation/PopWords";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Item = { imageSrc: string; imageAlt?: string; cutout?: boolean };

type FooterJuggleWordmarkProps = {
  brand: string;
  links: { text: string; href: string }[];
  copyright?: string;
  tagline?: string;
  items?: Item[];
  ariaLabel?: string;
  className?: string;
};

const LANES = [
  { left: "12%", size: "w-[11vw] max-md:w-[20vw]" },
  { left: "34%", size: "w-[9vw] max-md:w-[17vw]" },
  { left: "56%", size: "w-[12vw] max-md:w-[21vw]" },
  { left: "80%", size: "w-[13vw] max-md:w-[22vw]" },
];

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const JuggleItem = ({ item, index, active }: { item: Item; index: number; active: boolean }) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const lane = LANES[index % LANES.length];

  useEffect(() => {
    if (!active) return;
    let alive = true;
    let current: { stop: () => void } | null = null;
    const loop = async () => {
      await sleep(index * 550 + rand(0, 400));
      while (alive && scope.current) {
        const up = rand(0.9, 1.3);
        const down = up * rand(1.15, 1.5);
        const total = up + down;
        const side = Math.random() > 0.5 ? 1 : -1;
        const x0 = side * rand(2, 7);
        const x1 = -side * rand(8, 24);
        const spin = rand(220, 600) * (Math.random() > 0.5 ? 1 : -1);
        const el = scope.current;
        const room = (el.parentElement?.clientHeight ?? 0) - el.offsetHeight * 1.25;
        const peak = Math.max(el.offsetHeight * 0.5, Math.min(window.innerHeight * rand(0.38, 0.6), room));
        const low = window.innerHeight * 0.22;
        current = animate(
          el,
          { y: [low, -peak, low], x: [`${x0}vw`, `${x1}vw`], rotate: [0, spin], scale: [0.9, 1, 1], opacity: [0, 1, 1, 0] },
          {
            duration: total,
            scale: { duration: total, times: [0, 0.18 / total, 1], ease: [0.25, 0.46, 0.45, 0.94] },
            y: { duration: total, times: [0, up / total, 1], ease: [[0.215, 0.61, 0.355, 1], [0.55, 0.055, 0.675, 0.19]] },
            x: { duration: total, ease: "easeInOut" },
            rotate: { duration: total, ease: "linear" },
            opacity: { duration: total, times: [0, 0.18 / total, 1 - 0.25 / total, 1], ease: "linear" },
          }
        );
        await current;
        if (!alive) return;
        await sleep(rand(200, 900));
      }
    };
    loop();
    return () => {
      alive = false;
      current?.stop();
    };
  }, [active, animate, index, scope]);

  return (
    <div ref={scope} aria-hidden="true" style={{ left: lane.left, opacity: 0 }} className={cn("pointer-events-none absolute bottom-0 aspect-square -translate-x-1/2", lane.size)}>
      {!item.cutout ? (
        <div className="size-full overflow-hidden rounded-full shadow-[0_0_0_0.4vw_var(--title-stroke-color,var(--card))]">
          <Media src={item.imageSrc} alt="" className="size-full object-cover" decoding="async" />
        </div>
      ) : (
        <Media src={item.imageSrc} alt="" className="size-full object-contain" decoding="async" />
      )}
    </div>
  );
};

const RollLink = ({ text, href }: { text: string; href: string }) => (
  <a href={href} className="group block whitespace-nowrap font-[family-name:var(--font-heading)] text-[length:max(1.5rem,calc(var(--text-h3)*0.75))] leading-[1.05] uppercase">
    <div className="relative overflow-hidden">
      <div className="transition-transform duration-300 group-hover:-translate-y-full">{text}</div>
      <div aria-hidden="true" className="absolute inset-x-0 top-full text-primary transition-transform duration-300 group-hover:-translate-y-full">
        {text}
      </div>
    </div>
  </a>
);

const FooterJuggleWordmark = ({ brand, links, copyright, tagline, items = [], ariaLabel, className }: FooterJuggleWordmarkProps) => {
  const ref = useRef<HTMLElement>(null);
  const markBox = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const visible = useInView(ref, { margin: "0px 0px -10% 0px" });
  const [size, setSize] = useState<number | null>(null);

  useEffect(() => {
    const box = markBox.current;
    if (!box) return;
    const fit = () => {
      const mark = box.firstElementChild as HTMLElement | null;
      if (!mark) return;
      const current = parseFloat(getComputedStyle(mark).fontSize);
      const width = mark.scrollWidth;
      if (!width || !current) return;
      setSize(Math.min((current * box.clientWidth) / width, window.innerWidth * 0.35));
    };
    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [brand]);

  return (
    <footer aria-label={ariaLabel || `${brand} footer`} ref={ref} className={cn("relative isolate overflow-hidden pt-[var(--section-space)] text-foreground", className)}>
      <div className="relative z-20 mx-auto w-[var(--container)]">
        <div className="flex flex-wrap items-end justify-between gap-x-[calc(var(--gap)*3)] gap-y-[var(--gap)]">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-[calc(var(--gap)*2)] gap-y-[0.4em]">
            {links.map((link, i) => (
              <RollLink key={i} text={link.text} href={link.href} />
            ))}
          </nav>
          {copyright && <p className="font-[family-name:var(--font-heading)] text-[length:max(1.5rem,calc(var(--text-h3)*0.75))] leading-[1.05] uppercase text-muted-foreground">{copyright}</p>}
        </div>
        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.9, ease: [0.165, 0.84, 0.44, 1], delay: 0.25 }}
          className="mt-[calc(var(--gap)*1.5)] h-[2px] origin-left bg-border"
        />
        {tagline && (
          <p className="mt-[calc(var(--gap)*1.5)] font-[family-name:var(--font-heading)] text-[length:max(1.5rem,calc(var(--text-h3)*0.75))] leading-[1.05] uppercase text-muted-foreground">{tagline}</p>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[15]">
        {items.slice(0, LANES.length).map((item, i) => (
          <JuggleItem key={i} item={item} index={i} active={visible && !reduce} />
        ))}
      </div>

      <div ref={markBox} className="relative z-10 mx-auto mt-[8vw] w-[var(--container)] -mb-[0.26em]" style={size ? { fontSize: `${size}px` } : undefined}>
        <PopWords
          text={brand}
          tag="p"
          split="chars"
          overshoot={2.6}
          duration={0.75}
          margin="0px"
          className={cn(
            "mx-auto w-max whitespace-nowrap text-center font-[family-name:var(--font-display,var(--font-heading))] leading-[0.8] uppercase text-primary [-webkit-text-stroke:calc(var(--title-stroke,0em)*1)_var(--title-stroke-color,transparent)] [paint-order:stroke_fill]",
            size ? "text-[length:1em]" : "text-[length:var(--text-display)]"
          )}
        />
      </div>
    </footer>
  );
};

export default FooterJuggleWordmark;
