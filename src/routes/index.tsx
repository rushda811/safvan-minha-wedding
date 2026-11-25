import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import paper from "@/assets/paper.webp.asset.json";
import castle from "@/assets/castle-background.webp.asset.json";
import flower2 from "@/assets/flower2-decoration.webp.asset.json";
import flower2b from "@/assets/flower2-decoration-2.webp.asset.json";
import flower8 from "@/assets/flower8-decoration.webp.asset.json";
import song from "@/assets/wedding-song.mp3.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Safvan & Minha — Wedding Invitation, 20 December 2026" },
      { name: "description", content: "Join us to celebrate the wedding on Sunday, 20 December 2026 at MM palace, Kuttippala." },
      { property: "og:title", content: "Safvan & Minha — Wedding Invitation" },
      { property: "og:description", content: "SUNDAY, 20 December 2026 · Magnolia Plantation, Charleston SC" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WEDDING = new Date("2026-12-20T11:00:00");
const MAPS = "https://www.google.com/maps/search/?api=1&query=Magnolia+Plantation+Charleston+SC";

function Flowers({ left, right, faded }: { left: string; right: string; faded?: boolean }) {
  const o = faded ? "opacity-80" : "opacity-100";
  return (
    <>
      <img src={left} alt="" aria-hidden className={`pointer-events-none absolute -left-10 top-1/2 w-28 -translate-y-1/2 sway sm:-left-20 sm:w-44 ${o}`} />
      <img src={right} alt="" aria-hidden className={`pointer-events-none absolute -right-10 top-1/2 w-28 -translate-y-1/2 -scale-x-100 sway sm:-right-20 sm:w-44 ${o}`} />
    </>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-xl rounded-[2rem] border border-gold/60 bg-cream px-8 py-12 text-center shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--cocoa)_55%,transparent)] sm:px-14 ${className}`}>
      <div className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-gold/40" />
      {children}
    </div>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="mb-6 text-xs font-semibold tracking-[0.4em] text-gold">{children}</p>
);
const Divider = () => <div className="mx-auto my-6 h-px w-24 bg-gold/60" />;

function DateBlock({ time }: { time: string }) {
  return (
    <div className="mt-4 flex items-center justify-center gap-5 text-cocoa">
      <div className="text-right text-sm tracking-[0.2em]"><div>AT {time}</div><div>SUNDAY</div></div>
      <div className="border-x border-gold/60 px-5 font-serif text-5xl">18</div>
      <div className="text-left text-sm tracking-[0.2em]"><div>DECEMBER</div><div>2026</div></div>
    </div>
  );
}

function Envelope({ onOpen, closing }: { onOpen: () => void; closing: boolean }) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-envelope px-6 ${closing ? "env-out" : ""}`}>
      <button onClick={onOpen} className="group relative w-full max-w-sm rise">
        <Card className="!bg-cream py-16 transition-transform duration-500 group-hover:-translate-y-1">
          <Flowers left={flower2.url} right={flower2b.url} />
          <p className="text-xs font-semibold tracking-[0.4em] text-cocoa">TOGETHER WITH THEIR FAMILIES</p>
          <h1 className="my-6 font-script text-6xl text-cocoa">Mohammed Safvan &amp; Minha Fathima</h1>
          <p className="font-semibold tracking-[0.25em] text-cocoa">December 20, 2026</p>
          <Divider />
          <p className="font-serif text-xl font-medium italic text-cocoa">Cordially Invites</p>
          <p className="mt-8 animate-pulse text-sm font-semibold tracking-[0.3em] text-cocoa">TAP TO OPEN</p>
        </Card>
      </button>
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, WEDDING.getTime() - (now ?? WEDDING.getTime()));
  const parts = [["Days", Math.floor(d / 864e5)], ["Hours", Math.floor(d / 36e5) % 24], ["Minutes", Math.floor(d / 6e4) % 60], ["Seconds", Math.floor(d / 1e3) % 60]] as const;
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {parts.map(([l, v]) => (
        <div key={l} className="rounded-2xl border border-gold/50 bg-cream/80 py-4">
          <div className="font-serif text-3xl text-cocoa tabular-nums sm:text-5xl">{now === null ? "--" : String(v).padStart(2, "0")}</div>
          <div className="mt-1 text-[10px] tracking-[0.25em] text-gold sm:text-xs">{l.toUpperCase()}</div>
        </div>
      ))}
    </div>
  );
}

function Calendar() {
  const offset = new Date(2026, 8, 1).getDay();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: 30 }, (_, i) => i + 1)];
  return (
    <div className="relative mx-auto max-w-md rounded-[2rem] border border-gold/50 bg-cream px-6 py-10 text-center shadow-lg">
      <img src={flower2.url} alt="" aria-hidden className="pointer-events-none absolute -left-12 -top-14 w-28 sway sm:-left-20 sm:w-40" />
      <img src={flower8.url} alt="" aria-hidden className="pointer-events-none absolute -bottom-14 -right-12 w-28 sway sm:-right-20 sm:w-40" />
      <p className="font-script text-4xl text-cocoa">December</p>
      <p className="mb-6 tracking-[0.4em] text-gold">2026</p>
      <div className="grid grid-cols-7 gap-y-3 text-sm text-cocoa">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i} className="text-xs font-semibold text-gold">{d}</div>)}
        {cells.map((c, i) => (
          <div key={i} className="relative flex h-9 items-center justify-center">
            {c === 18 ? (
              <span className="relative flex h-10 w-10 items-center justify-center">
                <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full fill-cocoa"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.3 4 6.4 4c2.4 0 4 1.4 5.6 3.3C13.6 5.4 15.2 4 17.6 4 21.7 4 23.6 8.4 22 11.7 19.5 16.4 12 21 12 21z" /></svg>
                <span className="relative -mt-1 font-semibold text-cream">18</span>
              </span>
            ) : c}
          </div>
        ))}
      </div>
    </div>
  );
}

function MusicButton({ audio, playing, toggle }: { audio: React.RefObject<HTMLAudioElement | null>; playing: boolean; toggle: () => void }) {
  return (
    <>
      <audio ref={audio} src={song.url} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-cocoa text-cream shadow-[0_15px_35px_-12px_color-mix(in_oklab,var(--cocoa)_80%,transparent)] transition hover:scale-105 sm:bottom-8 sm:right-8"
      >
        {playing && <span className="absolute inset-0 animate-ping rounded-full border border-gold/50" />}
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-current"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>
        )}
      </button>
    </>
  );
}

function Section({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <section ref={ref} className={`reveal relative px-8 py-14 sm:py-20 ${inView ? "in" : ""}`}>{children}</section>;
}

function Index() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const a = audio.current; if (!a) return;
    if (a.paused) { void a.play().then(() => setPlaying(true)).catch(() => {}); } else { a.pause(); setPlaying(false); }
  };
  const openInvite = () => { setOpen(true); const a = audio.current; if (a) void a.play().then(() => setPlaying(true)).catch(() => {}); setTimeout(() => setGone(true), 1000); };
  return (
    <div className="paper-tint min-h-screen overflow-x-hidden bg-cover bg-fixed bg-center" style={{ backgroundImage: `url(${paper.url})` }}>
      {!gone && <Envelope onOpen={openInvite} closing={open} />}
      <MusicButton audio={audio} playing={playing} toggle={toggle} />

      <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-cover bg-bottom opacity-30" style={{ backgroundImage: `url(${castle.url})` }} />
        <div className={`relative ${open ? "rise" : "opacity-0"}`}>
          <p className="mx-auto max-w-full whitespace-nowrap font-arabic text-[clamp(1.5rem,7vw,4.5rem)] leading-[1.6] text-cocoa" dir="rtl" lang="ar">﷽</p>
          <Divider />
          <h1 className="font-script text-7xl leading-tight text-cocoa sm:text-9xl">Mohamme Safvan</h1>
          <p className="font-script text-5xl text-gold">&amp;</p>
          <h1 className="font-script text-7xl leading-tight text-cocoa sm:text-9xl">Minha Fathima</h1>
          <p className="mt-6 tracking-[0.4em] text-cocoa">20 · 12 · 2026</p>
        </div>
      </header>

      <Section>
        <Card>
          <Flowers left={flower2.url} right={flower8.url} />
          <Label>CEREMONY INFO</Label>
          <div className="grid grid-cols-2 gap-4 text-sm text-cocoa">
            <p>Mr. &amp; Mrs.<br />Andrew Marlowe<br />Hannah Marlowe</p>
            <p>Mr. &amp; Mrs.<br />Christopher Kensington<br />Sarah Kensington</p>
          </div>
          <p className="mt-8 italic text-lg text-cocoa">Please join us as we celebrate<br />the beginning of our life together</p>
          <p className="mt-6 font-script text-5xl text-cocoa">Mohammed Safvan</p>
          <p className="font-script text-3xl text-gold">&amp;</p>
          <p className="font-script text-5xl text-cocoa">Minha fathima</p>
          <Divider />
          <p className="tracking-[0.3em] text-gold text-sm">WEDDING CEREMONY</p>
          <p className="mt-2 text-xl text-cocoa">The Cathedral of St. John the Baptist</p>
          <DateBlock time="11:00 AM" />
          <Divider />
        </Card>
      </Section>

      <Section>
        <Card>
          <Label>RECEPTION INFO</Label>
          <p className="italic text-lg text-cocoa">The reception will take place at:</p>
          <DateBlock time="11:00 AM" />
          <Divider />
          <div className="flex justify-center gap-10 text-cocoa">
            <div><p className="text-xs tracking-[0.3em] text-gold">WELCOME</p><p className="text-3xl">16:30</p></div>
            <div><p className="text-xs tracking-[0.3em] text-gold">RECEPTION</p><p className="text-3xl">19:00</p></div>
          </div>
        </Card>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-script text-6xl text-cocoa">Countdown</p>
          <p className="mb-8 mt-2 text-xs tracking-[0.4em] text-gold">UNTIL WE SAY "I DO"</p>
          <Countdown />
        </div>
      </Section>

      <Section>
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.4em] text-gold">20 · 12 · 2026</p>
          <h2 className="mt-2 font-script text-6xl text-cocoa sm:text-7xl">Save the Date</h2>
        </div>
        <Calendar />
      </Section>

      <Section>
        <Card>
          <Label>WEDDING RECEPTION VENUE</Label>
          <p className="font-script text-5xl text-cocoa">Magnolia Plantation</p>
          <p className="mt-2 tracking-[0.2em] text-cocoa">Charleston, SC</p>
          <a href={MAPS} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cocoa px-8 py-3 text-sm tracking-[0.25em] text-cream transition hover:opacity-90">
            VIEW ON MAP
          </a>
        </Card>
      </Section>

      <Section>
        <Card className="py-20 sm:py-28">
          <Flowers left={flower2b.url} right={flower8.url} faded />
          <p className="font-arabic text-2xl leading-loose text-cocoa sm:text-3xl" dir="rtl">
            بَارَكَ اللهُ لَكُماَ وَبَارَكَ عَلَيْكُماَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <Divider />
          <p className="italic text-lg text-cocoa">"May Allah bless you both, shower His blessings upon you, and unite you in goodness."</p>
        </Card>
      </Section>

      <footer className="relative overflow-hidden px-6 pb-16 pt-40 text-center">
        <div className="absolute inset-0 bg-cover bg-bottom opacity-35" style={{ backgroundImage: `url(${castle.url})` }} />
        <p className="relative font-script text-5xl text-cocoa">Safvan &amp; Minha</p>
        <p className="relative mt-2 text-xs tracking-[0.4em] text-cocoa">WE CAN'T WAIT TO CELEBRATE WITH YOU</p>
      </footer>
    </div>
  );
}
