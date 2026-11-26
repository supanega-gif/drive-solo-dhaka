import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Menu, X, MessageCircle, Phone, ChevronDown } from 'lucide-react'
import { site, taka, waLink, messages, packageMessage, type Tier } from './config/site'

const nav = [
  ['Why your car', '#morning'],
  ['Route', '#route'],
  ['Safety', '#safety'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
] as const

const diag = site.tiers[0]
const btnPrimary =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-[#2c3d52] active:translate-y-px'
const btnQuiet =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-ink px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink/5 active:translate-y-px'

function WaLink({ msg, className, children }: { msg: string; className: string; children: ReactNode }) {
  return (
    <a href={waLink(msg)} target="_blank" rel="noopener" className={className}>
      {children}
    </a>
  )
}

/* ---------- schematic map of Gulshan / Banani (not to scale) ---------- */

const streets = [
  'M200 300 L200 40', // Gulshan Avenue, Gulshan 1 (south) to Gulshan 2 (north)
  'M20 96 L200 96', // Kemal Ataturk Avenue, Banani to Gulshan 2
  'M200 250 L330 250', 'M200 200 L330 200', 'M200 150 L330 150', // residential roads
  'M245 96 L245 300', 'M290 96 L290 300',
  'M80 96 L80 300', 'M20 190 L200 190', // Banani grid
]
const routes = [
  'M245 250 L290 250 L290 200 L245 200 Z', // phase 1: quiet residential loop
  'M245 200 L245 250 L200 250 L200 96 L80 96', // phase 2: onto Gulshan Ave and Kemal Ataturk Ave
  'M80 96 L80 190 L20 190 M200 250 L200 300', // phase 3: commute out, to the parking ramp
]

function RouteMap({ phase, animate = false, label }: { phase: 1 | 2 | 3; animate?: boolean; label: string }) {
  return (
    <svg viewBox="0 0 400 320" role="img" aria-label={label} className="h-auto w-full">
      <path d="M352 30 C372 90 338 140 360 200 C378 250 350 290 366 318 L400 318 L400 30 Z" fill="#9FB6CC" />
      {streets.map((d) => (
        <path key={d} d={d} stroke="#1E2A3A" strokeOpacity=".28" strokeWidth="5" fill="none" strokeLinecap="round" />
      ))}
      {routes.slice(0, phase).map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className={animate ? 'route-draw' : undefined}
          style={animate ? { animationDelay: `${0.4 + i * 0.9}s` } : undefined}
          stroke="#E2643B"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      <circle cx="200" cy="96" r="9" fill="#fff" stroke="#1E2A3A" strokeWidth="5" />
      <circle cx="200" cy="250" r="9" fill="#fff" stroke="#1E2A3A" strokeWidth="5" />
      <rect x="258" y="216" width="16" height="16" rx="2" fill="#1E2A3A" />
      <g fill="#1E2A3A" fontFamily="Archivo, sans-serif" fontSize="13" fontWeight="600">
        <text x="212" y="88">Gulshan 2</text>
        <text x="212" y="276">Gulshan 1</text>
        <text x="24" y="86">Banani</text>
        <text x="194" y="200" transform="rotate(-90 194 200)" fontSize="11" fontWeight="500">Gulshan Ave</text>
        <text x="90" y="114" fontSize="11" fontWeight="500">Kemal Ataturk Ave</text>
        <text x="300" y="228" fontSize="11" fontWeight="500">Your gate</text>
        <text x="392" y="22" fontSize="11" fontWeight="500" textAnchor="end">Lake</text>
      </g>
    </svg>
  )
}

/* ---------- the morning as a time rule ---------- */

function TimeRule() {
  const pos = (h: number) => ((h - 5.5) / 3.5) * 100 // 5:30 to 9:00 across the bar
  const marks = [
    [6, '6:00', 'Lesson starts at your gate'],
    [8, '8:00', 'Your driver arrives'],
    [9, '9:00', 'You are at the office'],
  ] as const
  return (
    <figure className="mt-10" aria-label="A typical morning">
      <div className="relative h-3 rounded-full bg-paper/70">
        <div className="absolute inset-y-0 rounded-full bg-route" style={{ left: `${pos(6)}%`, width: `${pos(8) - pos(6)}%` }} />
      </div>
      <div aria-hidden className="relative h-2">
        {marks.map(([h]) => <span key={h} className="absolute top-0 h-2 w-0.5 bg-ink" style={{ left: `${pos(h)}%` }} />)}
      </div>
      {/* 6:00 starts at its tick; 8:00 and 9:00 end at theirs, so the labels never collide */}
      <ol className="relative mt-2 h-14 text-sm">
        {marks.map(([h, t, d]) => (
          <li
            key={t}
            className={h === 6 ? 'absolute w-24 sm:w-40' : 'absolute w-24 text-right sm:w-36'}
            style={h === 6 ? { left: `${pos(h)}%` } : { right: `${100 - pos(h)}%` }}
          >
            <span className="block font-bold">{t}</span>
            <span className="block leading-snug text-ink-soft">{d}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}

/* ---------- page ---------- */

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`)
    }, { rootMargin: '-40% 0px -55% 0px' })
    nav.forEach(([, href]) => { const el = document.querySelector(href); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className="sticky top-0 z-40 bg-haze/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="wide py-3 text-lg font-extrabold">{site.brandName}</a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={active === href ? 'location' : undefined}
              className={`py-2 font-medium underline-offset-8 hover:underline ${active === href ? 'underline decoration-ink decoration-[3px]' : ''}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <WaLink msg={messages.general} className="hidden min-h-11 items-center gap-2 rounded-md px-3 font-semibold hover:bg-ink/5 sm:inline-flex">
            <MessageCircle className="size-5" aria-hidden /> WhatsApp
          </WaLink>
          <button
            className="flex size-11 items-center justify-center rounded-md lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="border-t border-ink/15 px-4 pb-4 lg:hidden" aria-label="Mobile">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium">{label}</a>
          ))}
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-haze">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-24 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-16 lg:pb-32">
        <div>
          <h1 className="wide text-[2.5rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-[4.1rem]">
            Own a car in Dhaka, yet still rely on a driver?
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Private, 1-on-1 driving lessons from your doorstep, in your own car, before Dhaka traffic wakes up.
            The Core package is ten sessions built to take you from passenger to solo driver.
          </p>
          <TimeRule />
          <div id="hero-cta" className="mt-2 flex flex-col gap-3 sm:flex-row">
            <WaLink msg={messages.diagnostic} className={btnPrimary}>
              <MessageCircle className="size-5" aria-hidden /> Book a diagnostic drive · {taka(diag.price)}
            </WaLink>
            <a href="#pricing" className={btnQuiet}>See the packages</a>
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            One hour at your gate. Fully credited toward Core or VIP if you continue within {site.deductibleDays} days.
          </p>
        </div>
        <div className="rounded-xl bg-paper/60 p-3 sm:p-5">
          <RouteMap phase={1} animate label="Schematic map of Gulshan and Banani with a first-lesson route around quiet residential roads near your gate" />
          <p className="mt-2 text-xs text-ink-soft">Lesson 1, drawn on a schematic of Gulshan. Not to scale.</p>
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-10 bg-dawn" />
    </section>
  )
}

function Section({ id, title, intro, tone = 'paper', children }: { id?: string; title: string; intro?: string; tone?: 'paper' | 'mist'; children: ReactNode }) {
  return (
    <section id={id} className={tone === 'mist' ? 'bg-mist' : 'bg-paper'}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <h2 className="wide max-w-3xl text-3xl leading-tight font-extrabold sm:text-[2.6rem]">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-lg text-ink-soft">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

function Morning() {
  const rows = [
    ['The car', 'Shared, worn manual training cars that feel nothing like yours', 'Your own sedan or SUV from the first minute'],
    ['The lesson', 'Rushed 20–30 minutes at a distant, crowded centre', 'A full 60 minutes, 1-on-1, starting at your gate'],
    ['The roads', 'No practice on your route or your basement ramp', 'Gulshan and Banani avenues, roundabouts and your exact parking spot'],
    ['The time', 'Fixed slots in the middle of the working day', `${site.sessionWindow}, before your driver's shift begins`],
  ]
  return (
    <Section id="morning" title="Why lessons in your own car beat a driving school">
      {/* desktop: a comparison table; phone: stacked rows */}
      <table className="hidden w-full border-collapse text-left md:table">
        <thead>
          <tr className="border-b-2 border-ink">
            <th scope="col" className="w-36 py-3 pr-4"><span className="sr-only">Topic</span></th>
            <th scope="col" className="py-3 pr-6 font-semibold text-ink-soft">Typical driving school</th>
            <th scope="col" className="py-3 font-semibold">Private lessons in your car</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, school, us]) => (
            <tr key={k} className="border-b border-ink/15 align-top">
              <th scope="row" className="py-5 pr-4 font-semibold">{k}</th>
              <td className="py-5 pr-6 text-ink-soft">{school}</td>
              <td className="py-5 font-medium">{us}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <dl className="divide-y divide-ink/15 border-y border-ink/15 md:hidden">
        {rows.map(([k, school, us]) => (
          <div key={k} className="py-5">
            <dt className="font-bold">{k}</dt>
            <dd className="mt-2 font-medium">{us}</dd>
            <dd className="mt-1 text-sm text-ink-soft">Driving school: {school.charAt(0).toLowerCase() + school.slice(1)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

function Route() {
  const phases = [
    { n: 1 as const, s: 'Sessions 1–3', t: 'Your car and quiet lanes', b: 'Mirror set-up, left-side bumper judgement, smooth automatic throttle and braking, and low-speed manoeuvres in empty residential lanes.' },
    { n: 2 as const, s: 'Sessions 4–7', t: 'Avenues, roundabouts and U-turns', b: 'Merging onto Gulshan Avenue and Kemal Ataturk Avenue, morning traffic flow, safe spacing from buses and rickshaws, and confident U-turns.' },
    { n: 3 as const, s: 'Sessions 8–10', t: 'Tight parking and your real commute', b: 'Apartment basement and mall parking, reverse and parallel, flyover merges, and practice runs of your actual office commute.' },
  ]
  return (
    <Section id="route" tone="mist" title="Ten sessions, one route that grows" intro="Each phase starts where the last one ended. You never meet main-road traffic before your car control is ready for it.">
      <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
        {phases.map((p) => (
          <li key={p.n}>
            <div className="rounded-xl bg-paper p-3">
              <RouteMap phase={p.n} label={`Schematic route for phase ${p.n}: ${p.t}`} />
            </div>
            <h3 className="mt-5 text-xl font-bold">{p.t}</h3>
            <p className="mt-1 text-sm font-semibold">{p.s}</p>
            <p className="mt-2 text-ink-soft">{p.b}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Safety() {
  return (
    <Section id="safety" title="What keeps you, and your car, safe" intro="Your car has no instructor pedals, so safety comes from the order you learn in and from what is agreed before the first session.">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="grid content-start gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <figure className="flex flex-col gap-3 rounded-lg border-2 border-ink p-4 sm:aspect-[1.586] lg:aspect-auto">
            <p className="wide text-lg leading-tight font-bold">BRTA Professional Driving Licence</p>
            <figcaption className="text-ink-soft">Shown to you, with my NID, before Session 1.</figcaption>
          </figure>
          <figure className="relative flex min-h-44 flex-col justify-between sm:aspect-[1.586] lg:aspect-auto overflow-hidden rounded-lg bg-ink p-4 text-paper">
            <p className="text-xs font-semibold"><svg aria-hidden viewBox="0 0 8 8" className="mr-1 inline size-2 align-middle"><circle cx="4" cy="4" r="4" fill="#E2643B" /></svg>REC 06:12</p>
            <figcaption className="wide text-lg leading-tight font-bold">Every session on the road camera</figcaption>
            <p className="text-xs opacity-80">Gulshan Avenue</p>
          </figure>
        </div>
        <dl className="divide-y divide-ink/15 border-y border-ink/15">
          {[
            ['A signed agreement first', 'A one-page safety and liability agreement, signed before Session 1, with my BRTA licence and NID shown to you.'],
            ['Quiet roads before main roads', 'Beginners stay in empty residential lanes at 6:00 AM until car control is solid.'],
            ['Road-camera review', 'Every session is recorded for mutual safety. You get short review clips privately, to improve faster.'],
            ['Private by default', `Sessions run ${site.sessionWindow}, before your driver arrives. Footage is never shared publicly without your written consent.`],
          ].map(([t, d]) => (
            <div key={t} className="py-5">
              <dt className="font-bold">{t}</dt>
              <dd className="mt-1 text-ink-soft">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

function PhotoSlot({ ratio, note }: { ratio: string; note: string }) {
  return (
    <div className={`flex ${ratio} w-full items-center justify-center rounded-xl border-2 border-dashed border-ink/30 bg-paper p-6 text-center text-sm text-ink-soft`}>
      {note}
    </div>
  )
}

function Mentor() {
  const a = site.about
  return (
    <Section id="mentor" tone="mist" title="Who sits beside you">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        {a.photoUrl ? (
          <img src={a.photoUrl} alt={a.name} className="aspect-[4/5] w-full rounded-xl object-cover" />
        ) : (
          <PhotoSlot ratio="aspect-[4/5] max-h-[28rem]" note="Photo coming: the mentor at the wheel" />
        )}
        <div>
          <h3 className="wide text-2xl font-extrabold">{a.name}</h3>
          <p className="mt-3 max-w-xl text-lg text-ink-soft">{a.bio}</p>
          <p className="mt-6 max-w-xl text-lg"><strong className="font-bold">{site.mentoredCount} car owners</strong> have already moved from the passenger seat to driving themselves.</p>
          <div className="mt-8">
            {site.videoUrl ? (
              <a href={site.videoUrl} target="_blank" rel="noopener" className="font-semibold underline decoration-ink decoration-2 underline-offset-4">
                Watch: "{site.videoTitle}"
              </a>
            ) : (
              <PhotoSlot ratio="aspect-video" note={`Video coming: "${site.videoTitle}"`} />
            )}
          </div>
          {site.testimonials.length > 0 && (
            <div className="mt-8 space-y-6">
              {site.testimonials.map((t) => (
                <figure key={t.name}>
                  <blockquote className="text-lg">"{t.quote}"</blockquote>
                  <figcaption className="mt-2 text-sm text-ink-soft">{t.name}{t.detail && `, ${t.detail}`}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

function Pricing({ onSelect }: { onSelect: (t: Tier) => void }) {
  return (
    <Section id="pricing" title="Packages and prices" intro={`All packages are valid for ${site.packageValidityDays} days. Multi-hour packages can be split 50/50.`}>
      <div className="border-t-2 border-ink">
        {site.tiers.map((t) => (
          <div key={t.id} className={`grid gap-4 border-b border-ink/15 py-8 lg:grid-cols-[1.2fr_0.6fr_1.6fr_13rem] lg:items-start lg:gap-8 ${t.popular ? '-mx-4 bg-dawn/40 px-4 sm:-mx-6 sm:px-6' : ''}`}>
            <div>
              <h3 className="text-xl font-bold">{t.name}</h3>
              <p className="mt-1 text-ink-soft">{t.tagline}</p>
            </div>
            <p>
              <span className="wide block text-3xl font-extrabold">{taka(t.price)}</span>
              <span className="text-ink-soft">{t.duration}</span>
            </p>
            <ul className="space-y-2 text-ink-soft">
              {t.features.map((f) => <li key={f} className="flex gap-3"><span aria-hidden className="mt-2.5 h-0.5 w-3 shrink-0 bg-ink/40" />{f}</li>)}
            </ul>
            {t.id === 'diagnostic' ? (
              <WaLink msg={messages.diagnostic} className={`${btnQuiet} w-full text-center`}>{t.cta}</WaLink>
            ) : (
              <button onClick={() => onSelect(t)} className={`${t.popular ? btnPrimary : btnQuiet} w-full`}>{t.cta}</button>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-ink-soft">
        Extended practice top-up for active clients: {site.topUp.hours} hours for <strong className="text-ink">{taka(site.topUp.price)}</strong>.
      </p>
    </Section>
  )
}

function Faq() {
  const items = [
    ["What if my car doesn't have instructor pedals?", 'Your first sessions stay in empty residential lanes early in the morning. You never enter main traffic until your braking and judgement are verified safe, with verbal guidance and the handbrake within reach.'],
    ["Do I need a BRTA learner's permit first?", "A valid BRTA learner's permit or licence is needed to drive on public roads. Without one yet, we start inside gated private lanes and help you apply for the e-learner permit online."],
    ['Will my driver find out while I am learning?', `Not unless you tell them. Sessions run ${site.sessionWindow}, before most drivers' morning shift begins.`],
    ['What if I need to reschedule?', `Message on WhatsApp at least ${site.rescheduleNoticeHours} hours ahead and the session moves within your ${site.packageValidityDays}-day window at no charge.`],
    ['Can I pay in instalments?', 'Yes. Multi-hour packages can be paid in full, or 50% when you sign before Session 1 and 50% before Session 4, by cash, bKash or bank transfer.'],
  ]
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Section id="faq" tone="mist" title="Questions people ask first">
      <div className="max-w-3xl divide-y divide-ink/15 border-y border-ink/15">
        {items.map(([q, a], i) => (
          <div key={q}>
            <h3>
              <button
                id={`faq-q${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-a${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-lg font-semibold"
              >
                {q}
                <ChevronDown className={`size-5 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} aria-hidden />
              </button>
            </h3>
            <div id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`} hidden={open !== i} className="pb-5 text-ink-soft">
              <p className="max-w-[58ch]">{a}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Close() {
  return (
    <section className="bg-haze">
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6">
        <h2 className="wide max-w-3xl text-4xl leading-tight font-extrabold sm:text-5xl">Ready to take the driver's seat of your own car?</h2>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">Start with one diagnostic drive at your gate. Continue within {site.deductibleDays} days and it is fully credited.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WaLink msg={messages.diagnostic} className={btnPrimary}>
            <MessageCircle className="size-5" aria-hidden /> Book the diagnostic drive · {taka(diag.price)}
          </WaLink>
          <WaLink msg={messages.callback} className={btnQuiet}>
            <Phone className="size-5" aria-hidden /> Ask for a call back on WhatsApp
          </WaLink>
        </div>
      </div>
      <div aria-hidden className="h-10 bg-dawn" />
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:justify-between sm:px-6">
        <div>
          <p className="wide text-base font-extrabold">{site.brandName}</p>
          <p className="mt-1 opacity-80">{site.coverage.join(', ')}</p>
          <p className="mt-1 opacity-80">Sessions {site.sessionWindow}</p>
        </div>
        <div className="sm:text-right">
          <a href={waLink(messages.general)} target="_blank" rel="noopener" className="inline-block py-2 font-semibold underline-offset-4 hover:underline">
            WhatsApp {site.whatsappDisplay}
          </a>
          <p><a href={site.termsUrl} className="inline-block py-2 underline underline-offset-4 opacity-80 hover:opacity-100">Safety & liability terms</a></p>
        </div>
      </div>
    </footer>
  )
}

function BookingModal({ tier, onClose }: { tier: Tier | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  // native <dialog>.showModal(): Escape closes, background is inert, focus returns to the opener
  useEffect(() => {
    if (tier) ref.current?.showModal()
  }, [tier])

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!tier) return
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '')
    // must stay synchronous: in-app browsers block window.open after an await
    window.open(waLink(packageMessage(tier, get('area'), get('car'), get('time'))), '_blank', 'noopener')
    ref.current?.close()
  }

  const field = (name: string, label: string, opts: string[]) => (
    <label className="block">
      <span className="text-sm font-medium">{label} <span className="font-normal text-ink-soft">(optional)</span></span>
      <select name={name} defaultValue="" className="mt-1 min-h-12 w-full rounded-md border-2 border-ink/25 bg-paper px-3 text-ink">
        <option value="">No preference</option>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  )

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="modal-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl bg-paper p-0 text-ink backdrop:bg-ink/60"
    >
      {tier && (
        <form onSubmit={submit} className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="modal-title" className="text-xl font-bold">{tier.name}</h2>
              <p className="text-ink-soft">{taka(tier.price)} · {tier.duration}</p>
            </div>
            <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="flex size-11 items-center justify-center rounded-md hover:bg-ink/5">
              <X />
            </button>
          </div>
          <p className="text-sm text-ink-soft">Sessions run {site.sessionWindow}. Times below are start times.</p>
          {field('area', 'Area', site.modal.areas)}
          {field('car', 'Car type', site.modal.carTypes)}
          {field('time', 'Preferred start time', site.modal.times)}
          <button type="submit" className={`${btnPrimary} w-full`}>
            <MessageCircle className="size-5" aria-hidden /> Continue on WhatsApp
          </button>
        </form>
      )}
    </dialog>
  )
}

export default function App() {
  const [tier, setTier] = useState<Tier | null>(null)
  // phone bar appears only once the hero buttons have scrolled away
  const [showBar, setShowBar] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('hero-cta')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <div className="pb-20 md:pb-0">
      <Header />
      <main>
        <Hero />
        <Morning />
        <Route />
        <Safety />
        <Mentor />
        <Pricing onSelect={setTier} />
        <Faq />
        <Close />
      </main>
      <Footer />
      <BookingModal tier={tier} onClose={() => setTier(null)} />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 bg-haze/95 p-2 shadow-[0_-4px_16px_rgba(30,42,58,.15)] backdrop-blur transition-[transform,visibility] duration-300 ease-out md:hidden ${showBar ? '' : 'invisible translate-y-full'}`}
      >
        <WaLink msg={messages.diagnostic} className={`${btnPrimary} w-full`}>
          <MessageCircle className="size-5" aria-hidden /> Book diagnostic drive · {taka(diag.price)}
        </WaLink>
      </div>
    </div>
  )
}
