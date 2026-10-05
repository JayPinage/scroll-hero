import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car.jsx";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WELCOME", "ITZFIZZ"];
const STATS = [
  { value: "58%", label: "Increase in pick up point use", side: "left", top: "34%" },
  { value: "23%", label: "Decreased in customer phone calls", side: "right", top: "48%" },
  { value: "27%", label: "Increase in pick up point use", side: "left", top: "62%" },
  { value: "40%", label: "Decreased in customer phone calls", side: "right", top: "76%" },
];

export default function App() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- 1. Intro: staggered headline + stats (time based, plays once) ----
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".letter", { yPercent: 110, opacity: 0, duration: 1, stagger: 0.05 })
        .from(".car", { opacity: 0, scale: 0.8, duration: 1 }, "-=0.6")
        .from(".stat", { opacity: 0, y: 40, duration: 0.9, stagger: 0.18 }, "-=0.4");

      // ---- 2. Scroll: one scrubbed timeline, pinned hero ----
      const vh = () => window.innerHeight;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.2, // smoothing: car eases toward scroll position
          invalidateOnRefresh: true,
        },
      });

      tl.to(".car", {
        y: () => vh() * 0.55,
        scale: 1.25,
        keyframes: { x: [0, -70, 70, 0], rotation: [0, 8, -8, 0] },
        easeEach: "sine.inOut",
      }, 0);
      tl.to(".road", { y: () => -vh() * 0.9 }, 0); // lane dashes streaming past

      // Each stat "lights up" when the car reaches its row
      gsap.utils.toArray(".stat-inner").forEach((el, i) => {
        tl.fromTo(el, { opacity: 0.35, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.18 }, 0.12 + i * 0.22);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="relative h-screen overflow-hidden">
      {/* headline */}
      <h1 className="absolute inset-x-0 top-[8%] z-10 flex flex-wrap justify-center gap-x-10 px-4 text-center text-[clamp(1.4rem,5vw,4rem)] font-light">
        {WORDS.map((w) => (
          <span key={w} className="flex overflow-hidden">
            {w.split("").map((c, i) => (
              <span key={i} className="letter inline-block tracking-[0.4em] will-move">{c}</span>
            ))}
          </span>
        ))}
      </h1>

      {/* road */}
      <div className="absolute inset-y-0 left-1/2 w-28 -translate-x-1/2 bg-white/[0.04] sm:w-40">
        <div
          className="road will-move absolute -top-[100vh] h-[300vh] w-full"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,.35) 0 40px, transparent 40px 90px)",
            backgroundSize: "4px 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* car */}
      <div className="absolute left-1/2 top-[18%] z-20 w-20 -translate-x-1/2 sm:w-28">
        <Car className="car will-move w-full drop-shadow-[0_20px_30px_rgba(0,0,0,.6)]" />
      </div>

      {/* stats */}
      {STATS.map((s) => (
        <div
          key={s.value + s.top}
          className={`stat absolute w-[38%] max-w-xs ${s.side === "left" ? "left-[4%] text-left" : "right-[4%] text-right"}`}
          style={{ top: s.top }}
        >
          <div className="stat-inner will-move">
            <p className="text-5xl font-semibold text-orange-400 sm:text-7xl">{s.value}</p>
            <p className="mt-2 text-sm text-white/70 sm:text-base">{s.label}</p>
          </div>
        </div>
      ))}
    </main>
  );
}
