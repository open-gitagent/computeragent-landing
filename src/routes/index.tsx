import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import logo from "@/assets/logo.png";
import framework from "@/assets/framework.png";
import heroBg from "@/assets/crt-stool.png";
import oneDefinitionImg from "@/assets/one-definition.png";
import anyHarnessImg from "@/assets/any-harness.png";
import anyRuntimeImg from "@/assets/any-runtime.png";
import anyMemoryImg from "@/assets/any-memory.png";
import anyCommImg from "@/assets/any-comm.png";
import observabilityImg from "@/assets/observability.png";

const diagramModules = import.meta.glob("@/assets/diagrams/*.jpg", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const diagrams = Object.entries(diagramModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src], i) => ({
    src,
    title: [
      "High-Level Architecture",
      "Harness Protocol — HTTP + SSE",
      "Git URL Is The Agent Identity",
      "Substrate Runtime Matrix",
      "Permission / Governance Flow",
      "Audit & Telemetry Pipeline",
      "Library vs Server Mode",
      "SessionStore Architecture",
      "End-to-End Topology",
      "Multitenancy Architecture",
    ][i] ?? `Diagram ${i + 1}`,
  }));

export const Route = createFileRoute("/")({
  component: Index,
});

/* ---------- Smooth scroll progress bar ---------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50 bg-gradient-to-r from-transparent via-phosphor to-transparent"
    />
  );
}


function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img src={logo} alt="Lyzr Research Labs" className="w-9 h-9 rounded-lg shadow-lg transition-transform group-hover:rotate-[8deg]" />
          <span className={`font-medium tracking-tight transition-colors ${scrolled ? "text-foreground" : "text-foreground"}`}>Lyzr Research Labs</span>
        </a>
        <div className={`hidden md:flex items-center gap-8 text-sm transition-colors ${scrolled ? "text-foreground/70" : "text-foreground/70"}`}>
          {["Framework", "Harnesses", "Runtimes", "Docs"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="relative hover:text-phosphor transition group">
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-phosphor transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <a
          href="#start"
          className="px-4 py-2 rounded-md bg-phosphor text-accent-foreground text-sm font-semibold hover:opacity-90 transition shadow-[0_0_30px_-10px_var(--phosphor-glow)]"
        >
          Get started →
        </a>
      </div>
    </motion.nav>
  );
}

/* ---------- Hero with parallax ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "35%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-25%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
      <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-white">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform flex items-center justify-end pr-[4%] md:pr-[8%]">
        <img src={heroBg} alt="" className="h-[80%] w-auto object-contain drop-shadow-[0_0_60px_rgba(120,255,150,0.15)]" />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.78) 50%, transparent 80%)",
        }}
      />
      <SquaresBg />
      <div className="absolute inset-0 crt-scan opacity-15 pointer-events-none" />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-20 flex flex-col justify-center min-h-screen px-6 md:px-12 max-w-7xl mx-auto"
      >

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-[#2a2018] leading-[0.95]" style={{ textShadow: "0 2px 24px rgba(255,250,245,0.55)" }}>
          {["Computer", "Agent"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.45 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-8 max-w-xl text-lg md:text-xl text-foreground/70 leading-relaxed"
        >
          One framework to define, harness, run, and remember.
          Build computer-using agents that ship — without lock-in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-phosphor animate-pulse" />
          Open source · maintained by{" "}
          <a href="https://github.com/shreyaskapale" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-phosphor transition underline underline-offset-2">
            Shreyas Kapale
          </a>
          {" "}@{" "}
          <a href="https://lyzr.ai" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-phosphor transition underline underline-offset-2">
            Lyzr
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#start" className="px-6 py-3 rounded-md bg-phosphor text-accent-foreground font-semibold shadow-[0_0_40px_-8px_var(--phosphor-glow)] hover:scale-[1.03] active:scale-[0.99] transition">
            npm install computeragent
          </a>
          <a href="https://github.com/open-gitagent/computeragent" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-md border border-foreground/20 text-foreground hover:bg-foreground/5 transition font-medium inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-foreground/50 text-xs tracking-[0.3em] uppercase flex flex-col items-center gap-2"
      >
        <span>scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-foreground/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ---------- Reveal wrapper ---------- */
function Reveal({ children, delay = 0, y = 28, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Framework section with parallax visual ---------- */
function FrameworkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const imgRot = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  return (
    <section id="framework" ref={ref} className="relative py-16 md:py-20 px-6 md:px-12 overflow-hidden bg-card">
      {/* faint grid background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-8 md:mb-10">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-display text-phosphor text-xl mb-2">// architecture</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
                One <span className="italic text-sand-dark">framework.</span><br />
                Every layer, swappable.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.15}>
              <p className="text-muted-foreground text-base md:text-lg">
                Compose definition, harness, runtime, and memory.
                Each slot accepts the providers you already trust — or your own.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative">
          {/* Brown abstract waves spanning full width behind image */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 left-[calc(50%-50vw)] w-screen h-[80%] overflow-hidden">
            <svg
              viewBox="0 0 1600 400"
              preserveAspectRatio="none"
              className="w-full h-full"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
              }}
            >
              <g fill="none" stroke="#8b6f47" strokeWidth="0.7" strokeLinecap="round">
                {Array.from({ length: 26 }).map((_, i) => {
                  const offset = i * 11 - 80;
                  const phase = i * 0.18;
                  return (
                    <path
                      key={`h-${i}`}
                      d={`M0,${200 + offset + Math.sin(phase) * 8} C200,${140 + offset + Math.sin(phase + 1) * 10} 400,${260 + offset + Math.sin(phase + 2) * 10} 600,${190 + offset} C800,${130 + offset + Math.sin(phase + 3) * 12} 1000,${270 + offset} 1200,${200 + offset} C1400,${140 + offset + Math.sin(phase + 4) * 10} 1600,${230 + offset} 1600,${200 + offset}`}
                      opacity={0.18 + (i % 4) * 0.05}
                    />
                  );
                })}
                {Array.from({ length: 50 }).map((_, i) => {
                  const x = i * 33;
                  return (
                    <path
                      key={`v-${i}`}
                      d={`M${x},20 C${x + 10},140 ${x - 10},260 ${x},380`}
                      opacity={0.1}
                    />
                  );
                })}
              </g>
            </svg>
          </div>

          <Reveal delay={0.1} y={40}>
            <motion.div
              style={{ y: imgY, rotate: imgRot }}
              className="relative will-change-transform max-w-[78%] mx-auto -mt-2"
            >
              <img
                src={framework}
                alt="ComputerAgent framework diagram"
                className="w-full block"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                  maskComposite: "intersect",
                }}
              />
            </motion.div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

const pillars = [
  { tag: "Full Observability", title: "Every step, traced and replayable", body: "OpenTelemetry-native traces, structured logs, token and cost metrics on every run. Inspect prompts, tool calls, and decisions side-by-side — debug agents like you debug code." },
  { tag: "Policy Guardrails", title: "Safety as a first-class primitive", body: "Declarative guardrails for PII, tool scopes, spend ceilings, and content policy. Enforced at the runtime boundary — block, redact, or require approval before an action ever ships." },
  { tag: "On-Demand Compute", title: "Spawn, execute, persist, vanish", body: "Agents wake only when there's work. Each run hydrates state, completes the job, snapshots cleanly, and releases the CPU. Zero idle burn, zero noisy neighbors, pay only for the milliseconds you used." },
  { tag: "One Definition", title: "GitHub. GitLab. Bitbucket.", body: "Define agents once with Open Git Agent Protocol (OpenGAP). Also define governance policies, budget policies, tool permissions, and review rules — all source-controlled, portable, and reviewable." },
  { tag: "Any Harness", title: "Pluggable control loops", body: "Bring your own harness or pick from the open registry. Switch without rewrites." },
  { tag: "Any Runtime", title: "Local, E2B, OpenShell", body: "Run on your laptop or a remote sandbox. Same code path, same guarantees." },
  { tag: "Any Memory", title: "Cognis, mem0, supermemory", body: "Plug into the memory layer that fits your workload — vector, graph, or hybrid." },
  { tag: "Any Comm", title: "Slack, WhatsApp, Teams", body: "Connect to any communication API. Route agent outputs through Slack, WhatsApp, Teams, or custom webhooks — no extra glue." },
];

function Pillars() {
  const [active, setActive] = useState(0);
  const count = pillars.length;
  const next = () => setActive((a) => (a + 1) % count);
  const prev = () => setActive((a) => (a - 1 + count) % count);

  // semi-circle facing left: cards arc on the right edge of the screen
  const radius = 360;
  const arcSpan = 140; // total degrees fanned

  const pillarImgs = [observabilityImg, oneDefinitionImg, anyHarnessImg, oneDefinitionImg, anyHarnessImg, anyRuntimeImg, anyMemoryImg, anyCommImg];
  const imgFor = (i: number) => pillarImgs[i] ?? oneDefinitionImg;

  return (
    <section id="harness" className="relative py-24 md:py-32 px-6 md:px-12 bg-sand/40 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, var(--phosphor-glow) 0%, transparent 55%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <p className="font-display text-sand-dark text-2xl mb-3">// pillars</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Eight slots. <span className="italic text-sand-dark">Infinite stacks.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[640px]">
          {/* Active card detail on the left */}
          <div className="relative">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 md:p-10 rounded-2xl bg-card border border-border shadow-[0_30px_70px_-30px_rgba(0,0,0,0.3)]"
            >
              <div className="font-display text-sand-dark text-sm mb-6 tracking-wide">
                0{active + 1} / {pillars[active].tag}
              </div>
              <div className="flex items-center justify-center mb-6 h-56">
                <img src={imgFor(active)} alt="" className="max-h-full max-w-[280px] object-contain" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 leading-tight">
                {pillars[active].title}
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {pillars[active].body}
              </p>
            </motion.div>

            {/* progress dots */}
            <div className="mt-6 flex items-center gap-2">
              {pillars.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show pillar ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-phosphor" : "w-3 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Semi-circle rotator on the right */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[600px]">
              {/* arc guide */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 520 600">
                <path
                  d={`M 520 ${300 - radius} A ${radius} ${radius} 0 0 0 520 ${300 + radius}`}
                  fill="none"
                  stroke="var(--sand-dark)"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                />
              </svg>

              {pillars.map((p, i) => {
                // distance from active in circular ring
                let diff = i - active;
                if (diff > count / 2) diff -= count;
                if (diff < -count / 2) diff += count;
                const angle = (diff / (count - 1)) * arcSpan; // degrees, 0 = center
                const rad = (angle * Math.PI) / 180;
                // anchor right edge; arc opens to the left
                const x = 520 - radius * Math.cos(rad);
                const y = 300 + radius * Math.sin(rad);
                const isActive = i === active;
                const dist = Math.abs(diff);

                return (
                  <motion.button
                    key={p.tag}
                    onClick={() => setActive(i)}
                    animate={{
                      x: x - 80,
                      y: y - 80,
                      scale: isActive ? 1.15 : 1 - dist * 0.12,
                      opacity: isActive ? 1 : 0.55 - dist * 0.1,
                      rotate: angle * 0.5,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: isActive ? 1.18 : 1 - dist * 0.12 + 0.06, opacity: 1 }}
                    className={`absolute top-0 left-0 w-40 h-40 rounded-2xl border bg-card flex flex-col items-center justify-center p-4 text-center ${
                      isActive
                        ? "border-phosphor shadow-[0_20px_60px_-15px_var(--phosphor-glow)] z-20"
                        : "border-border shadow-sm z-10"
                    }`}
                    style={{ transformOrigin: "center" }}
                  >
                    <img src={imgFor(i)} alt="" className="max-h-16 max-w-[100px] object-contain mb-2" />
                    <div className="text-xs font-display text-sand-dark tracking-wide">0{i + 1}</div>
                    <div className="text-xs font-semibold text-foreground leading-tight mt-1 line-clamp-2">
                      {p.tag}
                    </div>
                  </motion.button>
                );
              })}

              {/* Next/Prev buttons on the right side, vertically stacked along arc */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="w-12 h-12 rounded-full bg-card border border-border hover:border-phosphor hover:text-phosphor transition flex items-center justify-center shadow-md"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="w-12 h-12 rounded-full bg-phosphor text-accent-foreground hover:opacity-90 transition flex items-center justify-center shadow-[0_0_30px_-8px_var(--phosphor-glow)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile fallback: simple prev/next */}
          <div className="flex lg:hidden items-center justify-center gap-4">
            <button onClick={prev} aria-label="Previous" className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={next} aria-label="Next" className="w-12 h-12 rounded-full bg-phosphor text-accent-foreground flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureCarousel() {
  const [index, setIndex] = useState(0);
  const count = diagrams.length;
  const go = (i: number) => setIndex(((i % count) + count) % count);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section id="architecture" className="relative py-24 md:py-32 px-6 md:px-12 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="font-display text-phosphor text-2xl mb-3">// architecture</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-3">
            Harness Protocol. <span className="italic text-muted-foreground">One system.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Every orthogonal axis of ComputerAgent, drawn out. Swipe through the full architecture.
          </p>
        </Reveal>

        <div className="relative">
          <div className="relative aspect-[4/3] md:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]" style={{ backgroundColor: "#ebe2d2" }}>
            {diagrams.map((d, i) => (
              <motion.img
                key={d.src}
                src={d.src}
                alt={d.title}
                initial={false}
                animate={{
                  opacity: i === index ? 1 : 0,
                  scale: i === index ? 1 : 1.02,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply"
                style={{ filter: "sepia(30%) saturate(85%) hue-rotate(-4deg) brightness(1.02) contrast(0.98)" }}
                draggable={false}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{ backgroundColor: "#e8dcc4", opacity: 0.22 }} />
            <div className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(120,90,50,0.10) 100%)" }} />

            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-ink/80 text-sand text-xs font-display backdrop-blur">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} — {diagrams[index].title}
            </div>

            <button
              onClick={prev}
              aria-label="Previous diagram"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-phosphor hover:text-accent-foreground transition shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={next}
              aria-label="Next diagram"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-phosphor text-accent-foreground flex items-center justify-center hover:scale-105 transition shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {diagrams.map((d, i) => (
              <button
                key={d.src}
                onClick={() => go(i)}
                className={`relative shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-md overflow-hidden border-2 transition ${
                  i === index ? "border-phosphor opacity-100" : "border-border opacity-50 hover:opacity-80"
                }`}
                aria-label={`Go to ${d.title}`}
              >
                <img src={d.src} alt="" className="w-full h-full object-cover mix-blend-multiply" style={{ filter: "sepia(30%) saturate(85%) hue-rotate(-4deg) brightness(1.02) contrast(0.98)", backgroundColor: "#ebe2d2" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const codeY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section id="start" ref={ref} className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4">
            <Reveal>
              <p className="font-display text-phosphor text-2xl mb-3">// Ten diagrams</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">From import to running agent.</h2>
              <p className="text-muted-foreground">No glue code. No vendor adapters. Just composition.</p>
            </Reveal>
          </div>
          <Reveal delay={0.15} y={40} className="md:col-span-8">
            <motion.div
              style={{ y: codeY }}
              className="relative rounded-xl bg-ink text-sand p-6 md:p-8 font-display text-sm md:text-base shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] overflow-x-auto will-change-transform"
            >
              <div
                className="absolute -inset-px rounded-xl pointer-events-none opacity-60"
                style={{ background: "linear-gradient(140deg, var(--phosphor-glow), transparent 40%)", mixBlendMode: "overlay" }}
              />
              <div className="flex gap-1.5 mb-4 relative">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <pre className="leading-relaxed relative">
{`> `}<span className="text-[#c9a0dc]">import</span>{` { ComputerAgent } `}<span className="text-[#c9a0dc]">from</span>{` `}<span className="text-[#e8a87c]">"computeragent"</span>{`;
> `}<span className="text-[#c9a0dc]">import</span>{` { E2BSubstrate } `}<span className="text-[#c9a0dc]">from</span>{` `}<span className="text-[#e8a87c]">"@computeragent/runtime-e2b"</span>{`;
>
> `}<span className="text-[#c9a0dc]">const</span>{` agent = `}<span className="text-[#c9a0dc]">new</span>{` `}<span className="text-phosphor">ComputerAgent</span>{`({
    source:       { type: `}<span className="text-[#e8a87c]">"git"</span>{`, url: `}<span className="text-[#e8a87c]">"github.com/open-gitagent/trading-agent"</span>{` },
    harness:      `}<span className="text-[#e8a87c]">"claude-agent-sdk"</span>{`,
    runtime:      `}<span className="text-[#c9a0dc]">new</span>{` `}<span className="text-phosphor">E2BSubstrate</span>{`({ apiKey: process.env.E2B_API_KEY! }),
    sessionStore: { kind: `}<span className="text-[#e8a87c]">"mongo"</span>{`, options: { url: MONGO_URL, database: `}<span className="text-[#e8a87c]">"agentos"</span>{` } },
    envs:         { ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY! },
  });
>
> `}<span className="text-[#c9a0dc]">await</span>{` agent.`}<span className="text-[#7dd3fc]">chat</span>{`(`}<span className="text-[#e8a87c]">"book my flight"</span>{`);
`}              </pre>

            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DocBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-ink text-sand p-5 md:p-6 font-display text-xs md:text-sm overflow-x-auto shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
      <pre className="leading-relaxed whitespace-pre">{children}</pre>
    </div>
  );
}

function DocH3({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 scroll-mt-24">
      {children}
    </h3>
  );
}

function DocH4({ children }: { children: React.ReactNode }) {
  return <h4 className="text-lg md:text-xl font-semibold tracking-tight mt-8 mb-3">{children}</h4>;
}

function DocP({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">{children}</p>;
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex gap-3 py-1.5">
      <code className="font-display text-phosphor min-w-[200px] text-xs md:text-sm">{k}</code>
      <span className="text-muted-foreground text-sm">{v}</span>
    </li>
  );
}

function DocsSection() {
  const installs = [
    { label: "Umbrella SDK", cmd: "npm install computeragent" },
    { label: "E2B microVM runtime", cmd: "npm install @computeragent/runtime-e2b" },
    { label: "Linux bwrap runtime", cmd: "npm install @computeragent/runtime-bwrap" },
    { label: "Apple VZ runtime", cmd: "npm install @computeragent/runtime-vzvm" },
    { label: "Mongo session store", cmd: "npm install @open-gitagent/session-store-mongo" },
    { label: "SQLite session store", cmd: "npm install @computeragent/session-store-sqlite" },
    { label: "Mongo telemetry + registry", cmd: "npm install @open-gitagent/agent-registry-mongo" },
    { label: "Observability (OTel gen_ai.*)", cmd: "npm install @computeragent/observability" },
  ];

  const coreOptions = [
    { name: "source", type: "IdentitySource | string", req: true, desc: "Where to load the agent from. String form is shorthand for { type: 'git', url }." },
    { name: "harness", type: '"claude-agent-sdk" | "gitagent" | "deepagents" | string', req: true, desc: "Engine to drive the loop. Custom engines registered on the harness server are accepted." },
    { name: "runtime", type: '"local" | Substrate | string', req: false, desc: "Where the harness runs. Pass a Substrate to have the SDK call bootHarness() on first chat." },
    { name: "harnessUrl", type: "string", req: false, desc: "Override the harness URL. Defaults to http://127.0.0.1:7700." },
    { name: "envs", type: "Record<string, string>", req: false, desc: "Env vars forwarded to the engine subprocess (ANTHROPIC_API_KEY, GITHUB_TOKEN, …)." },
    { name: "model", type: "string", req: false, desc: "Override the agent's model.preferred. Engine-specific value." },
    { name: "temperature", type: "number", req: false, desc: "Override model.constraints.temperature. Honored by engines that expose it." },
    { name: "baseUrl", type: "string", req: false, desc: "Custom Anthropic-compatible endpoint. Useful for Helicone, OpenRouter, LiteLLM." },
    { name: "sessionId", type: "string", req: false, desc: "Resume a specific session. With sessionStore, replays prior entries." },
    { name: "sessionStore", type: "SessionStoreConfig", req: false, desc: "Conversation memory backend: memory, file, mongo, sqlite." },
    { name: "attachments", type: "Attachment[]", req: false, desc: "Files materialized into the agent's workdir before the engine starts. Path-jailed." },
    { name: "options", type: "Record<string, unknown>", req: false, desc: "Engine-specific options forwarded as body.options (permissionMode, maxTurns, …)." },
    { name: "onToolCall", type: "(ctx) => PermissionDecision", req: false, desc: "HITL callback for tool gating. Auto-allows if omitted." },
    { name: "policy", type: "{ kind: 'srs', endpoint, apiKey, policyId, principalId }", req: false, desc: "Per-session policy decider config." },
    { name: "telemetry", type: "AgentTelemetry", req: false, desc: "Telemetry hook (e.g. MongoTelemetry)." },
    { name: "identityLoader", type: "string", req: false, desc: "Identity loader. Default: 'gitagentprotocol'." },
    { name: "fetch", type: "typeof fetch", req: false, desc: "Custom fetch impl (tests, proxies)." },
    { name: "debug", type: "boolean", req: false, desc: "Forces COMPUTERAGENT_LOG=debug and emits one client log per consumed event." },
  ];

  const methods = [
    { name: "agent.chat(input)", ret: "ChatHandle", desc: "The main turn. Dual interface — iterate events or await result." },
    { name: "agent.dispose()", ret: "Promise<void>", desc: "Tear down the substrate, delete the server session. Implicit with `await using`." },
    { name: "agent.harnessUrl()", ret: "Promise<string>", desc: "The resolved harness URL." },
    { name: "agent.fetchArtifact(path)", ret: "Promise<Uint8Array | null>", desc: "Pull a file the agent wrote out of its workdir." },
    { name: "agent.listWorkdir(opts?)", ret: "Promise<FsTreeEntry[]>", desc: "List the agent's workdir contents." },
  ];

  const handleApi = [
    { use: "for await (const ev of handle)", what: "Raw HarnessEvents as they arrive" },
    { use: "await handle / handle.result()", what: "ChatResult — drained to completion" },
    { use: "handle.getUsage()", what: "Snapshot of running UsageRollup at any time" },
    { use: "handle.sessionId()", what: "Resolves to the real session id once POST /v1/sessions returns" },
    { use: "handle.cancel()", what: "POST /v1/sessions/:id/cancel to abort the turn" },
    { use: "handle.respondToPermission(callId, d)", what: "Manually answer a permission request" },
  ];

  const substrates = [
    { name: "LocalSubstrate", pkg: "computeragent (bundled)", use: "Dev, library-mode in your existing worker", boot: "<100ms (subprocess)" },
    { name: "BwrapSubstrate", pkg: "@computeragent/runtime-bwrap", use: "Isolation without containers on Linux", boot: "~50ms (user-namespaces)" },
    { name: "E2BSubstrate", pkg: "@computeragent/runtime-e2b", use: "Strong isolation, untrusted code", boot: "~2s (Firecracker microVM)" },
    { name: "VZSubstrate", pkg: "@computeragent/runtime-vzvm", use: "macOS-native VM, full OS, persistent disk", boot: "~3s (Tart-managed VZ)" },
  ];

  const engines = [
    { name: "claude-agent-sdk", wraps: "@anthropic-ai/claude-agent-sdk v0.2.x", use: "Default. Streaming + tool use + permission callback + sessions + budget." },
    { name: "gitagent", wraps: "gitclaw CLI", use: "Any OpenAI-compatible model (openai:<model>@<baseUrl>); GAP-native agents." },
    { name: "deepagents", wraps: "LangChain deepagents", use: "LangGraph-style agents needing LangChain ecosystem tool integrations." },
  ];

  const sessionStores = [
    { k: '"memory"', pkg: "built-in", backend: "In-process map (default — non-persistent)" },
    { k: '"file"', pkg: "built-in", backend: "JSONL on local disk" },
    { k: '"mongo"', pkg: "@open-gitagent/session-store-mongo", backend: "MongoDB collection" },
    { k: '"sqlite"', pkg: "@computeragent/session-store-sqlite", backend: "Local SQLite DB" },
  ];

  const restEndpoints = [
    ["GET", "/health", "Liveness"],
    ["POST", "/v1/sessions", "Start a session — returns SSE event stream"],
    ["GET", "/v1/sessions/:id", "Session status"],
    ["POST", "/v1/sessions/:id/messages", "Push a user turn (multi-turn flow)"],
    ["POST", "/v1/sessions/:id/permission/:callId", "Respond to a permission request"],
    ["POST", "/v1/sessions/:id/cancel", "Abort the in-flight turn"],
    ["DELETE", "/v1/sessions/:id", "Tear down + free workdir"],
    ["GET", "/v1/sessions/:id/fs/tree?depth=N", "List the agent's workdir"],
    ["GET", "/v1/sessions/:id/fs/file?path=...", "Fetch a file the agent wrote"],
  ];

  const envVars = [
    ["ANTHROPIC_API_KEY", "Anthropic direct path"],
    ["ANTHROPIC_BASE_URL", "Override Anthropic endpoint (Helicone, OpenRouter, proxies)"],
    ["CLAUDE_CODE_USE_BEDROCK", "Route through AWS Bedrock instead of Anthropic direct"],
    ["AWS_REGION / AWS_DEFAULT_REGION", "Bedrock region"],
    ["AWS_BEDROCK_MODEL_ID", "e.g. us.anthropic.claude-haiku-4-5-20251001-v1:0"],
    ["AWS_ROLE_ARN / AWS_WEB_IDENTITY_TOKEN_FILE", "IRSA-injected on EKS"],
    ["AWS_PROFILE / AWS_SHARED_CREDENTIALS_FILE / AWS_CONFIG_FILE", "Alternative AWS auth paths"],
    ["GITHUB_TOKEN", "For cloning private agent source repos"],
    ["OTEL_EXPORTER_OTLP_ENDPOINT", "OTLP collector URL (turns on OtelAuditSink)"],
    ["OTEL_SERVICE_NAME", "Service name on emitted spans (default: computeragent)"],
    ["COMPUTERAGENT_LOG", "debug / info / warn / error / silent"],
  ];

  const errors = [
    { name: "HarnessProtocolError", when: "Server returned a non-2xx, malformed SSE, or unexpected message order" },
    { name: "UnknownEngineError", when: "harness: value isn't registered on the running server" },
    { name: "UnknownLoaderError", when: "identityLoader: value isn't registered" },
    { name: "UnknownStoreError", when: "sessionStore.kind isn't registered" },
  ];

  const companions = [
    ["@open-gitagent/protocol", "Wire-protocol schemas (Zod) — HarnessEvent, IdentitySource, REST shapes"],
    ["@open-gitagent/sdk", "The user-facing SDK (ComputerAgent, ChatHandle, runTask)"],
    ["@open-gitagent/runtime-local", "Default LocalSubstrate"],
    ["@computeragent/runtime-bwrap", "Linux user-namespace sandbox"],
    ["@computeragent/runtime-e2b", "E2B microVM substrate"],
    ["@computeragent/runtime-vzvm", "Apple VZ.framework substrate (Tart)"],
    ["@computeragent/harness-server", "The Hono-based server that hosts engines + substrates"],
    ["@computeragent/engine-claude-agent-sdk", "Engine wrapping @anthropic-ai/claude-agent-sdk"],
    ["@computeragent/engine-gitagent", "Engine wrapping gitclaw (any OpenAI-compatible upstream)"],
    ["@computeragent/engine-deepagents", "Engine wrapping LangChain deepagents"],
    ["@open-gitagent/agent-registry-mongo", "MongoTelemetry + Mongo-backed AgentRegistry"],
    ["@open-gitagent/session-store-mongo", "Mongo SessionStore"],
    ["@computeragent/session-store-sqlite", "SQLite SessionStore"],
    ["@computeragent/observability", "configureOtel() + OtelAuditSink (gen_ai.* spans)"],
    ["@computeragent/observability-api", "Express read API over ClickHouse"],
    ["@computeragent/llm-proxy-openai", "Anthropic Messages ↔ OpenAI Chat Completions translator"],
    ["@computeragent/identity-gitagentprotocol", "Default IdentityLoader — clones GAP repos"],
    ["@computeragent/testing", "Table-driven conformance suite"],
    ["@computeragent/cli", "CLI"],
    ["computeragent", "Umbrella entry point — re-exports SDK + LocalSubstrate"],
    ["create-computeragent", "npx create-computeragent my-agent scaffolder"],
  ];

  const toc = [
    ["install", "Install"],
    ["quickstart", "Quickstart"],
    ["core-api", "Core API"],
    ["chat-handle", "ChatHandle"],
    ["identity", "IdentitySource"],
    ["substrates", "Substrates"],
    ["engines", "Engines"],
    ["sessions", "Session stores"],
    ["telemetry", "Telemetry"],
    ["permissions", "Permissions / HITL"],
    ["policy", "Policy guardrails"],
    ["config", "Configuration"],
    ["wire", "HTTP wire protocol"],
    ["cli", "CLI"],
    ["errors", "Errors"],
    ["packages", "Companion packages"],
    ["versioning", "Versioning"],
  ];

  return (
    <section id="docs" className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden border-t border-border/50">
      <SquaresBg />
      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <p className="font-display text-phosphor text-2xl mb-3">// Docs</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">Reference.</h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            The complete API and protocol reference for <code className="font-display text-foreground">computeragent</code> and the
            <code className="font-display text-foreground"> @open-gitagent/*</code> / <code className="font-display text-foreground">@computeragent/*</code> workspace packages.
          </p>
        </Reveal>

        {/* Table of contents */}
        <Reveal delay={0.05} className="mt-10">
          <div className="rounded-xl border border-border p-5 bg-muted/10">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">On this page</div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {toc.map(([id, label]) => (
                <a key={id} href={`#doc-${id}`} className="text-foreground/70 hover:text-phosphor transition">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Install */}
        <Reveal delay={0.05} className="mt-16">
          <DocH3 id="doc-install">Install</DocH3>
          <DocP>
            The umbrella package gives you <code className="font-display text-foreground">ComputerAgent</code>, <code className="font-display text-foreground">runTask</code>,
            <code className="font-display text-foreground"> LocalSubstrate</code>, and all SDK types — enough for a complete agent in one import.
          </DocP>
          <div className="grid md:grid-cols-2 gap-3">
            {installs.map((i) => (
              <div key={i.cmd} className="rounded-lg bg-ink text-sand p-4 font-display text-xs md:text-sm overflow-x-auto">
                <div className="text-xs text-sand/50 mb-1">{i.label}</div>
                <code className="text-phosphor">$ {i.cmd}</code>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Requires Node 22+ or Bun 1.1+ (the SDK targets modern async iterators + `using` semantics).</p>
        </Reveal>

        {/* Quickstart */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-quickstart">Quickstart</DocH3>
          <DocBlock>
{`import { ComputerAgent, LocalSubstrate } from "computeragent";

const agent = new ComputerAgent({
  source:  { type: "git", url: "github.com/open-gitagent/general-agent" },
  harness: "claude-agent-sdk",
  runtime: new LocalSubstrate(),
  envs:    { ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY! },
});

const result = await agent.chat("Summarize this repo in two sentences.");
console.log(result.messages.at(-1));
console.log(\`Cost: $\${result.usage.costUsd}\`);`}
          </DocBlock>
          <DocP>
            Same shape works against any substrate (<code className="font-display text-foreground">E2BSubstrate</code>, <code className="font-display text-foreground">BwrapSubstrate</code>, …),
            any engine, and any session store.
          </DocP>
        </Reveal>

        {/* Core API */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-core-api">Core API — ComputerAgentOptions</DocH3>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground px-4 py-3">
              <div className="col-span-3">Field</div>
              <div className="col-span-1">Req</div>
              <div className="col-span-4">Type</div>
              <div className="col-span-4">What it does</div>
            </div>
            {coreOptions.map((o, idx) => (
              <div key={o.name} className={`grid grid-cols-12 px-4 py-3 text-sm ${idx % 2 ? "bg-background" : "bg-muted/10"}`}>
                <div className="col-span-3 font-display text-phosphor">{o.name}</div>
                <div className="col-span-1 text-muted-foreground">{o.req ? "✓" : ""}</div>
                <div className="col-span-4 font-display text-xs text-foreground/80 break-words">{o.type}</div>
                <div className="col-span-4 text-muted-foreground">{o.desc}</div>
              </div>
            ))}
          </div>

          <DocH4>Methods</DocH4>
          <div className="rounded-xl border border-border overflow-hidden">
            {methods.map((m, idx) => (
              <div key={m.name} className={`grid grid-cols-12 px-4 py-3 text-sm ${idx % 2 ? "bg-background" : "bg-muted/10"}`}>
                <code className="col-span-4 font-display text-phosphor break-all">{m.name}</code>
                <code className="col-span-3 font-display text-xs text-foreground/80 break-all">{m.ret}</code>
                <div className="col-span-5 text-muted-foreground">{m.desc}</div>
              </div>
            ))}
          </div>

          <DocH4>Disposal</DocH4>
          <DocBlock>
{`// Explicit:
const agent = new ComputerAgent({...});
try { /* … */ } finally { await agent.dispose(); }

// Modern (auto-dispose at scope exit):
await using agent = new ComputerAgent({...});
// no try/finally needed`}
          </DocBlock>
        </Reveal>

        {/* ChatHandle */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-chat-handle">agent.chat() and ChatHandle</DocH3>
          <DocP>
            <code className="font-display text-foreground">ChatHandle</code> has a dual interface, inspired by <code className="font-display text-foreground">client.messages.stream(...)</code> in the Anthropic SDK.
          </DocP>
          <ul className="rounded-xl border border-border divide-y divide-border">
            {handleApi.map((h) => (
              <li key={h.use} className="grid grid-cols-12 gap-3 px-4 py-3 text-sm">
                <code className="col-span-5 font-display text-phosphor break-all">{h.use}</code>
                <span className="col-span-7 text-muted-foreground">{h.what}</span>
              </li>
            ))}
          </ul>

          <DocH4>ChatResult</DocH4>
          <DocBlock>
{`interface ChatResult {
  readonly sessionId: string;
  readonly messages: ReadonlyArray<unknown>;
  readonly ended: { kind: "ca_session_ended"; reason: string; errorMessage?: string };
  readonly usage: UsageRollup;
}

interface UsageRollup {
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly cacheCreationInputTokens: number;
  readonly cacheReadInputTokens: number;
  readonly costUsd: number | undefined;
}`}
          </DocBlock>
          <DocP>
            Cost semantics: tokens always SUM across <code className="font-display text-foreground">ca_usage_snapshot</code> events.
            Cost depends on the engine's <code className="font-display text-foreground">costSemantic</code>:
            <code className="font-display text-foreground"> "cumulative"</code> (claude-agent-sdk) takes the MAX;
            <code className="font-display text-foreground"> "delta"</code> (gitclaw) SUMs.
          </DocP>

          <DocH4>ChatInput</DocH4>
          <DocBlock>
{`type ChatInput =
  | string                              // user text
  | UserMessage                         // {role:"user", content:[...]}
  | UserMessage[]                       // multi-message turn
  | AsyncIterable<UserMessage>;         // streaming input`}
          </DocBlock>

          <DocH4>runTask — one-shot</DocH4>
          <DocBlock>
{`import { runTask, LocalSubstrate } from "computeragent";

const result = await runTask({
  source:  { type: "git", url: "github.com/<org>/<repo>" },
  harness: "claude-agent-sdk",
  runtime: new LocalSubstrate(),
  envs:    { ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY! },
  message: "Summarize the code in 3 bullets.",
});`}
          </DocBlock>
        </Reveal>

        {/* IdentitySource */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-identity">IdentitySource — where the agent comes from</DocH3>
          <DocH4>{`{ type: "git" } — clone from a remote repo`}</DocH4>
          <DocBlock>
{`source: {
  type:   "git",
  url:    "github.com/<org>/<repo>",
  ref:    "v1.2.3",            // optional — branch/tag/SHA
  subdir: "agents/triage",     // optional — sub-path inside the repo
}`}
          </DocBlock>
          <DocP>
            The git URL is the canonical agent identity. With <code className="font-display text-foreground">MongoTelemetry</code>,
            the same URL across machines deduplicates to the same <code className="font-display text-foreground">agent_registry</code> row.
            Authentication: set <code className="font-display text-foreground">GITHUB_TOKEN</code> in <code className="font-display text-foreground">envs</code> — the harness bakes
            it into the clone URL; your token never reaches the engine subprocess.
          </DocP>

          <DocH4>{`{ type: "local" } — use a directory already on disk`}</DocH4>
          <DocBlock>
{`source: {
  type: "local",
  path: "/Users/me/my-agent",
}`}
          </DocBlock>

          <DocH4>{`{ type: "inline" } — pass the manifest in-memory`}</DocH4>
          <DocBlock>
{`source: {
  type: "inline",
  manifest: { name: "hello", version: "0.1.0" },
  files: {
    "agent.yaml": [
      'spec_version: "0.1.0"',
      "name: hello",
      "version: 0.1.0",
      "model:",
      "  preferred: claude-haiku-4-5-20251001",
    ].join("\\n"),
    "SOUL.md": "Respond in one short sentence.",
  },
}`}
          </DocBlock>

          <DocH4>String shorthand</DocH4>
          <DocBlock>{`source: "github.com/<org>/<repo>"   // → { type: "git", url: "github.com/<org>/<repo>" }`}</DocBlock>
        </Reveal>

        {/* Substrates */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-substrates">Substrates — where the agent runs</DocH3>
          <DocP>
            A <code className="font-display text-foreground">Substrate</code> hosts the harness server. The SDK calls{" "}
            <code className="font-display text-foreground">substrate.bootHarness()</code> on first <code className="font-display text-foreground">chat()</code>,
            gets back a URL, and proxies everything else through it.
          </DocP>
          <div className="grid md:grid-cols-2 gap-4">
            {substrates.map((s) => (
              <div key={s.name} className="rounded-xl border border-border p-5 hover:border-phosphor/50 transition">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-display text-phosphor">{s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.boot}</span>
                </div>
                <div className="text-xs font-display text-foreground/70 mb-2">{s.pkg}</div>
                <p className="text-sm text-muted-foreground">{s.use}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <DocBlock>
{`// E2B cloud microVM
import { E2BSubstrate } from "@computeragent/runtime-e2b";
runtime: new E2BSubstrate({
  apiKey:     process.env.E2B_API_KEY!,
  templateId: "computeragent-base",
}),

// Linux bubblewrap
import { BwrapSubstrate } from "@computeragent/runtime-bwrap";
runtime: new BwrapSubstrate({
  bind: ["/etc/ssl/certs:/etc/ssl/certs:ro"],
}),`}
            </DocBlock>
          </div>
        </Reveal>

        {/* Engines */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-engines">Engines (harnesses) — the agent loop</DocH3>
          <div className="space-y-3">
            {engines.map((e) => (
              <div key={e.name} className="rounded-xl border border-border p-5 grid md:grid-cols-12 gap-3 items-center">
                <code className="md:col-span-3 font-display text-phosphor">{e.name}</code>
                <div className="md:col-span-4 text-foreground/80 font-display text-xs">{e.wraps}</div>
                <div className="md:col-span-5 text-sm text-muted-foreground">{e.use}</div>
              </div>
            ))}
          </div>
          <DocP>
            <span className="block mt-6">
              <strong className="text-foreground">harness</strong> is a string — open to extension. TypeScript narrows the built-ins for autocomplete;
              any string the running harness server has registered is accepted at runtime. Custom engines: implement{" "}
              <code className="font-display text-foreground">EngineDriver</code> and register via{" "}
              <code className="font-display text-foreground">createHarnessServer({"{ engines }"})</code>.
            </span>
          </DocP>
        </Reveal>

        {/* Session stores */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-sessions">Session stores — conversation memory</DocH3>
          <div className="rounded-xl border border-border overflow-hidden mb-6">
            <div className="grid grid-cols-12 bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground px-4 py-3">
              <div className="col-span-2">Kind</div>
              <div className="col-span-5">Package</div>
              <div className="col-span-5">Backend</div>
            </div>
            {sessionStores.map((s, idx) => (
              <div key={s.k} className={`grid grid-cols-12 px-4 py-3 text-sm ${idx % 2 ? "bg-background" : "bg-muted/10"}`}>
                <code className="col-span-2 font-display text-phosphor">{s.k}</code>
                <code className="col-span-5 font-display text-xs text-foreground/80 break-all">{s.pkg}</code>
                <div className="col-span-5 text-muted-foreground">{s.backend}</div>
              </div>
            ))}
          </div>
          <DocBlock>
{`// MongoDB — shared across pods, resume from any worker
sessionStore: {
  kind: "mongo",
  options: { url: process.env.MONGO_URL!, database: "agentos" },
},

// Resume a session
const agent = new ComputerAgent({
  ...opts,
  sessionId:    "sess_abc123",
  sessionStore: { kind: "mongo", options: { url, database } },
});
await agent.chat("Continue where we left off.");`}
          </DocBlock>
        </Reveal>

        {/* Telemetry */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-telemetry">Telemetry — AgentTelemetry + AuditSink</DocH3>
          <DocH4>AgentTelemetry (SDK-side, library-mode)</DocH4>
          <DocBlock>
{`import { ComputerAgent } from "computeragent";
import { MongoTelemetry } from "@open-gitagent/agent-registry-mongo";

const agent = new ComputerAgent({
  ...opts,
  telemetry: new MongoTelemetry({
    url:      process.env.MONGO_URL!,
    database: "agentos",
    agent:    { name: "triage", source: opts.source, harness: opts.harness },
  }),
});`}
          </DocBlock>
          <DocP>Hooks fired (all optional, fire-and-forget — exceptions never propagate):</DocP>
          <DocBlock>
{`interface AgentTelemetry {
  onAgentConstructed?(info: AgentConstructedInfo): void | Promise<void>;
  onChatStart?(info: ChatStartInfo): void | Promise<unknown>;
  onChatEnd?(info: ChatEndInfo, context?: unknown): void | Promise<void>;
  onClose?(): void | Promise<void>;
}`}
          </DocBlock>

          <DocH4>AuditSink (harness-side, server-mode)</DocH4>
          <DocBlock>
{`import { configureOtel, OtelAuditSink } from "@computeragent/observability";

configureOtel({
  serviceName: "computeragent",
  exporter:    "otlp-http",
  endpoint:    process.env.OTEL_EXPORTER_OTLP_ENDPOINT!,
});

const auditSink = new OtelAuditSink();
const server    = new ComputerAgentServer({ /* ..., */ auditSink });`}
          </DocBlock>
          <DocP>
            Spans use the OpenTelemetry <code className="font-display text-foreground">gen_ai.*</code> semantic conventions —
            any OTel-compatible APM (Honeycomb, Datadog, Grafana, ClickHouse) renders them natively.
          </DocP>
        </Reveal>

        {/* Permissions */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-permissions">Permissions / Human-in-the-loop</DocH3>
          <DocH4>onToolCall callback (per-agent)</DocH4>
          <DocBlock>
{`const agent = new ComputerAgent({
  ...opts,
  onToolCall: async ({ callId, toolName, input, risk }) => {
    if (toolName === "Bash" && (input as { command?: string }).command?.startsWith("rm")) {
      return { decision: "deny", reason: "rm denied by policy" };
    }
    return { decision: "allow" };
  },
});`}
          </DocBlock>
          <DocH4>PermissionDecision shapes</DocH4>
          <DocBlock>
{`type PermissionDecision =
  | { decision: "allow" }
  | { decision: "deny";   reason?: string }
  | { decision: "modify"; input: Record<string, unknown> };`}
          </DocBlock>
          <DocH4>TTY approval (CLI scripts)</DocH4>
          <DocBlock>
{`import { ttyApproval } from "computeragent";

const agent = new ComputerAgent({
  ...opts,
  onToolCall: ttyApproval(),   // prompts at the terminal for each tool call
});`}
          </DocBlock>
          <DocH4>Manual iteration</DocH4>
          <DocBlock>
{`const handle = agent.chat("...");
for await (const ev of handle) {
  if (ev.kind === "ca_permission_request") {
    await handle.respondToPermission(ev.callId, { decision: "allow" });
  }
}`}
          </DocBlock>
        </Reveal>

        {/* Policy */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-policy">Policy — Cedar + OPA guardrails</DocH3>
          <DocBlock>
{`const agent = new ComputerAgent({
  ...opts,
  policy: {
    kind:        "srs",
    endpoint:    "https://your-policy-service.example.com",
    apiKey:      process.env.SRS_API_KEY!,
    policyId:    "policy_abc123",
    principalId: "user:alice",
  },
});`}
          </DocBlock>
          <DocP>
            The harness fetches the policy once (cached) and evaluates every tool call against the cedar_guardrail + opa_guardrail subsections.
            Decisions are emitted as <code className="font-display text-foreground">ca_permission_decision</code> events for audit.
            Fail-closed: on 5xx / timeout, the harness defaults to <strong className="text-foreground">deny</strong>.
          </DocP>
        </Reveal>

        {/* Configuration */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-config">Configuration reference</DocH3>
          <DocH4>Environment variables (read by the engine subprocess)</DocH4>
          <ul className="rounded-xl border border-border divide-y divide-border">
            {envVars.map(([k, v]) => (
              <KV key={k} k={k} v={v} />
            ))}
          </ul>
          <DocH4>Model overrides — resolution order (highest wins)</DocH4>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 ml-2">
            <li><code className="font-display text-foreground">options.model</code> constructor arg</li>
            <li><code className="font-display text-foreground">model:</code> constructor arg</li>
            <li><code className="font-display text-foreground">agent.yaml</code>'s <code className="font-display text-foreground">model.preferred</code></li>
            <li>Engine default (claude-agent-sdk → <code className="font-display text-foreground">claude-haiku-4-5-20251001</code>)</li>
          </ol>
        </Reveal>

        {/* Wire protocol */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-wire">HTTP wire protocol</DocH3>
          <DocP>
            The harness server exposes a small REST + SSE surface — <code className="font-display text-foreground">curl</code> can drive every endpoint.
            Schemas are Zod-validated.
          </DocP>
          <DocH4>REST</DocH4>
          <div className="rounded-xl border border-border overflow-hidden font-display text-sm">
            {restEndpoints.map(([m, p, d], idx) => (
              <div key={p} className={`grid grid-cols-12 px-4 py-3 ${idx % 2 ? "bg-background" : "bg-muted/10"}`}>
                <code className="col-span-2 text-phosphor">{m}</code>
                <code className="col-span-5 text-foreground/90 break-all">{p}</code>
                <div className="col-span-5 text-muted-foreground text-sm font-sans">{d}</div>
              </div>
            ))}
          </div>

          <DocH4>SSE event stream</DocH4>
          <DocBlock>
{`type HarnessEvent =
  | { kind: "ca_session_started";    sessionId; engine; identity; capabilities }
  | { kind: "sdk_message";           sessionId; payload }
  | { kind: "ca_permission_request"; sessionId; callId; toolName; input; risk? }
  | { kind: "ca_permission_decision";sessionId; callId; decision; reason? }
  | { kind: "ca_turn_started";       sessionId; userTextLen? }
  | { kind: "ca_usage_snapshot";     sessionId;
                                     inputTokens?; outputTokens?;
                                     cacheCreationInputTokens?; cacheReadInputTokens?;
                                     costUsd?; costSemantic?: "cumulative" | "delta" }
  | { kind: "ca_session_ended";      sessionId; reason; errorMessage? };`}
          </DocBlock>
          <DocP>
            Every event has a monotonic <code className="font-display text-foreground">id</code>. Reconnect with{" "}
            <code className="font-display text-foreground">Last-Event-ID: &lt;last-id&gt;</code> and the harness replays from the per-session ring buffer
            (default: last 1,000 events / 5 minutes).
          </DocP>

          <DocH4>One-line curl</DocH4>
          <DocBlock>
{`curl -N -X POST http://127.0.0.1:7700/v1/sessions \\
  -H 'content-type: application/json' \\
  -d '{
    "source": "github.com/open-gitagent/general-agent",
    "harness": "claude-agent-sdk",
    "envs": { "ANTHROPIC_API_KEY": "sk-ant-…" },
    "message": "Reply: PING"
  }'`}
          </DocBlock>
        </Reveal>

        {/* CLI */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-cli">CLI</DocH3>
          <DocBlock>
{`npx computeragent run \\
  --source github.com/open-gitagent/general-agent \\
  --harness claude-agent-sdk \\
  --message "Summarize the README in 3 bullets"`}
          </DocBlock>
          <DocH4>Common flags</DocH4>
          <ul className="rounded-xl border border-border divide-y divide-border">
            {[
              ["--source", "source (git URL or local path)"],
              ["--harness", "harness"],
              ["--model", "model"],
              ["--temperature", "temperature"],
              ["--runtime", "runtime (local / e2b / bwrap / vz)"],
              ["--session-id", "sessionId"],
              ["--session-store", "sessionStore.kind (memory / file / mongo / sqlite)"],
              ["--debug", "debug: true"],
              ["--message", "one-shot agent.chat(input) and exit"],
            ].map(([k, v]) => (
              <KV key={k} k={k} v={v} />
            ))}
          </ul>
        </Reveal>

        {/* Errors */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-errors">Errors</DocH3>
          <div className="rounded-xl border border-border overflow-hidden mb-6">
            {errors.map((e, idx) => (
              <div key={e.name} className={`grid grid-cols-12 px-4 py-3 text-sm ${idx % 2 ? "bg-background" : "bg-muted/10"}`}>
                <code className="col-span-4 font-display text-phosphor break-all">{e.name}</code>
                <div className="col-span-8 text-muted-foreground">{e.when}</div>
              </div>
            ))}
          </div>
          <DocBlock>
{`import { HarnessProtocolError, UnknownEngineError } from "computeragent";

try {
  await agent.chat("…");
} catch (e) {
  if (e instanceof HarnessProtocolError) { /* retry, swap harness url, … */ }
  if (e instanceof UnknownEngineError)   { /* "did you mean…" */ }
  throw e;
}`}
          </DocBlock>
          <DocP>
            <code className="font-display text-foreground">AuditSink</code> / <code className="font-display text-foreground">AgentTelemetry</code> errors
            never propagate. They're caught, logged at debug level, and swallowed. Telemetry must never break an agent run.
          </DocP>
        </Reveal>

        {/* Companion packages */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-packages">Companion packages</DocH3>
          <div className="rounded-xl border border-border overflow-hidden">
            {companions.map(([pkg, role], idx) => (
              <div key={pkg} className={`grid grid-cols-12 gap-3 px-4 py-3 text-sm ${idx % 2 ? "bg-background" : "bg-muted/10"}`}>
                <code className="col-span-5 font-display text-phosphor break-all text-xs md:text-sm">{pkg}</code>
                <div className="col-span-7 text-muted-foreground">{role}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Versioning */}
        <Reveal delay={0.05} className="mt-20">
          <DocH3 id="doc-versioning">Versioning</DocH3>
          <DocP>
            Public packages follow <strong className="text-foreground">semver</strong> and are independently published. The umbrella{" "}
            <code className="font-display text-foreground">computeragent</code> is currently at <code className="font-display text-foreground">0.2.x</code> —
            minor versions may include breaking changes until 1.0. Pin a major if stability matters.
          </DocP>
          <DocP>
            Wire-protocol changes are versioned separately: events carry a <code className="font-display text-foreground">protocolVersion</code> field;
            the harness server rejects requests from incompatible client versions with{" "}
            <code className="font-display text-foreground">HarnessProtocolError</code> rather than malforming.
          </DocP>
        </Reveal>

        <Reveal delay={0.1} className="mt-20 flex flex-wrap gap-4">
          <a
            href="https://github.com/open-gitagent/ComputerAgent"
            className="px-5 py-3 rounded-md bg-phosphor text-accent-foreground text-sm font-semibold hover:opacity-90 transition shadow-[0_0_30px_-10px_var(--phosphor-glow)]"
          >
            Full reference on GitHub →
          </a>
          <a href="#start" className="px-5 py-3 rounded-md border border-border text-sm font-semibold hover:border-phosphor/60 transition">
            Back to quickstart
          </a>
        </Reveal>
      </div>
    </section>
  );
}



function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="w-7 h-7 rounded-md" />
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">© 2026 Lyzr Research Labs. Built for agents that touch the real world.</span>
            <span className="text-xs text-muted-foreground/60">
              Open source project maintained by{" "}
              <a href="https://www.linkedin.com/in/shreyas-kapale-82011513a/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition">
                Shreyas Kapale
              </a>{" "}
              @ Lyzr
            </span>
          </div>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

function SquaresBg({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none opacity-[0.08] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 40%, transparent 85%)",
      }}
    />
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <Nav />
      <Hero />
      <FrameworkSection />
      <ArchitectureCarousel />
      <Pillars />
      <CodeBlock />
      <DocsSection />

      <Footer />
    </main>
  );
}
