import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Menu, X, MessageCircle, Phone, ChevronDown } from 'lucide-react'
import { site, waLink, type Tier } from './config/site'
import { copy, num, tk, type Copy, type Lang } from './copy'

const L = createContext<{ lang: Lang; c: Copy; setLang: (l: Lang) => void }>({ lang: 'en', c: copy.en, setLang: () => {} })
const useL = () => useContext(L)

const navIds = ['#morning', '#route', '#safety', '#pricing', '#faq']
const diag = site.tiers[0]
const btnPrimary =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink px-6 py-3 text-center font-semibold text-paper transition-colors hover:bg-[#2c3d52] active:translate-y-px'
const btnQuiet =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-ink px-6 py-3 text-center font-semibold text-ink transition-colors hover:bg-ink/5 active:translate-y-px'

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
  'M200 250 L330 250', 'M200 200 L330 200', 'M200 150 L330 150',
  'M245 96 L245 300', 'M290 96 L290 300',
  'M80 96 L80 300', 'M20 190 L200 190',
]
const routes = [
  'M245 250 L290 250 L290 200 L245 200 Z', // phase 1: quiet residential loop
  'M245 200 L245 250 L200 250 L200 96 L80 96', // phase 2: onto Gulshan Ave and Kemal Ataturk Ave
  'M80 96 L80 190 L20 190 M200 250 L200 300', // phase 3: commute out, to the parking ramp
]

function RouteMap({ phase, animate = false, label }: { phase: 1 | 2 | 3; animate?: boolean; label: string }) {
  const m = useL().c.map
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
      <g fill="#1E2A3A" fontFamily="inherit" fontSize="13" fontWeight="600">
        <text x="212" y="88">{m.g2}</text>
        <text x="212" y="276">{m.g1}</text>
        <text x="24" y="86">{m.banani}</text>
        <text x="194" y="200" transform="rotate(-90 194 200)" fontSize="11" fontWeight="500">{m.gAve}</text>
        <text x="90" y="114" fontSize="11" fontWeight="500">{m.kAve}</text>
        <text x="300" y="228" fontSize="11" fontWeight="500">{m.gate}</text>
        <text x="392" y="22" fontSize="11" fontWeight="500" textAnchor="end">{m.lake}</text>
      </g>
    </svg>
  )
}

/* ---------- the morning as a time rule ---------- */

function TimeRule() {
  const mo = useL().c.morning
  const pos = (h: number) => ((h - 5.5) / 3.5) * 100 // 5:30 to 9:00 across the bar
  const hours = [6, 8, 9]
  return (
    <figure className="mt-10" aria-label={mo.label}>
      <div className="relative h-3 rounded-full bg-paper/70">
        <div className="absolute inset-y-0 rounded-full bg-route" style={{ left: `${pos(6)}%`, width: `${pos(8) - pos(6)}%` }} />
      </div>
      <div aria-hidden className="relative h-2">
        {hours.map((h) => <span key={h} className="absolute top-0 h-2 w-0.5 bg-ink" style={{ left: `${pos(h)}%` }} />)}
      </div>
      {/* 6:00 starts at its tick; 8:00 and 9:00 end at theirs, so the labels never collide */}
      <ol className="relative mt-2 h-14 text-sm">
        {hours.map((h, i) => (
          <li
            key={h}
            className={h === 6 ? 'absolute w-24 sm:w-40' : 'absolute w-24 text-right sm:w-36'}
            style={h === 6 ? { left: `${pos(h)}%` } : { right: `${100 - pos(h)}%` }}
          >
            <span className="block font-bold">{mo.times[i]}</span>
            <span className="block leading-snug text-ink-soft">{mo.marks[i]}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}

/* ---------- page ---------- */

function LangSwitch() {
  const { lang, c, setLang } = useL()
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
      aria-label={c.switchLabel}
      lang={lang === 'en' ? 'bn' : 'en'}
      className="min-h-11 rounded-md border-2 border-ink px-3 font-semibold hover:bg-ink/5"
    >
      {c.switchTo}
    </button>
  )
}

function Header() {
  const { c } = useL()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`)
    }, { rootMargin: '-40% 0px -55% 0px' })
    navIds.forEach((href) => { const el = document.querySelector(href); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className="sticky top-0 z-40 bg-haze/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="wide py-3 text-lg font-extrabold">{site.brandName}</a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navIds.map((href, i) => (
            <a
              key={href}
              href={href}
              aria-current={active === href ? 'location' : undefined}
              className={`py-2 font-medium underline-offset-8 hover:underline ${active === href ? 'underline decoration-ink decoration-[3px]' : ''}`}
            >
              {c.nav[i]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <WaLink msg={c.wa.general} className="hidden min-h-11 items-center gap-2 rounded-md px-3 font-semibold hover:bg-ink/5 sm:inline-flex">
            <MessageCircle className="size-5" aria-hidden /> WhatsApp
          </WaLink>
          <LangSwitch />
          <button
            className="flex size-11 items-center justify-center rounded-md lg:hidden"
            aria-label={open ? c.menuClose : c.menuOpen}
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
          {navIds.map((href, i) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium">{c.nav[i]}</a>
          ))}
        </nav>
      )}
    </header>
  )
}

function Hero() {
  const { lang, c } = useL()
  return (
    <section id="top" className="relative overflow-hidden bg-haze">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-24 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-16 lg:pb-32">
        <div>
          <h1 className="wide text-[2.4rem] leading-[1.08] font-extrabold sm:text-6xl lg:text-[4.1rem]">{c.hero.h1}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{c.hero.sub}</p>
          <TimeRule />
          <div id="hero-cta" className="mt-2 flex flex-col gap-3 sm:flex-row">
            <WaLink msg={c.wa.diagnostic(tk(lang, diag.price))} className={btnPrimary}>
              <MessageCircle className="size-5 shrink-0" aria-hidden /> {c.hero.cta} · {tk(lang, diag.price)}
            </WaLink>
            <a href="#pricing" className={btnQuiet}>{c.hero.second}</a>
          </div>
          <p className="mt-3 text-sm text-ink-soft">{c.hero.note}</p>
        </div>
        <div className="rounded-xl bg-paper/60 p-3 sm:p-5">
          <RouteMap phase={1} animate label={c.map.heroLabel} />
          <p className="mt-2 text-xs text-ink-soft">{c.map.caption}</p>
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
  const k = useL().c.compare
  return (
    <Section id="morning" title={k.title}>
      {/* desktop: a comparison table; phone: stacked rows */}
      <table className="hidden w-full border-collapse text-left md:table">
        <thead>
          <tr className="border-b-2 border-ink">
            <th scope="col" className="w-36 py-3 pr-4"><span className="sr-only">—</span></th>
            <th scope="col" className="py-3 pr-6 font-semibold text-ink-soft">{k.school}</th>
            <th scope="col" className="py-3 font-semibold">{k.us}</th>
          </tr>
        </thead>
        <tbody>
          {k.rows.map(([t, school, us]) => (
            <tr key={t} className="border-b border-ink/15 align-top">
              <th scope="row" className="py-5 pr-4 font-semibold">{t}</th>
              <td className="py-5 pr-6 text-ink-soft">{school}</td>
              <td className="py-5 font-medium">{us}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <dl className="divide-y divide-ink/15 border-y border-ink/15 md:hidden">
        {k.rows.map(([t, school, us]) => (
          <div key={t} className="py-5">
            <dt className="font-bold">{t}</dt>
            <dd className="mt-2 font-medium">{us}</dd>
            <dd className="mt-1 text-sm text-ink-soft">{k.schoolPrefix}{school}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

function Route() {
  const r = useL().c.route
  return (
    <Section id="route" tone="mist" title={r.title} intro={r.intro}>
      <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
        {r.phases.map(([s, t, b], i) => (
          <li key={t}>
            <div className="rounded-xl bg-paper p-3">
              <RouteMap phase={(i + 1) as 1 | 2 | 3} label={`${r.phaseLabel} ${i + 1}: ${t}`} />
            </div>
            <h3 className="mt-5 text-xl font-bold">{t}</h3>
            <p className="mt-1 text-sm font-semibold">{s}</p>
            <p className="mt-2 text-ink-soft">{b}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Safety() {
  const s = useL().c.safety
  return (
    <Section id="safety" title={s.title} intro={s.intro}>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="grid content-start gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <figure className="flex flex-col gap-3 rounded-lg border-2 border-ink p-4 sm:aspect-[1.586] lg:aspect-auto">
            <p className="wide text-lg leading-tight font-bold">{s.licence}</p>
            <figcaption className="text-ink-soft">{s.licenceNote}</figcaption>
          </figure>
          <figure className="relative flex min-h-44 flex-col justify-between overflow-hidden rounded-lg bg-ink p-4 text-paper sm:aspect-[1.586] lg:aspect-auto">
            <p className="text-xs font-semibold"><svg aria-hidden viewBox="0 0 8 8" className="mr-1 inline size-2 align-middle"><circle cx="4" cy="4" r="4" fill="#E2643B" /></svg>{s.rec}</p>
            <figcaption className="wide text-lg leading-tight font-bold">{s.recTitle}</figcaption>
            <p className="text-xs opacity-80">{s.recPlace}</p>
          </figure>
        </div>
        <dl className="divide-y divide-ink/15 border-y border-ink/15">
          {s.items.map(([t, d]) => (
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
  const m = useL().c.mentor
  const [strong, rest] = m.mentored(site.mentoredCount)
  return (
    <Section id="mentor" tone="mist" title={m.title}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        {site.about.photoUrl ? (
          <img src={site.about.photoUrl} alt={m.name} className="aspect-[4/5] w-full rounded-xl object-cover" />
        ) : (
          <PhotoSlot ratio="aspect-[4/5] max-h-[28rem]" note={m.photoSlot} />
        )}
        <div>
          <h3 className="wide text-3xl font-extrabold">{m.name}</h3>
          <p className="mt-3 max-w-xl text-lg text-ink-soft">{m.bio}</p>
          <p className="mt-6 max-w-xl text-lg"><strong className="font-bold">{strong}</strong>{rest}</p>
          <div className="mt-8">
            {site.videoUrl ? (
              <a href={site.videoUrl} target="_blank" rel="noopener" className="font-semibold underline decoration-ink decoration-2 underline-offset-4">{m.watch}</a>
            ) : (
              <PhotoSlot ratio="aspect-video" note={m.videoSlot} />
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
  const { lang, c } = useL()
  const p = c.pricing
  return (
    <Section id="pricing" title={p.title} intro={p.intro}>
      <div className="border-t-2 border-ink">
        {site.tiers.map((t) => {
          const x = p.tiers[t.id as keyof typeof p.tiers]
          return (
            <div key={t.id} className={`grid gap-4 border-b border-ink/15 py-8 lg:grid-cols-[1.2fr_0.6fr_1.6fr_13rem] lg:items-start lg:gap-8 ${t.popular ? '-mx-4 bg-dawn/40 px-4 sm:-mx-6 sm:px-6' : ''}`}>
              <div>
                <h3 className="text-xl font-bold">{x.name}</h3>
                <p className="mt-1 text-ink-soft">{x.tagline}</p>
              </div>
              <p>
                <span className="wide block text-3xl font-extrabold">{tk(lang, t.price)}</span>
                <span className="text-ink-soft">{x.duration}</span>
              </p>
              <ul className="space-y-2 text-ink-soft">
                {x.features.map((f) => <li key={f} className="flex gap-3"><span aria-hidden className="mt-2.5 h-0.5 w-3 shrink-0 bg-ink/40" />{f}</li>)}
              </ul>
              {t.id === 'diagnostic' ? (
                <WaLink msg={c.wa.diagnostic(tk(lang, t.price))} className={`${btnQuiet} w-full`}>{x.cta}</WaLink>
              ) : (
                <button onClick={() => onSelect(t)} className={`${t.popular ? btnPrimary : btnQuiet} w-full`}>{x.cta}</button>
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-6 text-ink-soft">{p.topUp(num(lang, site.topUp.hours), tk(lang, site.topUp.price))}</p>
    </Section>
  )
}

function Faq() {
  const f = useL().c.faq
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Section id="faq" tone="mist" title={f.title}>
      <div className="max-w-3xl divide-y divide-ink/15 border-y border-ink/15">
        {f.items.map(([q, a], i) => (
          <div key={i}>
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
  const { lang, c } = useL()
  return (
    <section className="bg-haze">
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6">
        <h2 className="wide max-w-3xl text-4xl leading-tight font-extrabold sm:text-5xl">{c.close.title}</h2>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">{c.close.sub}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WaLink msg={c.wa.diagnostic(tk(lang, diag.price))} className={btnPrimary}>
            <MessageCircle className="size-5 shrink-0" aria-hidden /> {c.close.cta} · {tk(lang, diag.price)}
          </WaLink>
          <WaLink msg={c.wa.callback} className={btnQuiet}>
            <Phone className="size-5 shrink-0" aria-hidden /> {c.close.callback}
          </WaLink>
        </div>
      </div>
      <div aria-hidden className="h-10 bg-dawn" />
    </section>
  )
}

function Footer() {
  const { lang, c } = useL()
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:justify-between sm:px-6">
        <div>
          <p className="wide text-base font-extrabold">{site.brandName}</p>
          <p className="mt-1">{c.mentor.name}</p>
          <p className="mt-1 opacity-80">{c.footer.coverage}</p>
          <p className="mt-1 opacity-80">{c.footer.sessions}</p>
        </div>
        <div className="sm:text-right">
          <a href={waLink(c.wa.general)} target="_blank" rel="noopener" className="inline-block py-2 font-semibold underline-offset-4 hover:underline">
            WhatsApp {num(lang, site.whatsappDisplay)}
          </a>
          <p><a href={site.termsUrl} className="inline-block py-2 underline underline-offset-4 opacity-80 hover:opacity-100">{c.footer.terms}</a></p>
        </div>
      </div>
    </footer>
  )
}

function BookingModal({ tier, onClose }: { tier: Tier | null; onClose: () => void }) {
  const { lang, c } = useL()
  const md = c.modal
  const ref = useRef<HTMLDialogElement>(null)
  // native <dialog>.showModal(): Escape closes, background is inert, focus returns to the opener
  useEffect(() => {
    if (tier) ref.current?.showModal()
  }, [tier])
  const x = tier ? c.pricing.tiers[tier.id as keyof typeof c.pricing.tiers] : null

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!tier || !x) return
    const f = new FormData(e.currentTarget)
    const lines = [c.wa.pkg(x.name, tk(lang, tier.price), x.duration)]
    for (const [k, label] of [['area', c.wa.area], ['car', c.wa.car], ['time', c.wa.time]] as const) {
      const v = String(f.get(k) ?? '')
      if (v) lines.push(`${label}: ${v}`)
    }
    // must stay synchronous: in-app browsers block window.open after an await
    window.open(waLink(lines.join('\n')), '_blank', 'noopener')
    ref.current?.close()
  }

  const field = (name: string, label: string, opts: string[]) => (
    <label className="block">
      <span className="text-sm font-medium">{label} <span className="font-normal text-ink-soft">{md.optional}</span></span>
      <select name={name} defaultValue="" className="mt-1 min-h-12 w-full rounded-md border-2 border-ink/25 bg-paper px-3 text-ink">
        <option value="">{md.none}</option>
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
      {tier && x && (
        <form onSubmit={submit} className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="modal-title" className="text-xl font-bold">{x.name}</h2>
              <p className="text-ink-soft">{tk(lang, tier.price)} · {x.duration}</p>
            </div>
            <button type="button" onClick={() => ref.current?.close()} aria-label={md.close} className="flex size-11 items-center justify-center rounded-md hover:bg-ink/5">
              <X />
            </button>
          </div>
          <p className="text-sm text-ink-soft">{md.note}</p>
          {field('area', md.area, md.areas)}
          {field('car', md.car, md.cars)}
          {field('time', md.time, md.times)}
          <button type="submit" className={`${btnPrimary} w-full`}>
            <MessageCircle className="size-5" aria-hidden /> {md.submit}
          </button>
        </form>
      )}
    </dialog>
  )
}

function readLang(): Lang {
  try {
    return localStorage.getItem('lang') === 'bn' ? 'bn' : 'en'
  } catch {
    return 'en'
  }
}

export default function App() {
  const [lang, setLangState] = useState<Lang>(readLang)
  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch { /* private mode: choice lasts this visit only */ }
  }
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  const c = copy[lang]

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
    <L.Provider value={{ lang, c, setLang }}>
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
          <WaLink msg={c.wa.diagnostic(tk(lang, diag.price))} className={`${btnPrimary} w-full`}>
            <MessageCircle className="size-5 shrink-0" aria-hidden /> {c.bar} · {tk(lang, diag.price)}
          </WaLink>
        </div>
      </div>
    </L.Provider>
  )
}
