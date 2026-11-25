import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import paper from "@/assets/paper.webp";
import castle from "@/assets/castle-background.webp";
import flower2 from "@/assets/flower2-decoration.webp";
import flower2b from "@/assets/flower-decoration.webp";
import flower8 from "@/assets/flower8-decoration.webp";
import song from "@/assets/wedding-song.mp3.asset.json";
import envelopeBackground from "@/assets/envelope-background.webp";
import envelopeCover from "@/assets/envelope-cover.webp";
import stringDecoration from "@/assets/string-decoration.webp";
import weddingPhoto from "@/assets/wedding-photo.png";
export const Route = createFileRoute("/")({
  head: () => ({
  meta: [
    { title: "Safvan & Minha — Wedding Invitation, Sunday 20 December 2026" },
    {
      name: "description",
      content: "Join us to celebrate the wedding on Sunday, 20 December 2026 at M M Palace, Kuttippala.",
    },
    { property: "og:title", content: "Safvan & Minha — Wedding Invitation" },
    {
      property: "og:description",
      content: "Sunday, 20 December 2026 · M M Palace, Kuttippala",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
}),
  component: Index,
});

const WEDDING = new Date("2026-12-20T11:00:00");
const MAPS = "https://maps.app.goo.gl/Tv9TN5FMH2zfWFrE9";

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
      <div className="border-x border-gold/60 px-5 font-serif text-5xl">20</div>
      <div className="text-left text-sm tracking-[0.2em]"><div>DECEMBER</div><div>2026</div></div>
    </div>
  );
}

function Envelope({ onOpen, closing }: { onOpen: () => void; closing: boolean }) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-envelope px-6 ${closing ? "env-out" : ""}`}>
      <button onClick={onOpen} className="group relative w-full max-w-sm rise">
        <Card className="!bg-cream py-16 transition-transform duration-500 group-hover:-translate-y-1">
          <Flowers left={flower2} right={flower2b} />
          <p className="text-xs font-semibold tracking-[0.4em] text-cocoa">TOGETHER WITH THEIR FAMILIES</p>
          <h1 className="my-6 font-script text-6xl text-cocoa">Safvan &amp; Minha </h1>
          <p className="font-semibold tracking-[0.25em] text-cocoa"><p className="font-semibold tracking-[0.2em] text-cocoa">
  Sunday, 20 December 2026
</p></p>
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

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const d = Math.max(0, WEDDING.getTime() - (now ?? WEDDING.getTime()));

  const parts = [
    ["Days", Math.floor(d / 864e5)],
    ["Hours", Math.floor(d / 36e5) % 24],
    ["Minutes", Math.floor(d / 6e4) % 60],
    ["Seconds", Math.floor(d / 1e3) % 60],
  ] as const;

  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-[#B69A76]/60 bg-[#F3E9DC] px-5 py-10 shadow-[0_20px_50px_-20px_rgba(70,45,25,0.18)] sm:px-10 sm:py-14">

      {/* Inner ornamental border */}
      <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-[#B69A76]/35" />
      <div className="relative z-10">

        {/* Heading decoration */}
        <div className="mb-7 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-[#B69A76]/60 sm:w-20" />
          <span className="font-serif text-xs tracking-[0.4em] text-[#927653]">
            THE WEDDING DAY
          </span>
          <div className="h-px w-12 bg-[#B69A76]/60 sm:w-20" />
        </div>

        <div className="mb-8 text-center">
          <p className="font-script text-4xl text-[#554438] sm:text-5xl">
            A Day to Remember
          </p>
          <p className="mt-2 text-[10px] tracking-[0.35em] text-[#927653] sm:text-xs">
            SUNDAY · 20 DECEMBER · 2026
          </p>
        </div>

        {/* Countdown numbers */}
        <div className="grid grid-cols-4 gap-2 sm:gap-5">
          {parts.map(([label, value]) => (
            <div
              key={label}
              className="relative rounded-xl border border-[#B69A76]/55 bg-[#E9DCCB] px-1 py-5 text-center shadow-[0_8px_18px_-10px_rgba(50,30,15,0.2)] sm:rounded-2xl sm:py-7"
            >
              <div className="absolute inset-1 rounded-lg border border-[#B69A76]/30 sm:rounded-xl" />

              <div className="relative font-serif text-3xl text-[#554438] tabular-nums sm:text-5xl">
                {now === null ? "--" : String(value).padStart(2, "0")}
              </div>

              <div className="relative mt-3 text-[8px] font-semibold tracking-[0.18em] text-[#927653] sm:text-xs sm:tracking-[0.25em]">
                {label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom ornament */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#B69A76]/50" />
          <span className="text-xl text-[#A88B68]">✦</span>
          <div className="h-px w-12 bg-[#B69A76]/50" />
        </div>

      </div>
    </div>
  );
}

function Calendar() {
  // December 2026
  const offset = new Date(2026, 11, 1).getDay();
  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: 31 }, (_, i) => i + 1),
  ];

  return (
    <div className="relative mx-auto max-w-md rounded-[2rem] border border-gold/50 bg-cream px-6 py-10 text-center shadow-lg">
      <img
        src={flower2}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-12 -top-14 w-28 sway sm:-left-20 sm:w-40"
      />
      <img
        src={flower8}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-14 -right-12 w-28 sway sm:-right-20 sm:w-40"
      />

      <p className="font-script text-4xl text-cocoa">December</p>
      <p className="mb-6 tracking-[0.4em] text-gold">2026</p>

      <div className="grid grid-cols-7 gap-y-3 text-base text-cocoa">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-sm font-semibold text-gold">
            {d}
          </div>
        ))}

        {cells.map((c, i) => (
          <div key={i} className="relative flex h-10 items-center justify-center">
            {c === 20 ? (
              <span className="relative flex h-10 w-10 items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 h-full w-full fill-cocoa"
                >
                  <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.3 4 6.4 4c2.4 0 4 1.4 5.6 3.3C13.6 5.4 15.2 4 17.6 4 21.7 4 23.6 8.4 22 11.7 19.5 16.4 12 21 12 21z" />
                </svg>
                <span className="relative -mt-1 font-semibold text-cream">
                  20
                </span>
              </span>
            ) : (
              c
            )}
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


<header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12">

  {/* Background */}
  <div
    className="absolute inset-0 bg-cover bg-bottom opacity-30"
    style={{ backgroundImage: `url(${castle})` }}
  />

  {/* Envelope composition */}
  <div className="relative z-10 mx-auto w-full max-w-[380px]">
    <div className="relative aspect-[292/341] w-full">

      {/* Background envelope */}
      <img
        src={envelopeBackground}
        alt=""
        className="absolute inset-0 z-10 w-full"
      />

      {/* Your photograph */}
      <div
        className="absolute left-[12%] top-[18%] z-20 w-[79.5%]"
        style={{
          animation: "dbrFloat 7.3s ease-in-out infinite",
          ["--dbr-float" as string]: "-7px",
        }}
      >
<div className="aspect-[232/206] rotate-[3.92deg] border-[5px] border-white bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.25)]">
  <img
    src={weddingPhoto}
    alt="Wedding photograph"
    className="h-full w-full object-cover"
  />
</div>
</div>

      {/* Front envelope */}
      <img
        src={envelopeCover}
        alt=""
        className="absolute left-0 top-[43.1%] z-30 w-full"
      />

      {/* Right flower */}
      <img
        src={flower2b}
        alt=""
        className="absolute left-[65.8%] top-[69.5%] z-[35] w-[54.5%] object-contain"
      />

      {/* Left flower */}
      <img
        src={flower8}
        alt=""
        className="absolute -left-[12%] top-[33.1%] z-[36] w-[39.4%] object-contain"
      />

      {/* String decoration */}
      <img
        src={stringDecoration}
        alt=""
        className="absolute left-[14.4%] top-[12.3%] z-[37] w-[22.3%] object-contain"
      />

    </div>

    {/* Names below the envelope */}
    <div className="mt-16 text-center">
      <h1 className="font-script text-5xl text-cocoa sm:text-7xl">
        Mohammed Safvan
      </h1>
      <p className="my-2 font-script text-4xl text-gold">&amp;</p>
      <h2 className="font-script text-5xl text-cocoa sm:text-7xl">
        Minha Fathima
      </h2>
<p className="mt-5 text-lg tracking-[0.4em] text-cocoa sm:text-xl">
  20 · 12 · 2026
</p>
    </div>
  </div>
</header>


      <Section>
        <Card>
          <Flowers left={flower2} right={flower8} />
          <h2 className="mt-2 font-script text-6xl text-cocoa sm:text-7xl">Ceremony Info</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-cocoa">
            <p>Mr. &amp; Mrs.<br />Moosakutty<br />Ummu Salma</p>
            <p>Mr. &amp; Mrs.<br />Mujeeb<br />Riyasa</p>
          </div>
          <p className="mt-8 italic text-lg text-cocoa">Bismillah. A beautiful beginning, a blessed union<br />and a lifetime of love, Insha'Allah.</p>
          <p className="mt-6 font-script text-5xl text-cocoa">Mohammed Safvan</p>
          <p className="font-script text-3xl text-gold">&amp;</p>
          <p className="font-script text-5xl text-cocoa">Minha fathima</p>
          <Divider />
          <p className="tracking-[0.3em] text-gold text-sm">WEDDING CEREMONY</p>
          <p className="mt-2 text-xl text-cocoa">M M Palace, Kuttippala</p>
          <DateBlock time="11:00 AM" />
          <Divider />
        </Card>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Countdown />
        </div>
      </Section>

      <Section>
        <div className="mb-10 text-center">
          <h2 className="mt-2 font-script text-6xl text-cocoa sm:text-7xl">Save the Date</h2>
        </div>
        <Calendar />
      </Section>

      <Section>
        <Card>
          <Label>WEDDING RECEPTION VENUE</Label>
          <p className="font-script text-5xl text-cocoa">M M Palace </p>
          <p className="mt-2 tracking-[0.2em] text-cocoa">Kuttippala</p>
          <a href={MAPS} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cocoa px-8 py-3 text-sm tracking-[0.25em] text-cream transition hover:opacity-90">
            VIEW ON MAP
          </a>
        </Card>
      </Section>

      <Section>
        <Card className="py-20 sm:py-28">
          <Flowers left={flower2b} right={flower8} faded />
          <p className="font-arabic text-2xl leading-loose text-cocoa sm:text-3xl" dir="rtl">
            بَارَكَ اللهُ لَكُماَ وَبَارَكَ عَلَيْكُماَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <Divider />
          <p className="italic text-lg text-cocoa">"May Allah bless you both, shower His blessings upon you, and unite you in goodness."</p>
        </Card>
      </Section>

<footer className="relative overflow-hidden px-6 pb-16 pt-40 text-center">
  <div
    className="absolute inset-0 bg-cover bg-bottom opacity-35"
    style={{ backgroundImage: `url(${castle})` }}
  />
<div className="relative mx-auto w-[min(92vw,430px)] px-6 py-8">
      <div className="relative">
        <div className="mx-auto h-px w-48 rule-gold sm:w-72" />

        <div className="mt-10 flex flex-col items-center px-5 text-center">
          <span className="font-serif text-xs font-bold uppercase tracking-[0.28em] text-gold-deep sm:text-sm">
            Crafted by
          </span>

          <span
            className="mt-3 font-script text-5xl leading-[1.15] text-gold sm:text-6xl"
            style={{
              animation: "gold-sheen 9s ease-in-out infinite",
            }}
          >
            Aurelle Vows
          </span>

          <span className="mt-3 font-serif text-xs font-semibold uppercase tracking-[0.2em] text-ink/80 sm:text-sm">
            Bespoke Wedding Invitations
          </span>
        </div>
      </div>
    </div>

</footer>
</div>
);
}
